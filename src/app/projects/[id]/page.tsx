import { notFound } from "next/navigation";
import Image from "next/image";
import { gameProjects, users, feedbacks, gameIterations } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Clock,
  Puzzle,
  FileText,
  Download,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Wand2,
  GitCommit,
  UserCircle,
} from "lucide-react";
import Link from "next/link";
import { Separator } from "@/components/ui/separator";
import { AIToolsClient } from "./ai-tools";

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const project = gameProjects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

  const designer = users.find((u) => u.id === project.designerId);
  const projectFeedback = feedbacks.filter(f => f.gameProjectId === project.id);
  const projectIterations = gameIterations.filter(i => i.gameProjectId === project.id);

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
                 <Image
                    src={`https://placehold.co/600x400.png`}
                    alt={`Cover for ${project.title}`}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full rounded-l-lg"
                    data-ai-hint="game box art"
                />
            </div>
            <div className="md:col-span-2 p-6">
                <Badge className="capitalize mb-2">{project.stage}</Badge>
                <h1 className="text-4xl font-bold font-headline mb-2">{project.title}</h1>
                <p className="text-lg text-muted-foreground mb-4">
                    Designed by <Link href="/profile" className="text-primary hover:underline font-medium">{designer?.displayName}</Link>
                </p>
                <p className="mb-6">{project.description}</p>
                
                <div className="flex flex-wrap gap-4 text-sm mb-6">
                    <div className="flex items-center gap-2 font-medium">
                        <Users className="w-5 h-5 text-primary" />
                        <span>{project.playerCount.min}-{project.playerCount.max} Players</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                        <Clock className="w-5 h-5 text-primary" />
                        <span>{project.playTime} min</span>
                    </div>
                    <div className="flex items-center gap-2 font-medium">
                        <Puzzle className="w-5 h-5 text-primary" />
                        <span>Complexity: {project.complexity}/5</span>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    {project.mechanics.map(mech => <Badge key={mech} variant="secondary">{mech}</Badge>)}
                </div>
            </div>
        </div>
      </Card>

      <Tabs defaultValue="details">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="feedback">Feedback</TabsTrigger>
          <TabsTrigger value="iterations">Iterations</TabsTrigger>
          <TabsTrigger value="ai-tools">AI Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
            <Card>
                <CardHeader><CardTitle>Project Details</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    <p><strong>Current Version:</strong> {project.currentVersion}</p>
                    <h3 className="font-semibold text-lg">Game Materials</h3>
                    {project.materials.length > 0 ? (
                        project.materials.map(material => (
                             <div key={material.name} className="flex items-center justify-between p-2 rounded-md border">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-muted-foreground" />
                                    <span>{material.name}</span>
                                </div>
                                <Button size="sm" variant="ghost"><Download className="mr-2 h-4 w-4" /> Download</Button>
                             </div>
                        ))
                    ) : <p className="text-muted-foreground">No materials uploaded yet.</p>}
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="feedback">
            <Card>
                <CardHeader>
                    <CardTitle>Playtest Feedback</CardTitle>
                    <CardDescription>All feedback collected from playtest sessions.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {projectFeedback.map(fb => {
                        const tester = users.find(u => u.id === fb.playerId);
                        return (
                            <div key={fb.id} className="p-4 border rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2 font-semibold">
                                        <UserCircle className="w-5 h-5" />
                                        {tester?.displayName}
                                    </div>
                                    <span className="text-sm text-muted-foreground">{new Date(fb.submittedAt).toLocaleDateString()}</span>
                                </div>
                                <Separator className="my-2" />
                                <div className="grid md:grid-cols-2 gap-4 text-sm">
                                   <div className="space-y-2">
                                        <p className="flex items-start gap-2"><ThumbsUp className="w-4 h-4 mt-0.5 text-green-500" /> <div><strong>Liked:</strong> {fb.comments.liked}</div></p>
                                        <p className="flex items-start gap-2"><ThumbsDown className="w-4 h-4 mt-0.5 text-red-500" /> <div><strong>Disliked:</strong> {fb.comments.disliked}</div></p>
                                   </div>
                                    <div className="space-y-2">
                                        <p className="flex items-start gap-2"><Wand2 className="w-4 h-4 mt-0.5 text-blue-500" /> <div><strong>Suggestions:</strong> {fb.comments.suggestions}</div></p>
                                        <p className="flex items-start gap-2"><MessageSquare className="w-4 h-4 mt-0.5 text-amber-500" /> <div><strong>Confusing:</strong> {fb.comments.confusing}</div></p>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>
        </TabsContent>

        <TabsContent value="iterations">
             <Card>
                <CardHeader>
                    <CardTitle>Development Iterations</CardTitle>
                    <CardDescription>History of changes made to the game based on feedback.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {projectIterations.map(iter => (
                         <div key={iter.id} className="p-4 border rounded-lg">
                             <div className="flex items-center gap-3 mb-2">
                                <GitCommit className="w-5 h-5 text-primary" />
                                <span className="font-bold text-lg font-headline">Version {iter.version}</span>
                                <span className="text-sm text-muted-foreground">{new Date(iter.createdAt).toLocaleDateString()}</span>
                             </div>
                             <p>{iter.changesDescription}</p>
                         </div>
                    ))}
                </CardContent>
            </Card>
        </TabsContent>
        
        <TabsContent value="ai-tools">
            <AIToolsClient project={project} feedback={projectFeedback}/>
        </TabsContent>
      </Tabs>
    </div>
  );
}
