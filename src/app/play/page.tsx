'use client';
import { PuzzleBoard } from '@/components/game/puzzle-board';
import { useUser, useFirestore, useDoc, useMemoFirebase } from '@/firebase';
import { Mandala } from '@/lib/types';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { doc } from 'firebase/firestore';

export default function PlayPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const firestore = useFirestore();
  
  const mandalaId = searchParams.get('mandala');

  const mandalaRef = useMemoFirebase(() => {
    if (!firestore || !mandalaId) return null;
    return doc(firestore, 'mandalaPuzzles', mandalaId);
  }, [firestore, mandalaId]);
  
  const { data: mandala, isLoading: isLoadingMandala } = useDoc<Mandala>(mandalaRef);


  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    if (!isLoadingMandala && !mandala) {
      // Handle case where mandala is not found after loading
      router.push('/dashboard');
    }
  }, [mandala, isLoadingMandala, router]);

  if (isUserLoading || !user || isLoadingMandala || !mandala) {
    return (
      <div className="flex h-[calc(100vh-4rem)] items-center justify-center">
        <div className="text-center">
          <p>Loading Puzzle...</p>
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
        {mandala.name}
      </h1>
      <p className="text-foreground/80 mb-8 max-w-lg text-center">Rotate the rings to align the sacred symbols at the top. Find your center and bring balance to the pattern.</p>
      <PuzzleBoard mandala={mandala} />
    </div>
  );
}
