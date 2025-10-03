'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LoginPage() {
  const { user, login } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
  }, [user, router]);
  
  const handleLogin = () => {
    login({ name: 'Guest User', email: 'guest@mandala.path' });
  };


  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-headline text-primary">Welcome Back</CardTitle>
        <CardDescription>Sign in to continue your journey</CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleLogin} className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-bold">
            <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 111.8 512 0 400.2 0 261.8 0 123.8 111.8 12.8 244 12.8c70.3 0 129.8 27.8 174.4 71.3l-89.5 65.5c-32.3-30.8-77.2-49.8-127.9-49.8-96.9 0-175.8 78.8-175.8 176.2s78.9 176.2 175.8 176.2c102.3 0 148.5-73.8 153.3-112.5H244V257.6h242.9c1.2 12.2 1.8 24.8 1.8 37.2z"></path></svg>
          Sign in with Google
        </Button>
      </CardContent>
    </Card>
  );
}
