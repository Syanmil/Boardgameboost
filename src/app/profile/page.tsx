import { currentUser, badges, userBadges, pointTransactions } from "@/lib/data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Award,
  Calendar,
  Gem,
  Medal,
  Star,
} from "lucide-react";

export default function ProfilePage() {
  const user = currentUser;
  const myBadges = userBadges
    .filter((ub) => ub.userId === user.id)
    .map((ub) => badges.find((b) => b.id === ub.badgeId))
    .filter(Boolean) as (typeof badges);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <Card className="w-full sm:max-w-xs text-center">
            <CardContent className="p-6 flex flex-col items-center gap-4">
            <Avatar className="h-24 w-24 border-4 border-primary/50">
                <AvatarImage src={user.avatarUrl} alt={user.displayName} />
                <AvatarFallback className="text-3xl">{user.displayName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="space-y-1">
                <h2 className="text-2xl font-headline font-semibold">{user.displayName}</h2>
                <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button>Edit Profile</Button>
            </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 flex-1 w-full">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Star className="w-5 h-5 text-amber-500" /> Membership</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Status</span>
                        <Badge variant={user.membershipStatus === 'active' ? 'default': 'destructive'} className="capitalize">{user.membershipStatus}</Badge>
                    </div>
                     <div className="flex justify-between">
                        <span className="text-muted-foreground">Tier</span>
                        <span className="font-semibold flex items-center gap-1 capitalize"><Gem className="w-4 h-4 text-primary" /> {user.membershipTier}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Expires</span>
                        <span className="font-semibold">{new Date(user.membershipExpiry).toLocaleDateString()}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Joined</span>
                        <span className="font-semibold">{new Date(user.joinDate).toLocaleDateString()}</span>
                    </div>
                </CardContent>
                 <CardFooter>
                    <Button variant="outline" className="w-full">Renew Membership</Button>
                 </CardFooter>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Medal className="w-5 h-5 text-primary" /> Points & Badges</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Contribution Points</span>
                        <span className="font-bold text-xl text-primary">{user.totalContributionPoints}</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-muted-foreground">Testing Points</span>
                         <span className="font-bold text-xl text-accent">{user.totalTestingPoints}</span>
                    </div>
                     <Separator />
                     <h3 className="font-semibold">Earned Badges</h3>
                     <div className="flex flex-wrap gap-2">
                        {myBadges.map(badge => (
                            <Badge key={badge.id} variant="secondary" className="text-lg p-2" title={badge.description}>
                                {badge.icon}
                            </Badge>
                        ))}
                     </div>
                </CardContent>
            </Card>
        </div>
      </div>

       <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>A log of your recent point transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Points</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {pointTransactions.filter(pt => pt.userId === user.id).slice(0, 5).map(pt => (
                <TableRow key={pt.id}>
                  <TableCell className="font-medium">{pt.description}</TableCell>
                  <TableCell className="hidden sm:table-cell">{new Date(pt.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className={`text-right font-bold ${pt.points > 0 ? 'text-green-600': 'text-red-600'}`}>
                    {pt.points > 0 ? '+' : ''}{pt.points}
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
