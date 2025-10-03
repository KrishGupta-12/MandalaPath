'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Mandala } from '@/lib/types';
import { Icons } from '@/components/shared/icons';
import { cn } from '@/lib/utils';
import { CulturalInsightDialog } from './cultural-insight-dialog';
import { Button } from '@/components/ui/button';
import { RotateCcw, RotateCw } from 'lucide-react';

interface PuzzleBoardProps {
  mandala: Mandala;
}

export function PuzzleBoard({ mandala }: PuzzleBoardProps) {
  const [rotations, setRotations] = useState<number[]>(() => Array(mandala.rings).fill(0));
  const [isSolved, setIsSolved] = useState(false);
  const [isInsightOpen, setIsInsightOpen] = useState(false);
  const [moves, setMoves] = useState(0);

  const segmentAngle = 360 / mandala.segments;

  const handleRotate = (ringIndex: number, direction: 'cw' | 'ccw') => {
    if (isSolved) return;

    setMoves(prev => prev + 1);
    setRotations((prevRotations) => {
      const newRotations = [...prevRotations];
      const currentRotation = newRotations[ringIndex];
      if (direction === 'cw') {
        newRotations[ringIndex] = (currentRotation + 1) % mandala.segments;
      } else {
        newRotations[ringIndex] = (currentRotation - 1 + mandala.segments) % mandala.segments;
      }
      return newRotations;
    });
  };

  useEffect(() => {
    // Check if all rotations match the solution
    const solved = rotations.every((rot, i) => rot === mandala.solution[i]);
    if (solved) {
      setIsSolved(true);
      // Wait for the glow animation to be visible before showing the dialog
      setTimeout(() => setIsInsightOpen(true), 1500); 
    }
  }, [rotations, mandala.solution]);
  
  const handleCloseDialog = () => {
    setIsInsightOpen(false);
  }

  // Calculate ring sizes for consistent layout
  const ringSizes = useMemo(() => {
    const sizes = [];
    const baseSize = 100;
    const step = baseSize / (mandala.rings + 1);
    for (let i = 0; i < mandala.rings; i++) {
        sizes.push(baseSize - (i * step));
    }
    return sizes.reverse();
  }, [mandala.rings]);


  return (
    <>
      <div className="w-full max-w-2xl flex flex-col items-center">
        <div 
            className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center transition-all duration-500"
            style={{ transform: isSolved ? 'scale(1.05)' : 'scale(1)' }}
        >
          {Array.from({ length: mandala.rings }).map((_, ringIndex) => {
            const ringSize = ringSizes[ringIndex];
            const SymbolComponent = Icons[mandala.symbols[ringIndex % mandala.symbols.length]];
            const actualRingIndex = mandala.rings - 1 - ringIndex;

            return (
              <div
                key={actualRingIndex}
                className="absolute flex items-center justify-center"
                 style={{
                    width: `${ringSize}%`,
                    height: `${ringSize}%`,
                }}
              >
                <div
                    className={cn(
                        "absolute rounded-full border-2 border-primary/20 transition-transform duration-700 ease-in-out",
                        isSolved && "animate-mandala-glow"
                    )}
                    style={{
                        width: '100%',
                        height: '100%',
                        transform: `rotate(${rotations[actualRingIndex] * segmentAngle}deg)`,
                    }}
                    onClick={() => handleRotate(actualRingIndex, 'cw')}
                    onContextMenu={(e) => { e.preventDefault(); handleRotate(actualRingIndex, 'ccw'); }}
                >
                {Array.from({ length: mandala.segments }).map((_, segmentIndex) => (
                  <div
                    key={segmentIndex}
                    className="absolute w-full h-full"
                    style={{
                      transform: `rotate(${segmentIndex * segmentAngle}deg)`,
                    }}
                  >
                    <div
                      className="absolute top-[-10px] sm:top-[-12px] left-1/2 -translate-x-1/2 text-primary/70"
                      style={{
                        transform: `rotate(${-rotations[actualRingIndex] * segmentAngle}deg)`, // Counter-rotate icon to keep it upright
                      }}
                    >
                      <SymbolComponent className="w-4 h-4 sm:w-6 sm:h-6" />
                    </div>
                  </div>
                ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 space-y-4 w-full px-4">
             {Array.from({ length: mandala.rings }).reverse().map((_, ringIndex) => (
                <div key={ringIndex} className="flex items-center justify-between gap-4 bg-card/50 p-2 rounded-lg border">
                    <span className="text-sm font-medium text-muted-foreground">Ring {ringIndex + 1}</span>
                    <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="w-10 h-10" onClick={() => handleRotate(ringIndex, 'ccw')} disabled={isSolved}>
                            <RotateCcw className="w-5 h-5"/>
                            <span className="sr-only">Rotate Ring {ringIndex + 1} Counter-Clockwise</span>
                        </Button>
                        <Button variant="outline" size="icon" className="w-10 h-10" onClick={() => handleRotate(ringIndex, 'cw')} disabled={isSolved}>
                            <RotateCw className="w-5 h-5"/>
                             <span className="sr-only">Rotate Ring {ringIndex + 1} Clockwise</span>
                        </Button>
                    </div>
                </div>
            ))}
        </div>
      </div>

      <div className="mt-8 text-center text-muted-foreground text-sm">
        <p>Align all symbols to the top to solve the puzzle.</p>
        <p className="hidden md:block">Tip: Click rings to rotate clockwise, right-click for counter-clockwise.</p>
        <p className="font-bold mt-2">Moves: {moves}</p>
      </div>

      <CulturalInsightDialog 
        mandala={mandala}
        isOpen={isInsightOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}
