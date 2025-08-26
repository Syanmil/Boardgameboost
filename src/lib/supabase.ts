import { createBrowserClient, createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          display_name: string
          email: string
          avatar_url: string | null
          membership_tier: 'basic' | 'premium'
          membership_status: 'active' | 'expired' | 'cancelled'
          membership_expiry: string | null
          total_contribution_points: number
          total_testing_points: number
          join_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          display_name: string
          email: string
          avatar_url?: string | null
          membership_tier?: 'basic' | 'premium'
          membership_status?: 'active' | 'expired' | 'cancelled'
          membership_expiry?: string | null
          total_contribution_points?: number
          total_testing_points?: number
        }
        Update: {
          display_name?: string
          avatar_url?: string | null
          membership_tier?: 'basic' | 'premium'
          membership_status?: 'active' | 'expired' | 'cancelled'
          membership_expiry?: string | null
          total_contribution_points?: number
          total_testing_points?: number
        }
      }
      game_projects: {
        Row: {
          id: string
          title: string
          description: string
          designer_id: string
          stage: 'concept' | 'prototype' | 'playtesting' | 'refinement' | 'published'
          current_version: string
          player_count_min: number
          player_count_max: number
          play_time: number
          complexity: number
          mechanics: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          title: string
          description: string
          designer_id: string
          stage?: 'concept' | 'prototype' | 'playtesting' | 'refinement' | 'published'
          current_version?: string
          player_count_min?: number
          player_count_max?: number
          play_time?: number
          complexity?: number
          mechanics?: string[]
          is_active?: boolean
        }
        Update: {
          title?: string
          description?: string
          stage?: 'concept' | 'prototype' | 'playtesting' | 'refinement' | 'published'
          current_version?: string
          player_count_min?: number
          player_count_max?: number
          play_time?: number
          complexity?: number
          mechanics?: string[]
          is_active?: boolean
        }
      }
      playtest_sessions: {
        Row: {
          id: string
          game_project_id: string
          organizer_id: string
          scheduled_date: string
          venue: string
          max_players: number
          notes: string | null
          status: 'scheduled' | 'completed' | 'cancelled'
          created_at: string
        }
        Insert: {
          game_project_id: string
          organizer_id: string
          scheduled_date: string
          venue: string
          max_players?: number
          notes?: string | null
          status?: 'scheduled' | 'completed' | 'cancelled'
        }
        Update: {
          scheduled_date?: string
          venue?: string
          max_players?: number
          notes?: string | null
          status?: 'scheduled' | 'completed' | 'cancelled'
        }
      }
      queue_entries: {
        Row: {
          id: string
          game_project_id: string
          submitted_at: string
          status: 'queued' | 'scheduled' | 'completed'
          priority_score: number
        }
        Insert: {
          game_project_id: string
          submitted_at?: string
          status?: 'queued' | 'scheduled' | 'completed'
          priority_score?: number
        }
        Update: {
          status?: 'queued' | 'scheduled' | 'completed'
          priority_score?: number
        }
      }
      feedback: {
        Row: {
          id: string
          game_project_id: string
          session_id: string | null
          player_id: string
          liked: string | null
          disliked: string | null
          suggestions: string | null
          confusing: string | null
          overall_rating: number | null
          submitted_at: string
        }
        Insert: {
          game_project_id: string
          session_id?: string | null
          player_id: string
          liked?: string | null
          disliked?: string | null
          suggestions?: string | null
          confusing?: string | null
          overall_rating?: number | null
        }
        Update: {
          liked?: string | null
          disliked?: string | null
          suggestions?: string | null
          confusing?: string | null
          overall_rating?: number | null
        }
      }
    }
  }
}

// Client-side Supabase client (for browser/React components)
export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// Server-side Supabase client (for API routes, Server Components, Server Actions)
export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY! || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

// Admin client (server-side only, uses secret key)
export function createAdminClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY! || process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return []
        },
        setAll() {
          // No-op for admin client
        },
      },
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}