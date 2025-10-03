'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/firebase';
import { LEADERBOARD_DATA } from '@/lib/constants';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function LeaderboardPage() {
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
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-primary mb-2">Leaderboard</h1>
      <p className="text-foreground/80 mb-8">See who is the fastest mandala master.</p>
      
      <Card>
        <CardContent className="p-0">
            <Tabs defaultValue="global">
                <div className="p-4 border-b">
                    <TabsList>
                        <TabsTrigger value="global">Global</TabsTrigger>
                        <TabsTrigger value="friends">Friends</TabsTrigger>
                    </TabsList>
                </div>
                <TabsContent value="global" className="m-0">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Rank</TableHead>
                                <TableHead>Player</TableHead>
                                <TableHead className="text-right">Time</TableHead>
                                <TableHead className="text-right">Moves</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {LEADERBOARD_DATA.global.map((player) => {
                                const avatar = PlaceHolderImages.find(img => img.id === 'user-avatar-1');
                                return (
                                <TableRow key={player.rank}>
                                    <TableCell className="font-medium text-primary">{player.rank}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-8 h-8">
                                                {avatar && <AvatarImage src={avatar.imageUrl} alt={player.name} data-ai-hint={avatar.imageHint} />}
                                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{player.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">{player.time}</TableCell>
                                    <TableCell className="text-right">{player.moves}</TableCell>
                                </TableRow>
                            )})}
                        </TableBody>
                    </Table>
                </TabsContent>
                <TabsContent value="friends" className="m-0">
                    <div className="p-6 text-center text-muted-foreground">
                        <p>Friend leaderboards coming soon!</p>
                    </div>
                </TabsContent>
            </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
