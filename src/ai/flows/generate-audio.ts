'use server';
/**
 * @fileOverview Converts text to speech using Google's generative AI.
 *
 * - generateAudio - A function that takes text and returns a data URI for the audio.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { z } from 'genkit';
import wav from 'wav';

async function toWav(
  pcmData: Buffer,
  channels = 1,
  rate = 24000,
  sampleWidth = 2
): Promise<string> {
  return new Promise((resolve, reject) => {
    const writer = new wav.Writer({
      channels,
      sampleRate: rate,
      bitDepth: sampleWidth * 8,
    });

    const bufs: any[] = [];
    writer.on('error', reject);
    writer.on('data', function (d) {
      bufs.push(d);
    });
    writer.on('end', function () {
      resolve(Buffer.concat(bufs).toString('base64'));
    });

    writer.write(pcmData);
    writer.end();
  });
}

export const generateAudioFlow = ai.defineFlow(
  {
    name: 'generateAudioFlow',
    inputSchema: z.string(),
    outputSchema: z.string(),
  },
  async (text) => {
    if (!text) {
        return '';
    }

    try {
        const ttsModel = googleAI.model('gemini-2.5-flash-preview-tts');

        const { media } = await ai.generate({
            model: ttsModel,
            config: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: { voiceName: 'Algenib' },
                },
              },
            },
            prompt: text,
          });

        if (!media) {
            console.warn('No audio media was generated for the provided text.');
            return '';
        }
        
        const audioBuffer = Buffer.from(
            media.url.substring(media.url.indexOf(',') + 1),
            'base64'
        );
          
        const wavBase64 = await toWav(audioBuffer);

        return `data:audio/wav;base64,${wavBase64}`;
    } catch (error) {
        console.error('Error generating audio:', error);
        return ''; // Return an empty string on error to prevent crashes
    }
  }
);


export async function generateAudio(text: string): Promise<string> {
    return generateAudioFlow(text);
}
