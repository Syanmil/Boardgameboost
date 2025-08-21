import { ProjectCard } from "@/components/project-card";
import { Button } from "@/components/ui/button";
import { gameProjects } from "@/lib/data";
import { PlusCircle } from "lucide-react";

export default function ProjectsPage() {
  const activeProjects = gameProjects.filter(p => p.isActive);

  return (
    <div className="flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
                <h1 className="text-3xl font-bold tracking-tight font-headline">Game Projects</h1>
                <p className="text-muted-foreground">
                    Discover the next big hit from our community designers.
                </p>
            </div>
            <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Create New Project
            </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    </div>
  )
}
