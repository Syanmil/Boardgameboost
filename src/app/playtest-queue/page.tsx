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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { gameProjects, playtestSessions, queueEntries, users } from '@/lib/data';
import { calculatePriority } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function PlaytestQueuePage() {
    const queuedItems = queueEntries
    .filter((entry) => entry.status === 'queued')
    .map(entry => {
        const project = gameProjects.find(p => p.id === entry.gameProjectId);
        const designer = users.find(u => u.id === project?.designerId);
        if (!project || !designer) return null;
        return {
            ...entry,
            projectTitle: project.title,
            designerName: designer.displayName,
            priority: calculatePriority(designer, entry.submittedAt)
        }
    })
    .filter(Boolean)
    .sort((a, b) => (b?.priority ?? 0) - (a?.priority ?? 0));

    const scheduledItems = playtestSessions.filter(s => s.status === 'scheduled');

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">Playtest Hub</h1>
        <p className="text-muted-foreground">
          Manage the playtest queue and view upcoming sessions.
        </p>
      </div>
      <Tabs defaultValue="queue">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="queue">Playtest Queue</TabsTrigger>
          <TabsTrigger value="sessions">Upcoming Sessions</TabsTrigger>
        </TabsList>
        <TabsContent value="queue">
          <Card>
            <CardHeader>
              <CardTitle>Current Queue</CardTitle>
              <CardDescription>
                Games submitted for playtesting, prioritized automatically.
              </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Project</TableHead>
                            <TableHead className="hidden md:table-cell">Designer</TableHead>
                            <TableHead className="hidden sm:table-cell">Submitted</TableHead>
                            <TableHead className="text-right">Priority</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {queuedItems.map((item) => (
                           item && <TableRow key={item.id}>
                                <TableCell className="font-medium">
                                    <Link href={`/projects/${item.gameProjectId}`} className="hover:underline">{item.projectTitle}</Link>
                                </TableCell>
                                <TableCell className="hidden md:table-cell">{item.designerName}</TableCell>
                                <TableCell className="hidden sm:table-cell">{new Date(item.submittedAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right font-bold text-primary">{item.priority.toFixed(0)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Sessions</CardTitle>
              <CardDescription>
                Scheduled playtests. Sign up to help out!
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              {scheduledItems.map(session => {
                const project = gameProjects.find(p => p.id === session.gameProjectId);
                if (!project) return null;
                return (
                    <Card key={session.id}>
                        <CardHeader>
                            <CardTitle className="text-lg">{project.title}</CardTitle>
                            <CardDescription>{session.venue}</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-2">
                           <p className="text-sm font-medium">{new Date(session.scheduledDate).toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' })}</p>
                           <p className="text-sm text-muted-foreground">{session.notes}</p>
                           <div className="flex items-center justify-between pt-2">
                            <Badge variant="secondary">{session.registeredPlayers.length} / {session.maxPlayers} testers</Badge>
                            <Button size="sm">Sign Up</Button>
                           </div>
                        </CardContent>
                    </Card>
                )
              })}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
