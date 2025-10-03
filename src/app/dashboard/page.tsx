'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useUser } from '@/firebase';
import { MANDALAS } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Lock, Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

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
        {MANDALAS.map((mandala) => {
          const image = PlaceHolderImages.find((img) => img.id === mandala.imageId);
          const isLocked = !mandala.unlocked;
          return (
            <Card key={mandala.id} className={cn("overflow-hidden transition-all hover:shadow-primary/20 hover:shadow-lg hover:-translate-y-1", isLocked && "bg-card/50 text-muted-foreground")}>
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
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Lock className="w-12 h-12 text-primary" />
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-4">
                <CardTitle className={cn("font-headline text-xl", !isLocked && "text-primary")}>{mandala.name}</CardTitle>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold" disabled={isLocked}>
                  <Link href={`/play?mandala=${mandala.id}`}>
                    <Play className="mr-2 h-4 w-4" />
                    Play
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
