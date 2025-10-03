'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useUser } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  
  useEffect(() => {
    if (!isUserLoading && !user) {
      router.push('/login');
    }
  }, [user, isUserLoading, router]);

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
      <p className="text-foreground/80 mb-8">Your account details.</p>
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="space-y-4 text-sm">
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground">Display Name</p>
                <p className="font-semibold text-foreground">{user.displayName || 'Not set'}</p>
              </div>
              <Separator />
              <div className="space-y-1">
                <p className="font-medium text-muted-foreground">Email</p>
                <p className="font-semibold text-foreground">{user.email}</p>
              </div>
            </div>
        </CardContent>
      </Card>
    </div>
  );
}
