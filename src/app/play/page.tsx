'use client';
import { Suspense } from 'react';
import { PuzzleBoard } from '@/components/game/puzzle-board';
import { useUser, useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { Mandala, MandalaLevel, UserMandalaProgress } from '@/lib/types';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MANDALAS } from '@/lib/constants';
import { doc } from 'firebase/firestore';

function PlayClientPage() {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const mandalaId = searchParams.get('mandala');

  const mandalaConfig = useMemo(() => {
    return MANDALAS.find(m => m.id === mandalaId);
  }, [mandalaId]);

  const userProgressRef = useMemoFirebase(() => {
    if (!firestore || !user || !mandalaId) return null;
    return doc(firestore, 'users', user.uid, 'mandalaProgress', mandalaId);
  }, [firestore, user, mandalaId]);

  const { data: userProgress, isLoading: isLoadingProgress } = useDoc<UserMandalaProgress>(userProgressRef);

  const [currentLevel, setCurrentLevel] = useState<number | null>(null);

  useEffect(() => {
    if (isLoadingProgress) return;

    if (userProgress) {
        setCurrentLevel(userProgress.level);
    } else if (userProgressRef && mandalaId) {
        setDocumentNonBlocking(userProgressRef, { level: 1, id: mandalaId }, { merge: true });
        setCurrentLevel(1);
    }
  }, [userProgress, isLoadingProgress, userProgressRef, mandalaId]);


  const mandalaLevel: MandalaLevel | null = useMemo(() => {
    if (!mandalaConfig || currentLevel === null) return null;

    const totalLevels = 9;
    const level = Math.min(currentLevel, totalLevels);
    const rings = mandalaConfig.baseRings + level - 1;

    return {
      id: `${mandalaConfig.id}-${level}`,
      mandalaId: mandalaConfig.id,
      name: `${mandalaConfig.name} - Level ${level}`,
      level: level,
      rings: rings,
      segments: mandalaConfig.segments,
      symbols: mandalaConfig.symbols,
    };
  }, [mandalaConfig, currentLevel]);

  const handlePuzzleSolved = async () => {
      if (!user || !mandalaId || !userProgressRef || !currentLevel || !mandalaConfig) return;
      
      const nextLevel = currentLevel + 1;
      const totalLevels = 9;
       
       if (nextLevel <= totalLevels) {
            setDocumentNonBlocking(userProgressRef, { level: nextLevel }, { merge: true });
            setCurrentLevel(nextLevel);
       } else {
            setDocumentNonBlocking(userProgressRef, { level: 1 }, { merge: true });
            setTimeout(() => setCurrentLevel(1), 500); 
       }
  };


  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (!mandalaId) {
      router.push('/dashboard');
    }
  }, [mandalaId, router]);

  if (isUserLoading || !user || isLoadingProgress || !mandalaLevel || !mandalaConfig || currentLevel === null) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <p>Loading Game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 h-[calc(100vh-4rem)] flex flex-col items-center">
        <div className="w-full max-w-2xl mb-2 flex items-center justify-between">
            <Button asChild variant="ghost" size="sm">
                <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back
                </Link>
            </Button>
             <h1 className="text-xl md:text-2xl font-headline font-bold text-primary text-center">
                {mandalaLevel.name}
            </h1>
            <div className="w-16"></div>
        </div>
      <p className="text-foreground/80 mb-4 max-w-lg text-center text-sm">Align all 'logo' symbols to restore the mandala.</p>
      <PuzzleBoard 
        key={mandalaLevel.id} 
        mandala={mandalaLevel} 
        onSolve={handlePuzzleSolved}
      />
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
      <div className="text-center">
        <p>Loading Game...</p>
      </div>
    </div>
  );
}

export default function PlayPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <PlayClientPage />
    </Suspense>
  );
}
