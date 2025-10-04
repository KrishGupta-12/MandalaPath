'use client';
import { Suspense } from 'react';
import { PuzzleBoard } from '@/components/game/puzzle-board';
import { useUser, useFirestore, useDoc, useMemoFirebase, setDocumentNonBlocking } from '@/firebase';
import { MandalaLevel } from '@/lib/types';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { MANDALAS, TOTAL_LEVELS_PER_MANDALA } from '@/lib/constants';
import { doc, setDoc } from 'firebase/firestore';
import type { UserMandalaProgress } from '@/lib/types';

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
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (!mandalaId) {
      router.push('/dashboard');
    }
  }, [mandalaId, router]);

  useEffect(() => {
    // Wait until the loading of user progress is complete.
    if (isLoadingProgress) {
        return; 
    }

    if (userProgress) {
        // If progress exists, set the level from the loaded data.
        // If mandala is completed, reset to level 1 for replay.
        const startLevel = userProgress.level > TOTAL_LEVELS_PER_MANDALA ? 1 : userProgress.level;
        setCurrentLevel(startLevel);
    } else if (userProgressRef) {
        // If no progress doc exists after loading, this is the first time playing this mandala.
        // Create the document for level 1.
        setDocumentNonBlocking(userProgressRef, { level: 1, id: mandalaId! }, { merge: false });
        // The useDoc hook will automatically pick up the newly created document and trigger a re-render.
        // We set the level locally to 1 to avoid waiting for the next render cycle.
        setCurrentLevel(1);
    }
  }, [isLoadingProgress, userProgress, userProgressRef, mandalaId]);


  const mandalaLevel: MandalaLevel | null = useMemo(() => {
    if (!mandalaConfig || currentLevel === null) return null;

    // Ensure level does not exceed the max for puzzle generation
    const levelForPuzzle = Math.min(currentLevel, TOTAL_LEVELS_PER_MANDALA);
    const rings = mandalaConfig.baseRings + levelForPuzzle - 1;

    return {
      id: `${mandalaConfig.id}-${levelForPuzzle}`,
      mandalaId: mandalaConfig.id,
      name: `${mandalaConfig.name}`, // Name is just the mandala name
      level: levelForPuzzle,
      rings: rings,
      segments: mandalaConfig.segments,
      symbols: mandalaConfig.symbols,
    };
  }, [mandalaConfig, currentLevel]);

  const handlePuzzleSolved = async () => {
      if (!user || !mandalaId || !userProgressRef || !currentLevel || !mandalaConfig || !firestore) return;
      
      const nextLevel = currentLevel + 1;
       
       if (nextLevel <= TOTAL_LEVELS_PER_MANDALA) {
            // Progress to the next level within the same mandala
            setDocumentNonBlocking(userProgressRef, { level: nextLevel }, { merge: true });
            setCurrentLevel(nextLevel); // Update local state to re-render puzzle
       } else {
            // Mark as completed (level > total levels).
            // CRITICAL: Await this write to ensure progress is saved before redirecting.
            await setDoc(userProgressRef, { level: nextLevel }, { merge: true });
            // Redirect to dashboard to choose next mandala
            router.push('/dashboard');
       }
  };


  if (isUserLoading || !user || currentLevel === null || !mandalaLevel || !mandalaConfig) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <p>Loading Your Sacred Path...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-4 h-[calc(100vh-4rem)] flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-2">
            <Button asChild variant="ghost" size="sm" className="self-start">
                <Link href="/dashboard" className="flex items-center text-sm text-muted-foreground hover:text-foreground">
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Back to Dashboard
                </Link>
            </Button>
        </div>
         {/* Header Section */}
        <div className="text-center w-full mb-4">
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-primary">
                {mandalaLevel.name}
            </h1>
            <p className="text-foreground/80">Level {mandalaLevel.level} / {TOTAL_LEVELS_PER_MANDALA}</p>
        </div>
        <div className="w-full flex flex-col items-center justify-center p-2 flex-grow">
            <PuzzleBoard 
                key={mandalaLevel.id} // Key ensures component re-mounts on level change
                mandala={mandalaLevel} 
                onSolve={handlePuzzleSolved}
            />
      </div>
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
