'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser } from '@/firebase';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { LEADERBOARD_DATA } from '@/lib/constants';

export default function LeaderboardPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();

    const populatedLeaderboard = LEADERBOARD_DATA.global;
    const isLoadingLeaderboard = false;
    const isLoadingUsers = false;
  
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
                        <TabsTrigger value="friends" disabled>Friends</TabsTrigger>
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
                            {(isLoadingLeaderboard || isLoadingUsers) ? (
                                Array.from({length: 5}).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-5 w-5 rounded-full" /></TableCell>
                                        <TableCell><Skeleton className="h-5 w-32" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-5 w-12" /></TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-5 w-8" /></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                            populatedLeaderboard.map((player, index) => {
                                return (
                                <TableRow key={player.rank}>
                                    <TableCell className="font-medium text-primary">{index + 1}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-8 h-8">
                                                 <AvatarImage src={player.avatar} alt={player.name} />
                                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{player.name || 'Anonymous'}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">{player.time}</TableCell>
                                    <TableCell className="text-right">{player.moves}</TableCell>
                                </TableRow>
                            )})
                            )}
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
