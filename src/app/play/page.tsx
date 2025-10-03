'use client';
import { PuzzleBoard } from '@/components/game/puzzle-board';
import { useAuth } from '@/hooks/use-auth';
import { MANDALAS } from '@/lib/constants';
import { Mandala } from '@/lib/types';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function PlayPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [mandala, setMandala] = useState<Mandala | null>(null);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

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

  if (!user || !mandala) {
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
      <p className="text-foreground/80 mb-8">Align the rings to complete the pattern.</p>
      <PuzzleBoard mandala={mandala} />
    </div>
  );
}
