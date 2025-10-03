import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  const heroImage = PlaceHolderImages.find((img) => img.id === 'hero-mandala');

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]">
      <section className="flex-grow flex items-center justify-center p-4">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-4 tracking-tight">
              Mandala Path
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto md:mx-0">
              Journey through mystical puzzles. Align the sacred rings, awaken the mandalas, and unlock the wisdom of the ancients.
            </p>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold group">
              <Link href="/dashboard">
                Begin Your Journey <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="relative aspect-square max-w-md mx-auto w-full">
            {heroImage && (
               <Image
                src={heroImage.imageUrl}
                alt={heroImage.description}
                fill
                priority
                className="object-cover rounded-full shadow-2xl shadow-primary/20 animate-spin"
                style={{ animationDuration: '60s' }}
                data-ai-hint={heroImage.imageHint}
              />
            )}
             <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent rounded-full"></div>
          </div>
        </div>
      </section>
    </div>
  );
}
