import { Button } from '@/components/ui/button';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ArrowRight, BookOpen, BrainCircuit, Puzzle } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { Icons } from '@/components/shared/icons';

export default function Home() {
  const explanationImage = PlaceHolderImages.find((img) => img.id === 'app-explanation');
  const howToPlayImage = PlaceHolderImages.find((img) => img.id === 'mandala-vayu');


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
            <div className="flex gap-4 justify-center md:justify-start">
                <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-bold group">
                  <Link href="/signup">
                    Begin Your Journey <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                 <Button asChild size="lg" variant="outline">
                    <Link href="/login">
                        Login
                    </Link>
                </Button>
            </div>
          </div>
          <div className="relative aspect-square max-w-md mx-auto w-full flex items-center justify-center">
            <Icons.logo className="w-full h-full text-primary animate-spin-slow" />
             <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-full"></div>
          </div>
        </div>
      </section>

      {/* How to Play Section */}
      <section id="how-to-play" className="py-16 sm:py-24 bg-background">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">How to Play: Mandala Link</h2>
            <p className="text-lg text-foreground/70 mt-2 max-w-3xl mx-auto">A game of strategy, logic, and visual harmony.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
             <div className="relative aspect-square rounded-full shadow-lg shadow-primary/20 overflow-hidden border-4 border-primary/10">
               {howToPlayImage && (
                <Image 
                  src={howToPlayImage.imageUrl} 
                  alt={howToPlayImage.description} 
                  fill
                  className="object-cover scale-110"
                  data-ai-hint={howToPlayImage.imageHint}
                />
               )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-8 left-8 right-8 text-white">
                  <h3 className="font-bold text-2xl font-headline">The Goal: Link All Rings</h3>
                  <p className="mt-2 text-white/90">Align the central 'logo' symbol between adjacent rings to form a continuous chain of light.</p>
                </div>
             </div>
             <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-4">
                  <Puzzle className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-headline font-semibold">Rotate and Connect</h3>
                  <p className="text-foreground/70 mt-1">Click a ring to rotate it. When a 'logo' symbol on one ring aligns with a 'logo' on its neighbor, they will link and glow.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-4">
                  <BrainCircuit className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-headline font-semibold">Beware the Chain Reaction</h3>
                  <p className="text-foreground/70 mt-1">The twist! Rotating a ring will also rotate any rings currently linked to it. You must think strategically to connect the whole mandala.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-4">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-xl font-headline font-semibold">Unlock Ancient Wisdom</h3>
                  <p className="text-foreground/70 mt-1">Once all rings are linked, the mandala is solved! You'll be rewarded with a profound insight from Hindu scriptures, which deepens as you complete more levels.</p>
                </div>
              </div>
             </div>
          </div>
        </div>
      </section>

      {/* Mission and Vision Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-secondary/30 to-background">
         <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Our Mission & Vision</h2>
            <p className="text-lg text-foreground/70 mt-4 max-w-4xl mx-auto">
                In a world of fast-paced digital distractions, Mandala Path is a serene sanctuary. Our mission is to reintroduce the profound, timeless wisdom of Sanatana Dharma to a new generation in a way that is both engaging and meditative. We believe that games can be more than just entertainment; they can be a path to knowledge, self-reflection, and inner peace. By blending beautiful art, strategic gameplay, and sacred teachings, we aim to create a playful experience that enlightens the mind and soothes the soul.
            </p>
         </div>
      </section>

    </div>
  );
}
