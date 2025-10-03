'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
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
    <div className="container mx-auto py-8">
       <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">Profile</h1>
      <p className="text-foreground/80 mb-8">View your account details.</p>
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Your personal details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border-4 border-primary/20">
                    {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
                    <AvatarFallback className="text-2xl">{user.displayName ? user.displayName.charAt(0).toUpperCase() : 'U'}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-2xl font-bold font-headline">{user.displayName || 'User'}</p>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
            </div>
            <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-1">
              <p className="font-medium text-muted-foreground">Display Name</p>
              <p className="font-semibold text-foreground">{user.displayName || 'Not set'}</p>
            </div>
            <div className="space-y-1">
              <p className="font-medium text-muted-foreground">Email</p>
              <p className="font-semibold text-foreground">{user.email}</p>
            </div>
             <div className="space-y-1">
              <p className="font-medium text-muted-foreground">User ID</p>
              <p className="font-mono text-xs text-foreground bg-muted p-2 rounded-md">{user.uid}</p>
            </div>
             <div className="space-y-1">
              <p className="font-medium text-muted-foreground">Email Verified</p>
              <p className="font-semibold text-foreground">{user.emailVerified ? 'Yes' : 'No'}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
