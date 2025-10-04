'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Award, Play, Lock } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { MANDALAS, getTitleByMandalasCompleted, TOTAL_LEVELS_PER_MANDALA } from '@/lib/constants';
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
  const isLoadingMandalas = false; 

  const { mandalasCompleted, playerTitle } = useMemo(() => {
    if (!userProgress) return { mandalasCompleted: 0, playerTitle: 'Mandala Novice' };
    
    const completedCount = userProgress.filter(p => p.level > TOTAL_LEVELS_PER_MANDALA).length;
    
    return { 
      mandalasCompleted: completedCount, 
      playerTitle: getTitleByMandalasCompleted(completedCount) 
    };
  }, [userProgress]);

  const getMandalaProgress = (mandalaId: string) => {
    if (!userProgress) return 1;
    const progress = userProgress.find(p => p.id === mandalaId);
    return progress ? progress.level : 1;
  };
  
  const getProgressPercentage = (currentLevel: number) => {
    const completedLevels = currentLevel - 1;
    return (completedLevels / TOTAL_LEVELS_PER_MANDALA) * 100;
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
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">Choose a Mandala</h1>
          <p className="text-foreground/80 mt-1">Select a puzzle to begin your meditation.</p>
        </div>
        <Card className="p-3 shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-6 h-6 text-primary"/>
            <div>
              <p className="text-sm text-muted-foreground">Your Title</p>
              <p className="font-bold font-headline text-primary">{playerTitle}</p>
            </div>
          </div>
        </Card>
      </div>

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
                        <Skeleton className="h-4 w-full mb-2" />
                        <Skeleton className="h-2 w-full" />
                    </CardContent>
                    <CardFooter className="p-4">
                        <Skeleton className="h-10 w-full" />
                    </CardFooter>
                </Card>
            ))
        ) : (
        mandalas.map((mandala, index) => {
          const image = PlaceHolderImages.find((img) => img.id === mandala.imageId);
          const currentLevel = getMandalaProgress(mandala.id);
          const isLocked = index > mandalasCompleted;
          const progressPercentage = getProgressPercentage(currentLevel);
          const isCompleted = currentLevel > TOTAL_LEVELS_PER_MANDALA;
          
          return (
            <Card key={mandala.id} className={cn(
              "overflow-hidden flex flex-col transition-all", 
              isLocked ? "bg-card/50" : "hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1"
            )}>
              <CardHeader className="p-0">
                <div className="relative aspect-square">
                  {image && (
                    <Image
                      src={image.imageUrl}
                      alt={mandala.name}
                      fill
                      className={cn("object-cover", isLocked && "grayscale opacity-50")}
                      data-ai-hint={image.imageHint}
                    />
                  )}
                  {isLocked && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Lock className="w-12 h-12 text-primary-foreground/50" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <div className='p-4 flex flex-col flex-grow'>
                <CardTitle className={cn("font-headline text-xl", isLocked ? "text-muted-foreground" : "text-primary")}>{mandala.name}</CardTitle>
                <div className='bg-background/50 backdrop-blur-sm p-2 -mx-2 my-2 rounded-sm'>
                  <CardDescription className="text-sm h-10 text-foreground/80">{mandala.description}</CardDescription>
                </div>
                
                <div className='flex-grow mt-2'>
                  <Progress value={isCompleted ? 100 : progressPercentage} className="h-2" />
                  <p className="text-xs text-muted-foreground mt-1">
                    {isCompleted ? 'Completed' : `Level ${currentLevel} / ${TOTAL_LEVELS_PER_MANDALA}`}
                  </p>
                </div>
                
                <CardFooter className="p-0 pt-4">
                  <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold" disabled={isLocked}>
                    <Link href={isLocked ? '#' : `/play?mandala=${mandala.id}`} aria-disabled={isLocked} tabIndex={isLocked ? -1 : undefined} className={cn(isLocked && "pointer-events-none")}>
                      <Play className="mr-2 h-4 w-4" />
                      {isCompleted ? 'Play Again' : 'Play'}
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
