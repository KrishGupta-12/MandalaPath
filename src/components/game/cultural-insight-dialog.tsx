'use client';
import { useEffect, useState } from 'react';
import { generateCulturalInsight } from '@/ai/flows/generate-cultural-insight';
import { generateAudio } from '@/ai/flows/generate-audio';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader, AlertTriangle, Volume2, StopCircle } from 'lucide-react';
import type { MandalaLevel } from '@/lib/types';
import { Separator } from '../ui/separator';

interface CulturalInsightDialogProps {
  mandala: MandalaLevel;
  isOpen: boolean;
  onClose: () => void;
}

export function CulturalInsightDialog({ mandala, isOpen, onClose }: CulturalInsightDialogProps) {
  const [insight, setInsight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isAudioLoading, setIsAudioLoading] = useState(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const fetchInsight = async () => {
        setIsLoading(true);
        setError(null);
        setInsight('');
        setAudioUrl(null);
        try {
          const result = await generateCulturalInsight({ mandalaName: mandala.name, level: mandala.level });
          setInsight(result.insight);
        } catch (e) {
          console.error('Failed to generate insight:', e);
          setError('Could not retrieve wisdom at this time. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchInsight();
    } else {
        if(audioPlayer) {
            audioPlayer.pause();
            setAudioPlayer(null);
            setIsPlaying(false);
        }
    }
  }, [isOpen, mandala.name, mandala.level]);

  const handleAudioPlayback = async () => {
    if (isPlaying && audioPlayer) {
        audioPlayer.pause();
        audioPlayer.currentTime = 0;
        setIsPlaying(false);
        return;
    }

    if (audioUrl) {
      const player = new Audio(audioUrl);
      setAudioPlayer(player);
      player.play();
      setIsPlaying(true);
      player.onended = () => setIsPlaying(false);
      return;
    }
    
    if (!insight) return;

    setIsAudioLoading(true);
    setAudioError(null);
    try {
      const audioDataUrl = await generateAudio(insight);
      setAudioUrl(audioDataUrl);
      const player = new Audio(audioDataUrl);
      setAudioPlayer(player);
      player.play();
      setIsPlaying(true);
      player.onended = () => setIsPlaying(false);
    } catch (e) {
      console.error('Failed to generate audio:', e);
      setAudioError('Could not generate audio.');
    } finally {
      setIsAudioLoading(false);
    }
  };


  const handleOpenChange = (open: boolean) => {
    if (!open) {
        onClose();
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl text-primary">Mandala Complete!</DialogTitle>
          <DialogDescription>
            You have brought balance to the {mandala.name}. Here is a piece of wisdom for you.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className="py-4 min-h-[100px] flex items-center justify-center relative">
          {isLoading && (
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Loader className="h-6 w-6 animate-spin text-primary" />
              <span>Unlocking ancient wisdom...</span>
            </div>
          )}
          {error && (
            <div className="flex flex-col items-center justify-center space-y-2 text-destructive">
              <AlertTriangle className="h-8 w-8" />
              <span>{error}</span>
            </div>
          )}
          {insight && (
            <div className="text-center text-foreground/90 whitespace-pre-wrap font-body italic pr-12">
                <p>&quot;{insight}&quot;</p>
            </div>
          )}
           {insight && !isLoading && (
            <div className="absolute top-4 right-0">
                <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={handleAudioPlayback} 
                    disabled={isAudioLoading}
                    aria-label={isPlaying ? "Stop listening" : "Listen to insight"}
                >
                    {isAudioLoading ? (
                        <Loader className="h-5 w-5 animate-spin" />
                    ) : isPlaying ? (
                        <StopCircle className="h-5 w-5" />
                    ) : (
                        <Volume2 className="h-5 w-5" />
                    )}
                </Button>
                {audioError && <p className="text-xs text-destructive mt-1">{audioError}</p>}
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">Continue Your Path</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
