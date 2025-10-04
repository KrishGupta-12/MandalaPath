'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Award, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { MANDALAS, getTitleByLevel } from '@/lib/constants';
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

  const { totalLevel, playerTitle } = useMemo(() => {
    if (!userProgress) return { totalLevel: 0, playerTitle: 'Mandala Novice' };
    
    const total = userProgress.reduce((sum, progress) => {
      // Each mandala has 9 levels, progress.level is the *next* level to play
      // So a progress.level of 1 means 0 levels are complete.
      return sum + (progress.level - 1);
    }, 0);
    
    return { totalLevel: total, playerTitle: getTitleByLevel(total) };
  }, [userProgress]);


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
      <div className="flex justify-between items-start mb-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">Choose a Mandala</h1>
          <p className="text-foreground/80 mt-1">Select a puzzle to begin your meditation.</p>
        </div>
        <Card className="p-3">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-primary"/>
            <div>
              <p className="text-sm text-muted-foreground">Your Title</p>
              <p className="font-bold font-headline text-primary">{playerTitle}</p>
            </div>
          </div>
        </Card>
      </div>

      <p className="text-foreground/80 mb-8">Total Levels Completed: {totalLevel}</p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(isLoadingMandalas || isLoadingProgress) ? (
            Array.from({ length: 8 }).map((_, i) => (
                <Card key={i}>
                    <Skeleton className="aspect-square w-full" />
                    <CardHeader className='p-4'>
                       <Skeleton className="h-6 w-3/4" />
                       <Skeleton className="h-4 w-1/2" />
                    </CardHeader>
                    <CardContent className="p-4">
                        <Skeleton className="h-2 w-full" />
                    </CardContent>
                    <CardFooter className="p-4">
                        <Skeleton className="h-10 w-full" />
                    </CardFooter>
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
              <div className='p-4 flex flex-col flex-grow'>
                <CardTitle className={cn("font-headline text-xl text-primary")}>{mandala.name}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">Level {isMaxLevel ? '1' : currentLevel}</p>
                <div className='flex-grow mt-2'>
                  <Progress value={isMaxLevel ? 0 : progressPercentage} className="h-2" />
                </div>
                <CardFooter className="p-0 pt-4">
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
                    <Link href={`/play?mandala=${mandala.id}`}>
                      <Play className="mr-2 h-4 w-4" />
                      Play
                    </Link>
                  </Button>
                </CardFooter>
              </div>
            </Card>
          );
        }))}
      </div>
    </div>
  );
}
