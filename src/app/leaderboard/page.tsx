import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { users } from '@/lib/data';
import { Badge } from '@/components/ui/badge';
import { Trophy } from 'lucide-react';

export default function LeaderboardPage() {
  const sortedUsers = [...users].sort(
    (a, b) => b.totalContributionPoints - a.totalContributionPoints
  );

  const getRankColor = (rank: number) => {
    if (rank === 0) return 'text-amber-400';
    if (rank === 1) return 'text-slate-400';
    if (rank === 2) return 'text-amber-600';
    return 'text-muted-foreground';
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Leaderboard</h1>
        <p className="text-muted-foreground">
          See who is leading the charge in our design community.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Contributors</CardTitle>
          <CardDescription>
            Ranked by total contribution points earned from all activities.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Rank</TableHead>
                <TableHead>Member</TableHead>
                <TableHead className="hidden md:table-cell">Tier</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsers.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center gap-2 font-bold text-lg">
                      <Trophy className={`w-6 h-6 ${getRankColor(index)}`} />
                      {index + 1}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                        <AvatarFallback>
                          {user.displayName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{user.displayName}</p>
                        <p className="text-sm text-muted-foreground hidden sm:block">{user.email}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant={user.membershipTier === 'premium' ? 'default' : 'secondary'} className="capitalize">
                      {user.membershipTier}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {user.totalContributionPoints}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
