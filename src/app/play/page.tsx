'use client';
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

export default function PlayPage() {
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
    if (!isLoadingProgress) {
        if (userProgress) {
            setCurrentLevel(userProgress.level);
        } else {
            // If no progress document exists, create it for Level 1
            if(userProgressRef) {
                setDocumentNonBlocking(userProgressRef, { level: 1, id: mandalaId }, { merge: true });
            }
            setCurrentLevel(1);
        }
    }
  }, [userProgress, isLoadingProgress, userProgressRef, mandalaId, router]);


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
            setCurrentLevel(nextLevel); // Optimistically update level for immediate re-render
       } else {
            // After completing the final level, reset to level 1 for replayability
            setDocumentNonBlocking(userProgressRef, { level: 1 }, { merge: true });
            // Let the dialog show, then on close it will be reset. We can set the local level to 1 after a delay.
            setTimeout(() => setCurrentLevel(1), 2000); 
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

  if (isUserLoading || !user || isLoadingProgress || !mandalaLevel || !mandalaConfig) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <p>Loading Game...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 flex flex-col items-center">
        <div className="w-full max-w-2xl mb-4">
            <Button asChild variant="ghost">
                <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Dashboard
                </Link>
            </Button>
        </div>
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
        {mandalaLevel.name}
      </h1>
      <p className="text-foreground/80 mb-8 max-w-lg text-center">Align the central symbols between adjacent rings to link them all.</p>
      <PuzzleBoard 
        key={mandalaLevel.id} 
        mandala={mandalaLevel} 
        onSolve={handlePuzzleSolved}
      />
    </div>
  );
}
