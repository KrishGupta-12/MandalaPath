'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { MandalaLevel } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RotateCcw, HeartPulse } from 'lucide-react';
import { CulturalInsightDialog } from '@/components/game/cultural-insight-dialog';
import { Icons } from '../shared/icons';

interface PuzzleBoardProps {
  mandala: MandalaLevel;
  onSolve: () => void;
}

// Generate a random, unsolved starting configuration
const createInitialState = (mandala: MandalaLevel): number[] => {
  let initialState: number[];
  const isSolved = (state: number[]) => {
    for (let i = 0; i < mandala.rings - 1; i++) {
      const rot1 = state[i];
      const rot2 = state[i + 1];

      let isLinked = false;
      const linkSymbolIndices = mandala.symbols.reduce((acc, symbol, index) => (symbol === 'logo' ? [...acc, index] : acc), [] as number[]);

      for (const pos of linkSymbolIndices) {
        if ((rot1 + pos) % mandala.segments === (rot2 + pos) % mandala.segments) {
          isLinked = true;
          break;
        }
      }
      if (!isLinked) return false;
    }
    return true;
  };

  do {
    initialState = Array.from({ length: mandala.rings }, () => Math.floor(Math.random() * mandala.segments));
  } while (isSolved(initialState)); // Ensure it's not solved initially
  return initialState;
};

