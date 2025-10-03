'use client';
import { PuzzleBoard } from '@/components/game/puzzle-board';
import { useUser } from '@/firebase';
import { MANDALAS } from '@/lib/constants';
import { Mandala } from '@/lib/types';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function PlayPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mandala, setMandala] = useState<Mandala | null>(null);

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const mandalaId = searchParams.get('mandala');
    const selectedMandala = MANDALAS.find((m) => m.id === mandalaId);
    if (selectedMandala) {
      setMandala(selectedMandala);
    } else {
      // Handle case where mandala is not found, maybe redirect
      router.push('/dashboard');
    }
  }, [searchParams, router]);

  if (isUserLoading || !user || !mandala) {
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
