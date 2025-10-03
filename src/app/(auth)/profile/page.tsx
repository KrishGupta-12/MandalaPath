'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto py-8">
       <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">Profile</h1>
      <p className="text-foreground/80 mb-8">Manage your account and preferences.</p>
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
          <CardDescription>Update your personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="flex items-center gap-6">
                <Avatar className="w-20 h-20 border-4 border-primary/20">
                    {user.photoURL && <AvatarImage src={user.photoURL} alt={user.displayName || 'User'} />}
                    <AvatarFallback className="text-2xl">{user.displayName ? user.displayName.charAt(0) : 'U'}</AvatarFallback>
                </Avatar>
                <Button variant="outline">Change Avatar</Button>
            </div>
            <Separator />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" defaultValue={user.displayName || ''} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" defaultValue={user.email || ''} readOnly />
            </div>
          </div>
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90">Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}
