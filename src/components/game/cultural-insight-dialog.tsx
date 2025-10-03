'use client';
import { useEffect, useState } from 'react';
import { generateCulturalInsight } from '@/ai/flows/generate-cultural-insight';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Loader, AlertTriangle } from 'lucide-react';
import type { Mandala } from '@/lib/types';
import { Separator } from '../ui/separator';

interface CulturalInsightDialogProps {
  mandala: Mandala;
  isOpen: boolean;
  onClose: () => void;
}

export function CulturalInsightDialog({ mandala, isOpen, onClose }: CulturalInsightDialogProps) {
  const [insight, setInsight] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      const fetchInsight = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const result = await generateCulturalInsight({ mandalaName: mandala.name });
          setInsight(result.insight);
        } catch (e) {
          console.error('Failed to generate insight:', e);
          setError('Could not retrieve wisdom at this time. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchInsight();
    }
  }, [isOpen, mandala.name]);

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
        <div className="py-4">
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
            <div className="text-center text-foreground/90 whitespace-pre-wrap font-body italic">
                <p>&quot;{insight}&quot;</p>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
