'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import type { Mandala } from '@/lib/types';
import { Icons } from '@/components/shared/icons';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Play, RotateCcw } from 'lucide-react';
import { addDocumentNonBlocking, useFirestore, useUser } from '@/firebase';
import { collection, serverTimestamp } from 'firebase/firestore';

interface CosmicRecallProps {
  mandala: Mandala;
}

type GameState = 'idle' | 'showingSequence' | 'awaitingInput' | 'gameOver';

const SYMBOL_FLASH_DURATION = 400; // ms
const DELAY_BETWEEN_FLASHES = 200; // ms

export function CosmicRecall({ mandala }: CosmicRecallProps) {
  const { user } = useUser();
  const firestore = useFirestore();
  const [sequence, setSequence] = useState<number[]>([]);
  const [playerInput, setPlayerInput] = useState<number[]>([]);
  const [gameState, setGameState] = useState<GameState>('idle');
  const [score, setScore] = useState(0);
  const [activeSymbol, setActiveSymbol] = useState<number | null>(null);

  const symbolsOnBoard = useMemo(() => {
    return Array.from({ length: mandala.segments }).map((_, i) => ({
      Icon: Icons[mandala.symbols[i % mandala.symbols.length]],
      id: i,
    }));
  }, [mandala.segments, mandala.symbols]);

  const startGame = () => {
    setSequence([]);
    setPlayerInput([]);
    setScore(0);
    setGameState('showingSequence');
  };

  const nextRound = useCallback(() => {
    setPlayerInput([]);
    const nextSymbol = Math.floor(Math.random() * mandala.segments);
    setSequence(prev => [...prev, nextSymbol]);
    setGameState('showingSequence');
  }, [mandala.segments]);
  
  useEffect(() => {
      if (gameState === 'showingSequence') {
          if (sequence.length === 0) {
            // Start the first round
            setTimeout(() => nextRound(), 500);
            return;
          }
    
          const showSequence = async () => {
            await new Promise(res => setTimeout(res, 500)); // Pause before showing
            for (const symbolId of sequence) {
              setActiveSymbol(symbolId);
              await new Promise(res => setTimeout(res, SYMBOL_FLASH_DURATION));
              setActiveSymbol(null);
              await new Promise(res => setTimeout(res, DELAY_BETWEEN_FLASHES));
            }
            setGameState('awaitingInput');
          };
          showSequence();
      }
  }, [gameState, sequence, nextRound]);


  const handleSymbolClick = (symbolId: number) => {
    if (gameState !== 'awaitingInput') return;

    const newPlayerInput = [...playerInput, symbolId];
    setPlayerInput(newPlayerInput);

    // Check if the latest input is correct
    if (newPlayerInput[newPlayerInput.length - 1] !== sequence[newPlayerInput.length - 1]) {
      setGameState('gameOver');
      saveScore();
      return;
    }

    // Check if the sequence is complete
    if (newPlayerInput.length === sequence.length) {
      setScore(prev => prev + 1);
      setTimeout(() => nextRound(), 500); // Give a little pause before next round
    }
  };

  const saveScore = async () => {
    if (!user || !firestore || score === 0) return;
    try {
        const leaderboardRef = collection(firestore, 'leaderboardEntries');
        addDocumentNonBlocking(leaderboardRef, {
            userId: user.uid,
            displayName: user.displayName || 'Anonymous',
            photoURL: user.photoURL || '',
            mandalaId: mandala.id,
            score: score,
            timestamp: serverTimestamp(),
        });
    } catch(e) {
        console.error("Error saving score: ", e);
    }
  }


  return (
    <div className="w-full max-w-2xl flex flex-col items-center">
      <div className="relative w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] flex items-center justify-center">
        {/* Central display for score or game state */}
        <div className="absolute z-10 flex flex-col items-center justify-center text-center">
            {gameState === 'idle' && (
                <Button size="lg" className="h-24 w-24 rounded-full flex-col gap-1" onClick={startGame}>
                    <Play className="h-8 w-8" />
                    <span className="text-lg font-bold">Start</span>
                </Button>
            )}
            {(gameState === 'showingSequence' || gameState === 'awaitingInput') && (
                <>
                    <span className="text-sm text-muted-foreground">Score</span>
                    <span className="text-6xl font-bold text-primary">{score}</span>
                </>
            )}
             {gameState === 'gameOver' && (
                <div className="flex flex-col items-center">
                    <span className="text-xl text-muted-foreground font-headline">Game Over</span>
                    <span className="text-6xl font-bold text-destructive">{score}</span>
                    <Button size="lg" onClick={startGame} className="mt-4">
                        <RotateCcw className="mr-2 h-5 w-5" />
                        Play Again
                    </Button>
                </div>
            )}
        </div>

        {/* Symbols arranged in a circle */}
        {symbolsOnBoard.map(({ Icon, id }, index) => {
          const angle = (index / mandala.segments) * 360;
          return (
            <div
              key={id}
              className="absolute w-full h-full"
              style={{ transform: `rotate(${angle}deg)` }}
            >
              <div
                className={cn(
                  'absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 flex items-center justify-center transition-all duration-150',
                  gameState === 'awaitingInput' && 'cursor-pointer hover:scale-110',
                   (activeSymbol === id || (gameState === 'awaitingInput' && playerInput[playerInput.length-1] === id)) && 'scale-125'
                )}
                onClick={() => handleSymbolClick(id)}
              >
                <Icon
                  className={cn(
                    'w-10 h-10 text-primary/60 transition-all duration-150',
                     gameState === 'awaitingInput' && 'hover:text-primary',
                    activeSymbol === id && '!text-accent scale-150',
                    gameState === 'gameOver' && playerInput[playerInput.length-1] === id && '!text-destructive'
                  )}
                  style={{ transform: `rotate(${-angle}deg)` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
