import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { GameProject } from "@/lib/types";
import { Users, Clock, ArrowRight } from "lucide-react";

type ProjectCardProps = {
  project: GameProject;
};

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <Image
          src={`https://placehold.co/600x400.png`}
          alt={`Cover for ${project.title}`}
          width={600}
          height={400}
          className="object-cover w-full h-48"
          data-ai-hint="game box art"
        />
        <div className="absolute top-2 right-2">
            <Badge className="capitalize backdrop-blur-sm bg-background/50">{project.stage}</Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4 flex-grow">
        <CardTitle className="font-headline text-xl mb-2 hover:text-primary transition-colors">
            <Link href={`/projects/${project.id}`}>{project.title}</Link>
        </CardTitle>
        <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex flex-col items-start gap-4">
        <div className="flex items-center gap-4 text-sm text-muted-foreground w-full">
            <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{project.playerCount.min}-{project.playerCount.max}</span>
            </div>
            <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>{project.playTime} min</span>
            </div>
        </div>
        <Button asChild variant="outline" size="sm" className="w-full">
          <Link href={`/projects/${project.id}`}>
            View Details
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
