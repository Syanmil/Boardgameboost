/**
 * Supabase Database Types
 *
 * These types should be generated from your Supabase schema using:
 * npx supabase gen types typescript --project-id <project-id> > src/lib/types/database.types.ts
 *
 * For now, we'll use a simplified type structure that matches our schema.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          display_name: string
          avatar_url: string | null
          bio: string | null
          location: string | null
          website_url: string | null
          twitter_handle: string | null
          bgg_username: string | null
          membership_tier: 'basic' | 'premium'
          membership_status: 'active' | 'expired' | 'pending'
          membership_expiry: string | null
          join_date: string
          total_contribution_points: number
          total_testing_points: number
          notification_preferences: Json
          role: 'user' | 'admin' | 'super_admin'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          display_name: string
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website_url?: string | null
          twitter_handle?: string | null
          bgg_username?: string | null
          membership_tier?: 'basic' | 'premium'
          membership_status?: 'active' | 'expired' | 'pending'
          membership_expiry?: string | null
          join_date?: string
          total_contribution_points?: number
          total_testing_points?: number
          notification_preferences?: Json
          role?: 'user' | 'admin' | 'super_admin'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          display_name?: string
          avatar_url?: string | null
          bio?: string | null
          location?: string | null
          website_url?: string | null
          twitter_handle?: string | null
          bgg_username?: string | null
          membership_tier?: 'basic' | 'premium'
          membership_status?: 'active' | 'expired' | 'pending'
          membership_expiry?: string | null
          join_date?: string
          total_contribution_points?: number
          total_testing_points?: number
          notification_preferences?: Json
          role?: 'user' | 'admin' | 'super_admin'
          created_at?: string
          updated_at?: string
        }
      }
      game_projects: {
        Row: {
          id: string
          designer_id: string
          title: string
          description: string
          tagline: string | null
          stage: 'concept' | 'prototype' | 'playtesting' | 'refining' | 'pitching' | 'published'
          player_count_min: number
          player_count_max: number
          play_time: number
          complexity: number
          mechanics: string[]
          themes: string[]
          current_version: string
          cover_image_url: string | null
          visibility: 'public' | 'private' | 'unlisted'
          is_active: boolean
          published_at: string | null
          publisher_name: string | null
          bgg_id: number | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          designer_id: string
          title: string
          description: string
          tagline?: string | null
          stage: 'concept' | 'prototype' | 'playtesting' | 'refining' | 'pitching' | 'published'
          player_count_min: number
          player_count_max: number
          play_time: number
          complexity: number
          mechanics: string[]
          themes?: string[]
          current_version?: string
          cover_image_url?: string | null
          visibility?: 'public' | 'private' | 'unlisted'
          is_active?: boolean
          published_at?: string | null
          publisher_name?: string | null
          bgg_id?: number | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          designer_id?: string
          title?: string
          description?: string
          tagline?: string | null
          stage?: 'concept' | 'prototype' | 'playtesting' | 'refining' | 'pitching' | 'published'
          player_count_min?: number
          player_count_max?: number
          play_time?: number
          complexity?: number
          mechanics?: string[]
          themes?: string[]
          current_version?: string
          cover_image_url?: string | null
          visibility?: 'public' | 'private' | 'unlisted'
          is_active?: boolean
          published_at?: string | null
          publisher_name?: string | null
          bgg_id?: number | null
          created_at?: string
          updated_at?: string
        }
      }
      project_materials: {
        Row: {
          id: string
          project_id: string
          file_name: string
          file_path: string
          file_type: string
          file_size: number
          material_type: 'rulebook' | 'sell_sheet' | 'prototype_image' | 'component_image' | 'playtest_document' | 'other'
          description: string | null
          version: string | null
          uploaded_at: string
          uploaded_by: string | null
        }
        Insert: {
          id?: string
          project_id: string
          file_name: string
          file_path: string
          file_type: string
          file_size: number
          material_type: 'rulebook' | 'sell_sheet' | 'prototype_image' | 'component_image' | 'playtest_document' | 'other'
          description?: string | null
          version?: string | null
          uploaded_at?: string
          uploaded_by?: string | null
        }
        Update: {
          id?: string
          project_id?: string
          file_name?: string
          file_path?: string
          file_type?: string
          file_size?: number
          material_type?: 'rulebook' | 'sell_sheet' | 'prototype_image' | 'component_image' | 'playtest_document' | 'other'
          description?: string | null
          version?: string | null
          uploaded_at?: string
          uploaded_by?: string | null
        }
      }
      // Add other table types as needed...
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
