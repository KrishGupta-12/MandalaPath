'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useUser, useCollection, useFirestore, useMemoFirebase } from '@/firebase';
import { Award, Medal } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { collection } from 'firebase/firestore';
import type { UserMandalaProgress } from '@/lib/types';
import { getTitleByLevel } from '@/lib/constants';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

  const userProgressQuery = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return collection(firestore, 'users', user.uid, 'mandalaProgress');
  }, [firestore, user]);

  const { data: userProgress } = useCollection<UserMandalaProgress>(userProgressQuery);

  const { totalLevel, playerTitle } = useMemo(() => {
    if (!userProgress) return { totalLevel: 0, playerTitle: 'Mandala Novice' };
    const total = userProgress.reduce((sum, p) => sum + (p.level - 1), 0);
    return { totalLevel: total, playerTitle: getTitleByLevel(total) };
  }, [userProgress]);


  if (isUserLoading || !user) {
    return (
        <div className="flex h-screen items-center justify-center">
            <div className="text-center">
                <p>Loading...</p>
            </div>
        </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-2xl">
       <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">Profile</h1>
      <p className="text-foreground/80 mb-8">Your journey and accomplishments.</p>
      <div className="grid gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your personal details.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
              <div className="space-y-4 text-sm">
                <div className="space-y-1">
                  <p className="font-medium text-muted-foreground">Display Name</p>
                  <p className="font-semibold text-foreground text-lg">{user.displayName || 'Not set'}</p>
                </div>
                <Separator />
                <div className="space-y-1">
                  <p className="font-medium text-muted-foreground">Email</p>
                  <p className="font-semibold text-foreground">{user.email}</p>
                </div>
              </div>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle>Your Progress</CardTitle>
            <CardDescription>Your rank in the path of wisdom.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="flex items-center gap-4 p-4 rounded-lg bg-primary/10">
                <Award className="w-10 h-10 text-primary"/>
                <div>
                  <p className="font-medium text-muted-foreground">Current Title</p>
                  <p className="font-headline font-bold text-2xl text-primary">{playerTitle}</p>
                </div>
              </div>
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground">Total Levels Completed</p>
                <p className="font-semibold text-foreground text-xl">{totalLevel}</p>
              </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
