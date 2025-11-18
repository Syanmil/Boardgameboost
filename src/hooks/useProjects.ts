import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  fetchProjects,
  fetchProject,
  createProject,
  updateProject,
  deleteProject,
  updateProjectVisibility,
  updateProjectStage,
  fetchDesignerProjects,
  fetchProjectsByStage,
  searchProjects,
} from '@/lib/api/projects';
import type { ProjectFormData, UpdateProjectFormData } from '@/lib/schemas/project.schema';
import { useToast } from '@/hooks/use-toast';

/**
 * React Query hooks for game projects
 */

// Query keys
export const projectKeys = {
  all: ['projects'] as const,
  lists: () => [...projectKeys.all, 'list'] as const,
  list: (filters?: Record<string, unknown>) => [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, 'detail'] as const,
  detail: (id: string) => [...projectKeys.details(), id] as const,
  designer: (designerId: string) => [...projectKeys.all, 'designer', designerId] as const,
  stage: (stage: string) => [...projectKeys.all, 'stage', stage] as const,
  search: (query: string) => [...projectKeys.all, 'search', query] as const,
};

/**
 * Fetch all projects with optional filters
 */
export function useProjects(filters?: {
  stage?: string;
  designerId?: string;
  isActive?: boolean;
  search?: string;
}) {
  return useQuery({
    queryKey: projectKeys.list(filters),
    queryFn: () => fetchProjects(filters),
  });
}

/**
 * Fetch a single project by ID
 */
export function useProject(id: string) {
  return useQuery({
    queryKey: projectKeys.detail(id),
    queryFn: () => fetchProject(id),
    enabled: !!id,
  });
}

/**
 * Fetch projects by designer
 */
export function useDesignerProjects(designerId: string) {
  return useQuery({
    queryKey: projectKeys.designer(designerId),
    queryFn: () => fetchDesignerProjects(designerId),
    enabled: !!designerId,
  });
}

/**
 * Fetch projects by stage
 */
export function useProjectsByStage(stage: string) {
  return useQuery({
    queryKey: projectKeys.stage(stage),
    queryFn: () => fetchProjectsByStage(stage),
    enabled: !!stage,
  });
}

/**
 * Search projects
 */
export function useSearchProjects(query: string) {
  return useQuery({
    queryKey: projectKeys.search(query),
    queryFn: () => searchProjects(query),
    enabled: query.length >= 3, // Only search if query is at least 3 characters
  });
}

/**
 * Create a new project
 */
export function useCreateProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: ProjectFormData) => createProject(data),
    onSuccess: (newProject) => {
      // Invalidate and refetch projects list
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });

      // Invalidate designer projects
      if (newProject.designer_id) {
        queryClient.invalidateQueries({
          queryKey: projectKeys.designer(newProject.designer_id)
        });
      }

      toast({
        title: 'Project created!',
        description: `${newProject.title} has been created successfully.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to create project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Update an existing project
 */
export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (data: UpdateProjectFormData) => updateProject(data),
    onSuccess: (updatedProject) => {
      // Invalidate project lists
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });

      // Invalidate this specific project
      queryClient.invalidateQueries({
        queryKey: projectKeys.detail(updatedProject.id)
      });

      // Invalidate designer projects
      if (updatedProject.designer_id) {
        queryClient.invalidateQueries({
          queryKey: projectKeys.designer(updatedProject.designer_id)
        });
      }

      toast({
        title: 'Project updated!',
        description: `${updatedProject.title} has been updated successfully.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Delete a project
 */
export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: (id: string) => deleteProject(id),
    onSuccess: () => {
      // Invalidate all project queries
      queryClient.invalidateQueries({ queryKey: projectKeys.all });

      toast({
        title: 'Project deleted',
        description: 'Your project has been deleted successfully.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to delete project',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Update project visibility
 */
export function useUpdateProjectVisibility() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, visibility }: { id: string; visibility: 'public' | 'private' | 'unlisted' }) =>
      updateProjectVisibility(id, visibility),
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(updatedProject.id) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });

      toast({
        title: 'Visibility updated',
        description: `Project is now ${updatedProject.visibility}.`,
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update visibility',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}

/**
 * Update project stage
 */
export function useUpdateProjectStage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: ({ id, stage }: {
      id: string;
      stage: 'concept' | 'prototype' | 'playtesting' | 'refining' | 'pitching' | 'published'
    }) => updateProjectStage(id, stage),
    onSuccess: (updatedProject) => {
      queryClient.invalidateQueries({ queryKey: projectKeys.detail(updatedProject.id) });
      queryClient.invalidateQueries({ queryKey: projectKeys.lists() });

      const stageMessages: Record<string, string> = {
        concept: 'Your game is in the concept stage.',
        prototype: 'Time to build your prototype!',
        playtesting: 'Ready for playtesting!',
        refining: 'Refining your design based on feedback.',
        pitching: 'Preparing to pitch to publishers!',
        published: '🎉 Congratulations! Your game is published!',
      };

      toast({
        title: 'Stage updated!',
        description: stageMessages[updatedProject.stage] || 'Project stage updated.',
      });
    },
    onError: (error: Error) => {
      toast({
        title: 'Failed to update stage',
        description: error.message,
        variant: 'destructive',
      });
    },
  });
}
