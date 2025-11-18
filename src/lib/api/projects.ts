import { createClient } from '@/lib/supabase/client';
import type { Database } from '@/lib/types/database.types';
import type { ProjectFormData, UpdateProjectFormData } from '@/lib/schemas/project.schema';

type GameProject = Database['public']['Tables']['game_projects']['Row'];
type GameProjectInsert = Database['public']['Tables']['game_projects']['Insert'];
type GameProjectUpdate = Database['public']['Tables']['game_projects']['Update'];

/**
 * Project API Functions
 * All functions for managing game projects
 */

/**
 * Fetch all projects with optional filters
 */
export async function fetchProjects(filters?: {
  stage?: string;
  designerId?: string;
  isActive?: boolean;
  search?: string;
}) {
  const supabase = createClient();

  let query = supabase
    .from('game_projects')
    .select(`
      *,
      designer:profiles!designer_id(
        id,
        display_name,
        avatar_url,
        membership_tier
      ),
      materials:project_materials(*)
    `)
    .order('created_at', { ascending: false });

  // Apply filters
  if (filters?.stage) {
    query = query.eq('stage', filters.stage);
  }

  if (filters?.designerId) {
    query = query.eq('designer_id', filters.designerId);
  }

  if (filters?.isActive !== undefined) {
    query = query.eq('is_active', filters.isActive);
  }

  if (filters?.search) {
    query = query.ilike('title', `%${filters.search}%`);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching projects:', error);
    throw new Error('Failed to fetch projects');
  }

  return data;
}

/**
 * Fetch a single project by ID
 */
export async function fetchProject(id: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('game_projects')
    .select(`
      *,
      designer:profiles!designer_id(
        id,
        display_name,
        avatar_url,
        bio,
        membership_tier
      ),
      materials:project_materials(*)
    `)
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching project:', error);
    throw new Error('Failed to fetch project');
  }

  return data;
}

/**
 * Create a new project
 */
export async function createProject(data: ProjectFormData) {
  const supabase = createClient();

  // Get current user
  const { data: { user }, error: userError } = await supabase.auth.getUser();

  if (userError || !user) {
    throw new Error('You must be logged in to create a project');
  }

  // Prepare insert data
  const insertData: GameProjectInsert = {
    designer_id: user.id,
    title: data.title,
    description: data.description,
    tagline: data.tagline,
    stage: data.stage,
    player_count_min: data.playerCount.min,
    player_count_max: data.playerCount.max,
    play_time: data.playTime,
    complexity: data.complexity,
    mechanics: data.mechanics,
    themes: data.themes || [],
    visibility: data.visibility,
    current_version: '0.1',
    is_active: true,
  };

  const { data: project, error } = await supabase
    .from('game_projects')
    .insert(insertData)
    .select(`
      *,
      designer:profiles!designer_id(
        id,
        display_name,
        avatar_url
      )
    `)
    .single();

  if (error) {
    console.error('Error creating project:', error);
    throw new Error('Failed to create project: ' + error.message);
  }

  return project;
}

/**
 * Update an existing project
 */
export async function updateProject(data: UpdateProjectFormData) {
  const supabase = createClient();

  const { id, ...updates } = data;

  // Prepare update data
  const updateData: GameProjectUpdate = {};

  if (updates.title) updateData.title = updates.title;
  if (updates.description) updateData.description = updates.description;
  if (updates.tagline !== undefined) updateData.tagline = updates.tagline;
  if (updates.stage) updateData.stage = updates.stage;
  if (updates.playerCount) {
    updateData.player_count_min = updates.playerCount.min;
    updateData.player_count_max = updates.playerCount.max;
  }
  if (updates.playTime) updateData.play_time = updates.playTime;
  if (updates.complexity) updateData.complexity = updates.complexity;
  if (updates.mechanics) updateData.mechanics = updates.mechanics;
  if (updates.themes) updateData.themes = updates.themes;
  if (updates.visibility) updateData.visibility = updates.visibility;

  const { data: project, error } = await supabase
    .from('game_projects')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project:', error);
    throw new Error('Failed to update project: ' + error.message);
  }

  return project;
}

/**
 * Delete a project (soft delete by setting is_active to false)
 */
export async function deleteProject(id: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from('game_projects')
    .update({ is_active: false })
    .eq('id', id);

  if (error) {
    console.error('Error deleting project:', error);
    throw new Error('Failed to delete project');
  }

  return { success: true };
}

/**
 * Update project visibility
 */
export async function updateProjectVisibility(
  id: string,
  visibility: 'public' | 'private' | 'unlisted'
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('game_projects')
    .update({ visibility })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project visibility:', error);
    throw new Error('Failed to update visibility');
  }

  return data;
}

/**
 * Update project stage
 */
export async function updateProjectStage(
  id: string,
  stage: 'concept' | 'prototype' | 'playtesting' | 'refining' | 'pitching' | 'published'
) {
  const supabase = createClient();

  const updateData: GameProjectUpdate = { stage };

  // If moving to published, set published_at
  if (stage === 'published') {
    updateData.published_at = new Date().toISOString();
  }

  const { data, error } = await supabase
    .from('game_projects')
    .update(updateData)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating project stage:', error);
    throw new Error('Failed to update stage');
  }

  return data;
}

/**
 * Fetch projects by designer
 */
export async function fetchDesignerProjects(designerId: string) {
  return fetchProjects({ designerId, isActive: true });
}

/**
 * Fetch projects by stage
 */
export async function fetchProjectsByStage(stage: string) {
  return fetchProjects({ stage, isActive: true });
}

/**
 * Search projects
 */
export async function searchProjects(query: string) {
  return fetchProjects({ search: query, isActive: true });
}
