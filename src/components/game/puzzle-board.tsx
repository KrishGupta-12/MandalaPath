'use client';

import React, { useState, useEffect, useMemo } from 'react';
import type { Mandala } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RotateCcw, RotateCw } from 'lucide-react';
import { CulturalInsightDialog } from '@/components/game/cultural-insight-dialog';
import { Icons } from '../shared/icons';

interface PuzzleBoardProps {
  mandala: Mandala;
}

// Generate a random, unsolved starting configuration
const createInitialState = (solution: number[], segments: number, rings: number): number[] => {
  let initialState: number[];
  const isSolved = (state: number[]) => {
      for (let i = 0; i < rings -1; i++) {
        const rot1 = state[i];
        const rot2 = state[i+1];
        const swastikaPositions = [Math.round(segments / 2)];
        
        let isLinked = false;
        for (const pos of swastikaPositions) {
            if ((rot1 + pos) % segments === (rot2 + pos) % segments) {
                isLinked = true;
                break;
            }
        }
        if (!isLinked) return false;
    }
    return true;
  }

  do {
    initialState = Array.from({length: rings},() => Math.floor(Math.random() * segments));
  } while (isSolved(initialState)); // Ensure it's not solved initially
  return initialState;
};


export function PuzzleBoard({ mandala }: PuzzleBoardProps) {
  const [rotations, setRotations] = useState(() => createInitialState(mandala.solution, mandala.segments, mandala.rings));
  const [isSolved, setIsSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isInsightOpen, setIsInsightOpen] = useState(false);

  // Memoize which rings are linked to their inner neighbor
  const ringLinks = useMemo(() => {
    const links = Array(mandala.rings - 1).fill(false);
    const swastikaPositions = [Math.round(mandala.segments / 2)]; // Swastika is at the halfway point

    for (let i = 0; i < mandala.rings - 1; i++) {
        const rot1 = rotations[i];
        const rot2 = rotations[i+1];
        for (const pos of swastikaPositions) {
            if ((rot1 + pos) % mandala.segments === (rot2 + pos) % mandala.segments) {
                links[i] = true;
                break;
            }
        }
    }
    return links;
  }, [rotations, mandala.rings, mandala.segments]);

  useEffect(() => {
    // Check if all rings are linked
    if (ringLinks.every(isLinked => isLinked)) {
      setTimeout(() => setIsSolved(true), 500); // Delay for the final glow animation
    }
  }, [ringLinks]);
  
  useEffect(() => {
      if(isSolved) {
          setTimeout(() => setIsInsightOpen(true), 1000);
      }
  }, [isSolved]);

  const getLinkedGroup = (ringIndex: number): number[] => {
      const group: number[] = [ringIndex];
      // Check outwards
      for (let i = ringIndex; i < mandala.rings - 1; i++) {
          if (ringLinks[i]) {
              group.push(i + 1);
          } else {
              break;
          }
      }
      // Check inwards
      for (let i = ringIndex - 1; i >= 0; i--) {
          if (ringLinks[i]) {
              group.push(i);
          } else {
              break;
          }
      }
      return Array.from(new Set(group));
  };

  const handleRotate = (ringIndex: number, direction: 'cw' | 'ccw') => {
    if (isSolved) return;

    const linkedGroup = getLinkedGroup(ringIndex);

    setRotations(prevRotations => {
      const newRotations = [...prevRotations];
      const step = direction === 'cw' ? 1 : -1;

      linkedGroup.forEach(idx => {
          newRotations[idx] = (newRotations[idx] + step + mandala.segments) % mandala.segments;
      });
      
      return newRotations;
    });
    setMoves(prev => prev + 1);
  };
  
    const handleRingClick = (e: React.MouseEvent, ringIndex: number) => {
    if (isSolved) return;
    e.preventDefault();
    handleRotate(ringIndex, e.type === 'contextmenu' ? 'ccw' : 'cw');
  }

  const resetGame = () => {
    setRotations(createInitialState(mandala.solution, mandala.segments, mandala.rings));
    setIsSolved(false);
    setMoves(0);
    setIsInsightOpen(false);
  }

  const ringRadius = (ringIndex: number) => 50 + ringIndex * 35;
  const swastikaPosition = Math.round(mandala.segments / 2);

  return (
    <>
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Puzzle Board */}
        <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center">
          {rotations.map((rotation, ringIndex) => {
            const isFirstRing = ringIndex === 0;
            const isLinkedToInner = !isFirstRing && ringLinks[ringIndex-1];
            const isLinkedToOuter = ringIndex < mandala.rings - 1 && ringLinks[ringIndex];
            const isFullyLinked = (isFirstRing || isLinkedToInner) && (ringIndex === mandala.rings - 1 || isLinkedToOuter);
            
            return (
              <div
                key={ringIndex}
                className={cn(
                    "absolute rounded-full border border-transparent transition-all duration-300",
                    isSolved && "animate-pulse",
                    {"shadow-[0_0_20px_theme(colors.accent.DEFAULT)]": isSolved || isFullyLinked },
                )}
                style={{
                  width: `${ringRadius(ringIndex) * 2}px`,
                  height: `${ringRadius(ringIndex) * 2}px`,
                  transform: `rotate(${(rotation / mandala.segments) * 360}deg)`,
                  cursor: isSolved ? 'default' : 'pointer'
                }}
                onContextMenu={(e) => handleRingClick(e, ringIndex)}
                onClick={(e) => handleRingClick(e, ringIndex)}
              >
                {Array.from({ length: mandala.segments }).map((_, segmentIndex) => {
                    const symbolAngle = (segmentIndex / mandala.segments) * 360;
                    const isSwastika = segmentIndex === swastikaPosition;
                    const Icon = Icons[isSwastika ? 'swastika' : mandala.symbols[segmentIndex % mandala.symbols.length]];
                    
                    const isLinkPoint = isSwastika && (
                      (ringIndex > 0 && ringLinks[ringIndex-1]) || 
                      (ringIndex < mandala.rings - 1 && ringLinks[ringIndex])
                    );

                  return (
                    <div
                      key={segmentIndex}
                      className="absolute w-full h-full"
                      style={{ transform: `rotate(${symbolAngle}deg)` }}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center">
                         <Icon className={cn(
                             "w-6 h-6 text-primary transition-colors duration-300",
                              isLinkPoint && "text-accent",
                              isSolved && "text-accent"
                            )} 
                            style={{ transform: `rotate(${-symbolAngle - (rotation / mandala.segments) * 360}deg)` }}
                          />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Controls and Stats */}
        <div className="w-full md:w-64 flex flex-col gap-4">
            <div className="text-center p-4 rounded-lg bg-card border">
                <p className="text-sm text-muted-foreground">Moves</p>
                <p className="text-4xl font-bold text-primary">{moves}</p>
            </div>
            <div className="flex flex-col gap-2">
                {rotations.map((_, ringIndex) => {
                    return (
                        <div key={ringIndex} className="flex items-center justify-between p-2 rounded-lg bg-card border">
                            <span className={cn("font-medium text-foreground")}>Ring {ringIndex + 1}</span>
                            <div className="flex gap-1">
                                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleRotate(ringIndex, 'ccw')} disabled={isSolved}>
                                    <RotateCcw className="w-5 h-5" />
                                </Button>
                                <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleRotate(ringIndex, 'cw')} disabled={isSolved}>
                                    <RotateCw className="w-5 h-5" />
                                </Button>
                            </div>
                        </div>
                    )
                })}
            </div>
             <Button onClick={resetGame} variant="outline" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Puzzle
            </Button>
        </div>
      </div>
      <CulturalInsightDialog 
        mandala={mandala} 
        isOpen={isInsightOpen} 
        onClose={resetGame} 
      />
    </>
  );
}
