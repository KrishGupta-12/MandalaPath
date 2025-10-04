
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, BrainCircuit, Mouse, MoveUp, Puzzle, Smartphone } from 'lucide-react';
import React from 'react';

export default function HowToPlayPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary">How to Play: The Mandala Path</h1>
        <p className="text-lg text-foreground/70 mt-2 max-w-3xl mx-auto">A meditative journey of logic, pattern, and discovery.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

        {/* --- Core Gameplay Mechanics --- */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline text-2xl text-primary">Core Gameplay</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-4">
                <Puzzle className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-headline font-semibold">1. Align the Rings</h3>
                <p className="text-foreground/70 mt-1">Your goal is to align the special 'link' symbols between adjacent rings. A link is formed when the symbols on two neighboring rings line up perfectly.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-4">
                <BrainCircuit className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-headline font-semibold">2. Solve the Mandala</h3>
                <p className="text-foreground/70 mt-1">A mandala is solved when all its rings are connected in a single, unbroken chain of light. When a link is made, it will glow. When all rings in the chain are linked, they will all glow, signifying the puzzle is solved.</p>
              </div>
            </div>
             <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-4">
                <MoveUp className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-headline font-semibold">3. Progress Your Journey</h3>
                <p className="text-foreground/70 mt-1">Each mandala has 9 levels of increasing difficulty. You must complete all 9 levels of a mandala to unlock the next one in the sequence. Your progress is saved automatically.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 bg-primary/10 text-primary rounded-full p-4">
                <BookOpen className="w-8 h-8" />
              </div>
              <div>
                <h3 className="text-xl font-headline font-semibold">4. Unlock Ancient Wisdom</h3>
                <p className="text-foreground/70 mt-1">Solving a puzzle rewards you with a profound insight from Hindu scriptures. Completing all 9 levels of a mandala earns you a new title, marking your progress on the path to enlightenment.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* --- Controls Section --- */}
        <Card>
            <CardHeader>
                <div className="flex items-center gap-3">
                    <Mouse className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline text-2xl text-primary">Desktop Controls</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h4 className="font-semibold">Rotate Clockwise:</h4>
                    <p className="text-foreground/80">Click on any ring with your <span className="font-bold text-accent">Left Mouse Button</span>.</p>
                </div>
                 <div>
                    <h4 className="font-semibold">Rotate Counter-Clockwise:</h4>
                    <p className="text-foreground/80">Click on any ring with your <span className="font-bold text-accent">Right Mouse Button</span>.</p>
                </div>
            </CardContent>
        </Card>

        <Card>
            <CardHeader>
                 <div className="flex items-center gap-3">
                    <Smartphone className="w-8 h-8 text-primary" />
                    <CardTitle className="font-headline text-2xl text-primary">Mobile Controls</CardTitle>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div>
                    <h4 className="font-semibold">Rotate Clockwise:</h4>
                    <p className="text-foreground/80"><span className="font-bold text-accent">Tap</span> on any ring to rotate it clockwise.</p>
                </div>
                 <div>
                    <h4 className="font-semibold">Counter-Clockwise:</h4>
                    <p className="text-foreground/80">Bi-directional rotation on mobile is planned for a future update. For now, rotation is clockwise only.</p>
                </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