export function PuzzleBoard({ mandala, onSolve }: PuzzleBoardProps) {
  const [rotations, setRotations] = useState(() => createInitialState(mandala));
  const [isSolved, setIsSolved] = useState(false);
  const [prana, setPrana] = useState(0);
  const [isInsightOpen, setIsInsightOpen] = useState(false);

  const boardContainerRef = useRef<HTMLDivElement>(null);
  const [boardSize, setBoardSize] = useState(500);

  const linkSymbolPositions = useMemo(() =>
    mandala.symbols.reduce((acc, symbol, index) => (symbol === 'logo' ? [...acc, index] : acc), [] as number[]),
    [mandala.symbols]
  );

  // Ring links based on rotation
  const ringLinks = useMemo(() => {
    const links = Array(mandala.rings - 1).fill(false);
    for (let i = 0; i < mandala.rings - 1; i++) {
      const rot1 = rotations[i];
      const rot2 = rotations[i + 1];
      for (const pos of linkSymbolPositions) {
        if ((rot1 + pos) % mandala.segments === (rot2 + pos) % mandala.segments) {
          links[i] = true;
          break;
        }
      }
    }
    return links;
  }, [rotations, mandala.rings, mandala.segments, linkSymbolPositions]);

  // Solved state check
  useEffect(() => {
    if (ringLinks.every(isLinked => isLinked)) {
      setTimeout(() => setIsSolved(true), 500);
    }
  }, [ringLinks]);

  // Post-solve dialog
  useEffect(() => {
    if (isSolved) {
      setTimeout(() => setIsInsightOpen(true), 1000);
    }
  }, [isSolved]);

  // Responsive board sizing
  useEffect(() => {
    const updateSize = () => {
      if (boardContainerRef.current) {
        const parent = boardContainerRef.current.parentElement;
        if (parent) {
            const parentWidth = parent.clientWidth;
            const parentHeight = parent.clientHeight;
            const size = Math.min(parentWidth, parentHeight) * 0.9;
            setBoardSize(size);
        }
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

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

  const handleRotate = (ringIndex: number) => {
    if (isSolved) return;

    const linkedGroup = getLinkedGroup(ringIndex);

    setRotations(prevRotations => {
      const newRotations = [...prevRotations];
      const step = 1; // Always rotate clockwise

      linkedGroup.forEach(idx => {
        newRotations[idx] = (newRotations[idx] + step + mandala.segments) % mandala.segments;
      });

      return newRotations;
    });
    setPrana(prev => prev + 1);
  };

  const handleCloseDialog = () => {
    setIsInsightOpen(false);
    onSolve();
  };

  const resetGame = () => {
    setRotations(createInitialState(mandala));
    setIsSolved(false);
    setPrana(0);
    setIsInsightOpen(false);
  };

  const ringBaseRadius = boardSize * 0.15;
  const ringGap = (boardSize / 2 - ringBaseRadius) / mandala.rings;
  const ringRadius = (ringIndex: number) => ringBaseRadius + ringIndex * ringGap;
  const symbolSize = Math.max(12, ringGap * 0.6);

  return (
    <>
      <div className="w-full flex-grow flex flex-col items-center justify-center p-2">
        <div className="text-center mb-4">
             <h1 className="text-xl md:text-2xl font-headline font-bold text-primary">
                {mandala.name}
            </h1>
            <p className="text-foreground/80 text-sm">Align all 'logo' symbols to restore the mandala.</p>
        </div>

        {/* Responsive Puzzle Board Container */}
        <div ref={boardContainerRef} className="relative flex-grow w-full flex items-center justify-center">
          <div className="absolute" style={{ width: boardSize, height: boardSize }}>
            {rotations.map((rotation, ringIndex) => {
              const isFirstRing = ringIndex === 0;
              const isLinkedToInner = !isFirstRing && ringLinks[ringIndex - 1];
              const isLinkedToOuter = ringIndex < mandala.rings - 1 && ringLinks[ringIndex];
              const isFullyLinked = (isFirstRing || isLinkedToInner) && (ringIndex === mandala.rings - 1 || isLinkedToOuter);
              const currentRadius = ringRadius(ringIndex);
              
              return (
                <div
                  key={ringIndex}
                  className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20 transition-all duration-500",
                    isSolved && "animate-pulse",
                    { "shadow-[0_0_20px_theme(colors.accent.DEFAULT)] border-accent": isSolved || isFullyLinked },
                  )}
                  style={{
                    width: `${currentRadius * 2}px`,
                    height: `${currentRadius * 2}px`,
                    transform: `rotate(${(rotation / mandala.segments) * 360}deg)`,
                    cursor: isSolved ? 'default' : 'pointer'
                  }}
                  onClick={() => handleRotate(ringIndex)}
                >
                  {Array.from({ length: mandala.segments }).map((_, segmentIndex) => {
                    const symbolAngle = (segmentIndex / mandala.segments) * 360;
                    const Icon = Icons[mandala.symbols[segmentIndex % mandala.symbols.length]];
                    const isLinkPoint = mandala.symbols[segmentIndex] === 'logo' && (
                      (ringIndex > 0 && ringLinks[ringIndex - 1]) ||
                      (ringIndex < mandala.rings - 1 && ringLinks[ringIndex])
                    );

                    return (
                      <div
                        key={segmentIndex}
                        className="absolute w-full h-full"
                        style={{ transform: `rotate(${symbolAngle}deg)` }}
                      >
                        <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 flex items-center justify-center" style={{ width: symbolSize, height: symbolSize }}>
                          <Icon className={cn(
                            "text-primary transition-colors duration-300",
                            isLinkPoint && "text-accent",
                            isSolved && "text-accent"
                          )}
                            style={{
                              width: symbolSize,
                              height: symbolSize,
                              transform: `rotate(${-symbolAngle - (rotation / mandala.segments) * 360}deg)`
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls and Stats */}
        <div className="w-full max-w-sm flex flex-col items-center gap-4 mt-4">
          <div className="w-full grid grid-cols-2 gap-4">
            <div className="text-center p-3 rounded-lg bg-card border">
              <p className="text-xs text-muted-foreground flex items-center justify-center gap-1"><HeartPulse className="w-3 h-3" />PRANA</p>
              <p className="text-2xl font-bold text-primary">{prana}</p>
            </div>
            <Button onClick={resetGame} variant="outline" className="w-full h-full text-base">
              <RotateCcw className="w-4 h-4 mr-2" />
              Reset
            </Button>
          </div>
        </div>
      </div>
      <CulturalInsightDialog
        mandala={mandala}
        isOpen={isInsightOpen}
        onClose={handleCloseDialog}
      />
    </>
  );
}
