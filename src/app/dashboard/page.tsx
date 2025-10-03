'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { MANDALAS } from '@/lib/constants';
import type { Mandala, UserMandalaProgress } from '@/lib/types';
import { Skeleton } from '@/components/ui/skeleton';
import { collection } from 'firebase/firestore';
import { Progress } from '@/components/ui/progress';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const userProgressQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'mandalaProgress');
  }, [firestore, user]);
  
  const { data: userProgress, isLoading: isLoadingProgress } = useCollection<UserMandalaProgress>(userProgressQuery);

  const mandalas: Mandala[] = MANDALAS;
  const isLoadingMandalas = false; // Mandalas are from constants for now

  const getMandalaProgress = (mandalaId: string) => {
    if (!userProgress) return 1;
    const progress = userProgress.find(p => p.id === mandalaId);
    return progress ? progress.level : 1;
  };
  
  const getProgressPercentage = (currentLevel: number) => {
    const totalLevels = 9;
    const completedLevels = currentLevel - 1;
    return (completedLevels / totalLevels) * 100;
  }

  if (isUserLoading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <p>Loading...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">Choose a Mandala</h1>
      <p className="text-foreground/80 mb-8">Select a puzzle to begin your meditation.</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(isLoadingMandalas || isLoadingProgress) ? (
            Array.from({ length: 5 }).map((_, i) => (
                <Card key={i}>
                    <Skeleton className="aspect-square w-full" />
                    <CardContent className="p-4 space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                        <Skeleton className="h-10 w-full" />
                    </CardContent>
                </Card>
            ))
        ) : (
        mandalas.map((mandala) => {
          const image = PlaceHolderImages.find((img) => img.id === mandala.imageId);
          const currentLevel = getMandalaProgress(mandala.id);
          const isLocked = false; // All mandalas are unlocked
          const progressPercentage = getProgressPercentage(currentLevel);
          const isMaxLevel = currentLevel > 9;
          
          return (
            <Card key={mandala.id} className={cn("overflow-hidden transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1 flex flex-col")}>
              <CardHeader className="p-0">
                <div className="relative aspect-square">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={mandala.name}
                      fill
                      className={cn("object-cover")}
                      data-ai-hint={image.imageHint}
                    />
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4 flex-grow">
                <CardTitle className={cn("font-headline text-xl text-primary")}>{mandala.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Level {isMaxLevel ? '1' : currentLevel}</p>
                <Progress value={isMaxLevel ? 0 : progressPercentage} className="mt-2 h-2" />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                  <Link href={`/play?mandala=${mandala.id}`}>
                    <Play className="mr-2 h-4 w-4" />
                    Play
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        }))}
      </div>
    </div>
  );
}
