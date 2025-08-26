// lib/api/projects.ts - Modern data layer with @supabase/ssr
import { createClient, createServerSupabaseClient, createAdminClient } from '@/lib/supabase'
import type { Database } from '@/lib/supabase'

type GameProject = Database['public']['Tables']['game_projects']['Row'] & {
  profiles?: Database['public']['Tables']['profiles']['Row']
}

type ProjectWithFeedback = GameProject & {
  feedback: Array<Database['public']['Tables']['feedback']['Row'] & {
    profiles: Database['public']['Tables']['profiles']['Row']
  }>
}

// Client-side data functions (for use in React components)
export class ProjectsAPI {
  private supabase = createClient()

  async getGameProjects(): Promise<GameProject[]> {
    const { data, error } = await this.supabase
      .from('game_projects')
      .select(`
        *,
        profiles!designer_id (
          id,
          display_name,
          avatar_url
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching game projects:', error)
      throw error
    }

    return data as GameProject[]
  }

  async getUserProjects(userId: string) {
    const { data, error } = await this.supabase
      .from('game_projects')
      .select('*')
      .eq('designer_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user projects:', error)
      throw error
    }

    return data
  }

  async getProjectById(projectId: string): Promise<GameProject | null> {
    const { data, error } = await this.supabase
      .from('game_projects')
      .select(`
        *,
        profiles!designer_id (
          id,
          display_name,
          avatar_url
        )
      `)
      .eq('id', projectId)
      .single()

    if (error) {
      console.error('Error fetching project:', error)
      return null
    }

    return data as GameProject
  }

  async getProjectWithFeedback(projectId: string): Promise<ProjectWithFeedback | null> {
    const { data, error } = await this.supabase
      .from('game_projects')
      .select(`
        *,
        profiles!designer_id (
          id,
          display_name,
          avatar_url
        ),
        feedback (
          *,
          profiles!player_id (
            id,
            display_name,
            avatar_url
          )
        )
      `)
      .eq('id', projectId)
      .single()

    if (error) {
      console.error('Error fetching project with feedback:', error)
      return null
    }

    return data as ProjectWithFeedback
  }

  async createProject(project: Database['public']['Tables']['game_projects']['Insert']) {
    const { data, error } = await this.supabase
      .from('game_projects')
      .insert([project])
      .select()
      .single()

    if (error) {
      console.error('Error creating project:', error)
      throw error
    }

    return data
  }

  async updateProject(
    projectId: string,
    updates: Database['public']['Tables']['game_projects']['Update']
  ) {
    const { data, error } = await this.supabase
      .from('game_projects')
      .update(updates)
      .eq('id', projectId)
      .select()
      .single()

    if (error) {
      console.error('Error updating project:', error)
      throw error
    }

    return data
  }

  // Real-time subscription for project changes
  subscribeToProject(projectId: string, callback: (payload: any) => void) {
    const subscription = this.supabase
      .channel(`project-${projectId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'feedback',
          filter: `game_project_id=eq.${projectId}`,
        },
        callback
      )
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'game_projects',
          filter: `id=eq.${projectId}`,
        },
        callback
      )
      .subscribe()

    return () => subscription.unsubscribe()
  }
}

// Server-side functions (for use in Server Components, API routes)
export class ServerProjectsAPI {
  private supabase = createServerSupabaseClient()
  private adminSupabase = createAdminClient()

  async getGameProjects(): Promise<GameProject[]> {
    const { data, error } = await this.supabase
      .from('game_projects')
      .select(`
        *,
        profiles!designer_id (
          id,
          display_name,
          avatar_url
        )
      `)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching game projects:', error)
      throw error
    }

    return data as GameProject[]
  }

  async getUserProjects(userId: string) {
    const { data, error } = await this.supabase
      .from('game_projects')
      .select('*')
      .eq('designer_id', userId)
      .eq('is_active', true)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user projects:', error)
      throw error
    }

    return data
  }

  // Admin function to get all projects (uses admin client)
  async getAllProjects() {
    const { data, error } = await this.adminSupabase
      .from('game_projects')
      .select(`
        *,
        profiles!designer_id (
          id,
          display_name,
          email
        )
      `)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching all projects:', error)
      throw error
    }

    return data as GameProject[]
  }
}

// Queue and Sessions APIs
export class QueueAPI {
  private supabase = createClient()

  async getQueueEntries() {
    const { data, error } = await this.supabase
      .from('queue_entries')
      .select(`
        *,
        game_projects (
          id,
          title,
          profiles!designer_id (
            display_name,
            membership_tier
          )
        )
      `)
      .eq('status', 'queued')
      .order('priority_score', { ascending: false })

    if (error) {
      console.error('Error fetching queue entries:', error)
      throw error
    }

    return data
  }

  async addToQueue(gameProjectId: string) {
    const { data, error } = await this.supabase
      .from('queue_entries')
      .insert([
        {
          game_project_id: gameProjectId,
        },
      ])
      .select()
      .single()

    if (error) {
      console.error('Error adding to queue:', error)
      throw error
    }

    return data
  }

  // Real-time queue updates
  subscribeToQueue(callback: (payload: any) => void) {
    const subscription = this.supabase
      .channel('queue-updates')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'queue_entries',
        },
        callback
      )
      .subscribe()

    return () => subscription.unsubscribe()
  }
}

export class SessionsAPI {
  private supabase = createClient()

  async getPlaytestSessions() {
    const { data, error } = await this.supabase
      .from('playtest_sessions')
      .select(`
        *,
        game_projects (
          id,
          title
        ),
        profiles!organizer_id (
          display_name
        )
      `)
      .eq('status', 'scheduled')
      .gte('scheduled_date', new Date().toISOString())
      .order('scheduled_date', { ascending: true })

    if (error) {
      console.error('Error fetching playtest sessions:', error)
      throw error
    }

    return data
  }

  async createSession(session: Database['public']['Tables']['playtest_sessions']['Insert']) {
    const { data, error } = await this.supabase
      .from('playtest_sessions')
      .insert([session])
      .select()
      .single()

    if (error) {
      console.error('Error creating session:', error)
      throw error
    }

    return data
  }
}

// Convenience exports
export const projectsAPI = new ProjectsAPI()
export const serverProjectsAPI = new ServerProjectsAPI()
export const queueAPI = new QueueAPI()
export const sessionsAPI = new SessionsAPI()