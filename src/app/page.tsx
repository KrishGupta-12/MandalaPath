import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, BookOpen, Puzzle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/shared/icons';

export default function Home() {
  const explanationImage = PlaceHolderImages.find((img) => img.id === 'app-explanation');

  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] bg-gradient-to-b from-background to-secondary/30">
      {/* Hero Section */}
      <section className="flex-grow flex items-center justify-center p-4 py-16 sm:py-24">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-headline font-bold text-primary mb-4 tracking-tight">
              पथ of ज्ञान
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-8 max-w-xl mx-auto md:mx-0">
              Align the sacred rings, awaken the mandalas, and unlock the wisdom of the ancients. A journey into Hindu art and philosophy.
            </p>
            <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/70 mb-8">
              "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन"
              <br />
              <span className="text-sm">- Bhagavad Gita 2.47</span>
            </blockquote>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold group">
              <Link href="/dashboard">
                Begin Your Journey <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          <div className="relative aspect-square max-w-md mx-auto w-full flex items-center justify-center">
            <Icons.swastika className="w-full h-full text-primary animate-spin-slow" />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Explanation Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Discover the Mandala Path</h2>
            <p className="text-lg text-foreground/70 mt-2 max-w-3xl mx-auto">An interactive experience blending meditation, art, and ancient scriptures.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="relative aspect-video rounded-xl shadow-lg shadow-primary/10 overflow-hidden">
               {explanationImage && (
                <Image 
                  src={explanationImage.imageUrl} 
                  alt={explanationImage.description} 
                  fill
                  className="object-cover"
                  data-ai-hint={explanationImage.imageHint}
                />
               )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="font-bold text-xl font-headline">Align. Solve. Awaken.</h3>
                </div>
             </div>
             <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-3">
                  <Puzzle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-headline font-semibold">Solve Intricate Puzzles</h3>
                  <p className="text-foreground/70 mt-1">Rotate the rings of beautifully crafted mandalas to solve the ancient patterns. Each puzzle is a step deeper into a meditative state.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-3">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-headline font-semibold">Unlock Ancient Wisdom</h3>
                  <p className="text-foreground/70 mt-1">Upon solving a mandala, you are rewarded with a profound insight from Hindu scriptures, such as the Vedas, Upanishads, or the Bhagavad Gita.</p>
                </div>
              </div>
             </div>
          </div>
        </div>
      </section>

    </div>
  );
}
