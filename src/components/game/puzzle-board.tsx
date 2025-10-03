'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Mandala } from '@/lib/types';
import { Icons } from '@/components/shared/icons';
import { cn } from '@/lib/utils';
import { CulturalInsightDialog } from './cultural-insight-dialog';

interface PuzzleBoardProps {
  mandala: Mandala;
}

export function PuzzleBoard({ mandala }: PuzzleBoardProps) {
  const [rotations, setRotations] = useState<number[]>(() => Array(mandala.rings).fill(0));
  const [isSolved, setIsSolved] = useState(false);
  const [isInsightOpen, setIsInsightOpen] = useState(false);

  const segmentAngle = 360 / mandala.segments;

  const handleRotate = (ringIndex: number, direction: 'cw' | 'ccw') => {
    if (isSolved) return;

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
    const solved = rotations.every((rot, i) => rot === mandala.solution[i]);
    if (solved) {
      setIsSolved(true);
      setTimeout(() => setIsInsightOpen(true), 2000); // Wait for animation
    }
  }, [rotations, mandala.solution]);
  
  const handleCloseDialog = () => {
    setIsInsightOpen(false);
  }

  const ringSizes = useMemo(() => {
    const sizes = [];
    for (let i = 0; i < mandala.rings; i++) {
        sizes.push(100 - (i * (100/mandala.rings)) - 5);
    }
    return sizes.reverse();
  }, [mandala.rings]);


  return (
    <>
      <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center">
        {Array.from({ length: mandala.rings }).map((_, ringIndex) => {
          const ringSize = ringSizes[ringIndex];
          const SymbolComponent = Icons[mandala.symbols[ringIndex % mandala.symbols.length]];

          return (
            <div
              key={ringIndex}
              className={cn(
                "absolute rounded-full border-2 border-primary/20 transition-transform duration-500 ease-in-out cursor-pointer hover:border-accent",
                isSolved && "animate-mandala-glow"
              )}
              style={{
                width: `${ringSize}%`,
                height: `${ringSize}%`,
                transform: `rotate(${rotations[ringIndex] * segmentAngle}deg)`,
              }}
              onClick={() => handleRotate(ringIndex, 'cw')}
              onContextMenu={(e) => { e.preventDefault(); handleRotate(ringIndex, 'ccw'); }}
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
                    className="absolute top-[-8px] left-1/2 -translate-x-1/2 text-primary/70"
                    style={{
                      transform: `rotate(${-rotations[ringIndex] * segmentAngle}deg)`, // Counter-rotate icon
                    }}
                  >
                    <SymbolComponent className="w-4 h-4 sm:w-6 sm:h-6" />
                  </div>
                </div>
              ))}
            </div>
          );
        })}
      </div>
      <div className="mt-8 text-center text-muted-foreground">
        <p>Click to rotate clockwise. Right-click for counter-clockwise.</p>
        <p>Align all symbols to the top to solve.</p>
      </div>

      <CulturalInsightDialog 
        mandala={mandala}
        isOpen={isInsightOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}
