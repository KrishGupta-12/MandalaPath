'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

export default function SettingsPage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  if (isUserLoading || !user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">
        Settings
      </h1>
      <p className="text-foreground/80 mb-8">
        Customize your Mandala Path experience.
      </p>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Personalization</CardTitle>
            <CardDescription>
              Tailor the wisdom you receive to your interests.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="insight-type">Preferred Insight Type</Label>
              <Select defaultValue="shloka">
                <SelectTrigger id="insight-type" className="w-full md:w-1/2">
                  <SelectValue placeholder="Select insight type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shloka">
                    Sanskrit Shlokas with meaning
                  </SelectItem>
                  <SelectItem value="historicalFact">
                    Historical Facts
                  </SelectItem>
                  <SelectItem value="mythologicalStory">
                    Mythological Stories
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Interface</CardTitle>
            <CardDescription>
              Adjust the look and feel of the application.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
              <Label htmlFor="dark-mode" className="flex flex-col space-y-1">
                <span>Dark Mode</span>
                <span className="font-normal leading-snug text-muted-foreground">
                  Coming soon!
                </span>
              </Label>
              <Switch id="dark-mode" disabled />
            </div>
          </CardContent>
        </Card>
        <div className="flex justify-end">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Save Preferences</Button>
        </div>
      </div>
    </div>
  );
}
