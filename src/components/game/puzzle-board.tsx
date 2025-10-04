'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import type { MandalaLevel } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { RotateCcw, HeartPulse } from 'lucide-react';
import { CulturalInsightDialog } from '@/components/game/cultural-insight-dialog';
import { Icons } from '../shared/icons';
import { TOTAL_LEVELS_PER_MANDALA } from '@/lib/constants';

interface PuzzleBoardProps {
    mandala: MandalaLevel;
    onSolve: () => void;
}

// Generate a random, unsolved starting configuration
const createInitialState = (mandala: MandalaLevel): number[] => {
  let initialState: number[];
  const isSolved = (state: number[]) => {
    const linkSymbolIndices = mandala.symbols.reduce((acc, symbol, index) => (symbol === 'logo' ? [...acc, index] : acc), [] as number[]);

    for (let i = 0; i < mandala.rings - 1; i++) {
      const rot1 = state[i];
      const rot2 = state[i + 1];

      let isLinked = false;
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
  const [prana, setPrana] = useState(mandala.rings * mandala.level * 3);
  const [isInsightOpen, setIsInsightOpen] = useState(false);

  const boardContainerRef = useRef<HTMLDivElement>(null);
  const clickTimeoutRef = useRef<NodeJS.Timeout | null>(null);
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
            const size = Math.min(parentWidth, parentHeight) * 0.8; // Reduced from 0.9 to 0.8
            setBoardSize(size);
        }
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  const handleRotate = (ringIndex: number, direction: 'cw' | 'ccw') => {
    if (isSolved || prana <= 0) return;
  
    setRotations(prevRotations => {
      const newRotations = [...prevRotations];
      const step = direction === 'cw' ? 1 : -1;
  
      newRotations[ringIndex] = (newRotations[ringIndex] + step + mandala.segments) % mandala.segments;
  
      return newRotations;
    });
    setPrana(prev => prev - 1);
  };

  const handleRingClick = (ringIndex: number) => {
    if (clickTimeoutRef.current) {
      // This is a double tap/click
      clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = null;
      handleRotate(ringIndex, 'ccw');
    } else {
      // This is a single tap/click, wait for a potential double
      clickTimeoutRef.current = setTimeout(() => {
        handleRotate(ringIndex, 'cw');
        clickTimeoutRef.current = null;
      }, 250); // 250ms double-click timeout
    }
  };
  
  const handleCloseDialog = () => {
    setIsInsightOpen(false);
    onSolve();
  };

  const resetGame = () => {
    setRotations(createInitialState(mandala));
    setIsSolved(false);
    setPrana(mandala.rings * mandala.level * 3);
    setIsInsightOpen(false);
  };
  
  // Dynamic scaling based on number of rings
  const ringBaseRadiusFactor = 0.1; // The center hole size is 10% of the board
  const maxRingAreaFactor = 1 - ringBaseRadiusFactor; // The area available for rings
  const ringGapFactor = maxRingAreaFactor / mandala.rings;
  const ringGap = boardSize * 0.5 * ringGapFactor;
  
  const ringRadius = (ringIndex: number) => {
      const baseRadius = boardSize * 0.5 * ringBaseRadiusFactor;
      return baseRadius + (ringIndex + 1) * ringGap;
  };
  
  // Scale symbols to fit within the ring gap
  const symbolSize = Math.max(10, Math.min(24, ringGap * 0.5));


  return (
    <>
      <div className="w-full flex-grow flex flex-col items-center justify-center p-2 relative">
        <div className="text-center absolute top-0 w-full">
             <h1 className="text-2xl md:text-3xl font-headline font-bold text-primary">
                {mandala.name}
            </h1>
            <p className="text-foreground/80">Level {mandala.level} / {TOTAL_LEVELS_PER_MANDALA}</p>
        </div>

        {/* Dedicated, Responsive Puzzle Board Container */}
        <div ref={boardContainerRef} className="w-full flex-grow flex items-center justify-center">
          <div className="relative" style={{ width: boardSize, height: boardSize }}>
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
                    transform: `translate(-50%, -50%) rotate(${(rotation / mandala.segments) * 360}deg)`,
                    cursor: isSolved ? 'default' : 'pointer',
                    zIndex: mandala.rings - ringIndex, // Higher z-index for inner rings
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    handleRingClick(ringIndex);
                  }}
                  onContextMenu={(e) => {
                      e.preventDefault();
                      handleRotate(ringIndex, 'ccw');
                  }}
                >
                  {Array.from({ length: mandala.segments }).map((_, segmentIndex) => {
                    const symbolAngle = (segmentIndex / mandala.segments) * 360;
                    const Icon = Icons[mandala.symbols[segmentIndex % mandala.symbols.length]];
                    const isLinkPoint = mandala.symbols[segmentIndex % mandala.symbols.length] === 'logo' && (
                      (ringIndex > 0 && ringLinks[ringIndex - 1]) ||
                      (ringIndex < mandala.rings - 1 && ringLinks[ringIndex])
                    );

                    return (
                      <div
                        key={segmentIndex}
                        className="absolute w-full h-full"
                        style={{ transform: `rotate(${symbolAngle}deg)` }}
                      >
                        <div className="absolute top-[-1px] left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center" style={{ width: symbolSize, height: symbolSize }}>
                          <Icon className={cn(
                            "text-primary transition-colors duration-300",
                            isLinkPoint && "text-accent",
                            isSolved && "text-accent"
                          )}
                            style={{
                              width: '100%',
                              height: '100%',
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
        <div className="w-full max-w-sm flex flex-col items-center gap-4">
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
