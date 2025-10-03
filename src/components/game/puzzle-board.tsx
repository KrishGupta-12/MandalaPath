'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import type { Mandala } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RotateCcw, RotateCw, Lock } from 'lucide-react';
import { CulturalInsightDialog } from '@/components/game/cultural-insight-dialog';
import { Icons } from '../shared/icons';

interface PuzzleBoardProps {
  mandala: Mandala;
}

// Generate a random, unsolved starting configuration
const createInitialState = (solution: number[], segments: number): number[] => {
  let initialState: number[];
  do {
    initialState = solution.map(() => Math.floor(Math.random() * segments));
  } while (JSON.stringify(initialState) === JSON.stringify(solution)); // Ensure it's not solved initially
  return initialState;
};

export function PuzzleBoard({ mandala }: PuzzleBoardProps) {
  const [rotations, setRotations] = useState(() => createInitialState(mandala.solution, mandala.segments));
  const [isSolved, setIsSolved] = useState(false);
  const [moves, setMoves] = useState(0);
  const [isInsightOpen, setIsInsightOpen] = useState(false);

  // Memoize which rings are correctly positioned
  const correctRings = useMemo(() => {
    return rotations.map((rot, index) => rot === mandala.solution[index]);
  }, [rotations, mandala.solution]);

  useEffect(() => {
    // Check if all rings are correct
    if (correctRings.every(isCorrect => isCorrect)) {
      setTimeout(() => setIsSolved(true), 500); // Delay for the final glow animation
    }
  }, [correctRings]);
  
  useEffect(() => {
      if(isSolved) {
          setTimeout(() => setIsInsightOpen(true), 1000);
      }
  }, [isSolved]);


  const handleRotate = (ringIndex: number, direction: 'cw' | 'ccw') => {
    if (correctRings[ringIndex]) return; // Don't rotate a solved ring

    setRotations(prevRotations => {
      const newRotations = [...prevRotations];
      if (direction === 'cw') {
        newRotations[ringIndex] = (newRotations[ringIndex] + 1) % mandala.segments;
      } else {
        newRotations[ringIndex] = (newRotations[ringIndex] - 1 + mandala.segments) % mandala.segments;
      }
      return newRotations;
    });
    setMoves(prev => prev + 1);
  };
  
    const handleRingClick = (e: React.MouseEvent, ringIndex: number) => {
    if (correctRings[ringIndex]) return;
    e.preventDefault();
    handleRotate(ringIndex, e.type === 'contextmenu' ? 'ccw' : 'cw');
  }

  const resetGame = () => {
    setRotations(createInitialState(mandala.solution, mandala.segments));
    setIsSolved(false);
    setMoves(0);
    setIsInsightOpen(false);
  }

  const ringRadius = (ringIndex: number) => 50 + ringIndex * 35;

  return (
    <>
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-center gap-8">
        {/* Puzzle Board */}
        <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center">
          {rotations.map((rotation, ringIndex) => {
            const isCorrect = correctRings[ringIndex];
            return (
              <div
                key={ringIndex}
                className={cn(
                    "absolute rounded-full transition-all duration-300",
                    isCorrect && "shadow-[0_0_20px_theme(colors.accent.DEFAULT)]"
                )}
                style={{
                  width: `${ringRadius(ringIndex) * 2}px`,
                  height: `${ringRadius(ringIndex) * 2}px`,
                  transform: `rotate(${(rotation / mandala.segments) * 360}deg)`,
                  cursor: isCorrect ? 'default' : 'pointer'
                }}
                onContextMenu={(e) => handleRingClick(e, ringIndex)}
                onClick={(e) => handleRingClick(e, ringIndex)}
              >
                {Array.from({ length: mandala.segments }).map((_, segmentIndex) => {
                    const symbolAngle = (segmentIndex / mandala.segments) * 360;
                    const Icon = Icons[mandala.symbols[segmentIndex % mandala.symbols.length]];
                  return (
                    <div
                      key={segmentIndex}
                      className="absolute w-full h-full"
                      style={{ transform: `rotate(${symbolAngle}deg)` }}
                    >
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 flex items-center justify-center">
                         <Icon className="w-6 h-6 text-primary" style={{ transform: `rotate(${-symbolAngle - (rotation / mandala.segments) * 360}deg)` }}/>
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
                    const isCorrect = correctRings[ringIndex];
                    return (
                        <div key={ringIndex} className="flex items-center justify-between p-2 rounded-lg bg-card border">
                            <span className={cn("font-medium", isCorrect ? "text-accent" : "text-foreground")}>Ring {ringIndex + 1}</span>
                            {isCorrect ? (
                                <div className="flex items-center gap-2 text-accent">
                                    <Lock className="w-5 h-5"/>
                                    <span>Locked</span>
                                </div>
                            ) : (
                                <div className="flex gap-1">
                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleRotate(ringIndex, 'ccw')}>
                                        <RotateCcw className="w-5 h-5" />
                                    </Button>
                                    <Button size="icon" variant="ghost" className="h-8 w-8" onClick={() => handleRotate(ringIndex, 'cw')}>
                                        <RotateCw className="w-5 h-5" />
                                    </Button>
                                </div>
                            )}
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
