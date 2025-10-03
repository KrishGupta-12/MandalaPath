'use client';
import { PuzzleBoard } from '@/components/game/puzzle-board';
import { useUser, useFirestore, useDoc, useMemoFirebase, updateDocumentNonBlocking } from '@/firebase';
import { Mandala, MandalaLevel, UserMandalaProgress } from '@/lib/types';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MANDALAS } from '@/lib/constants';
import { doc, setDoc } from 'firebase/firestore';

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
        setCurrentLevel(userProgress?.level || 1);
    }
  }, [userProgress, isLoadingProgress]);


  const mandalaLevel: MandalaLevel | null = useMemo(() => {
    if (!mandalaConfig || currentLevel === null) return null;

    const level = Math.min(currentLevel, mandalaConfig.maxRings - mandalaConfig.baseRings + 1);
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
       if (nextLevel <= mandalaConfig.maxRings - mandalaConfig.baseRings + 1) {
            setDocumentNonBlocking(userProgressRef, { level: nextLevel }, { merge: true });
            setCurrentLevel(nextLevel); // Optimistically update level for immediate re-render
       } else {
            // Mark as completed
            setDocumentNonBlocking(userProgressRef, { level: nextLevel, completed: true }, { merge: true });
            router.push('/dashboard');
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
