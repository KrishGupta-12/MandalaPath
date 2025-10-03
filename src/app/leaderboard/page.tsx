'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useUser, useFirestore, useCollection, useMemoFirebase } from '@/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { collection, query, orderBy, limit } from 'firebase/firestore';
import type { LeaderboardEntry, LeaderboardPlayer, UserProfile } from '@/lib/types';

export default function LeaderboardPage() {
    const { user, isUserLoading } = useUser();
    const router = useRouter();
    const firestore = useFirestore();

    const leaderboardQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return query(collection(firestore, 'leaderboardEntries'), orderBy('score', 'desc'), limit(20));
    }, [firestore]);

    const usersQuery = useMemoFirebase(() => {
        if (!firestore) return null;
        return collection(firestore, 'users');
    }, [firestore]);

    const { data: leaderboardData, isLoading: isLoadingLeaderboard } = useCollection<LeaderboardEntry>(leaderboardQuery);
    const { data: usersData, isLoading: isLoadingUsers } = useCollection<UserProfile>(usersQuery);

    const populatedLeaderboard = useMemo<LeaderboardPlayer[]>(() => {
        if (!leaderboardData || !usersData) return [];

        const usersMap = new Map(usersData.map(u => [u.id, u]));
        
        return leaderboardData.map((entry, index) => {
            const userProfile = usersMap.get(entry.userId);
            return {
                rank: index + 1,
                name: userProfile?.displayName || 'Anonymous',
                score: entry.score,
                avatar: userProfile?.photoURL || `https://picsum.photos/seed/${entry.userId}/40/40`,
                userId: entry.userId,
            };
        });

    }, [leaderboardData, usersData]);
  
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
      <p className="text-foreground/80 mb-8">See who has the sharpest cosmic recall.</p>
      
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
                                <TableHead className="text-right">Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {(isLoadingLeaderboard || isLoadingUsers) ? (
                                Array.from({length: 5}).map((_, i) => (
                                    <TableRow key={i}>
                                        <TableCell><Skeleton className="h-5 w-5 rounded-full" /></TableCell>
                                        <TableCell>
                                          <div className="flex items-center gap-3">
                                            <Skeleton className="h-8 w-8 rounded-full" />
                                            <Skeleton className="h-5 w-32" />
                                          </div>
                                        </TableCell>
                                        <TableCell className="text-right"><Skeleton className="h-5 w-12" /></TableCell>
                                    </TableRow>
                                ))
                            ) : (
                            populatedLeaderboard.map((player) => {
                                return (
                                <TableRow key={player.rank}>
                                    <TableCell className="font-medium text-primary">{player.rank}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="w-8 h-8">
                                                 <AvatarImage src={player.avatar} alt={player.name} />
                                                <AvatarFallback>{player.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{player.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right font-bold text-lg">{player.score}</TableCell>
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
