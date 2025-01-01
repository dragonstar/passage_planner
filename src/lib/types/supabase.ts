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
      journeys: {
        Row: {
          id: string
          title: string
          content: string | null
          status: 'draft' | 'published'
          author_id: string
          created_at: string
          updated_at: string
          published_at: string | null
          journey_date: string
        }
        Insert: {
          id?: string
          title: string
          content?: string | null
          status?: 'draft' | 'published'
          author_id: string
          created_at?: string
          updated_at?: string
          published_at?: string | null
          journey_date: string
        }
        Update: {
          id?: string
          title?: string
          content?: string | null
          status?: 'draft' | 'published'
          author_id?: string
          created_at?: string
          updated_at?: string
          published_at?: string | null
          journey_date?: string
        }
      }
      profiles: {
        Row: {
          id: string
          username: string | null
          full_name: string | null
          bio: string | null
          avatar_url: string | null
          maritime_rank: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          maritime_rank?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          bio?: string | null
          avatar_url?: string | null
          maritime_rank?: string
          created_at?: string
          updated_at?: string
        }
      }
      waypoints: {
        Row: {
          id: string
          journey_id: string
          name: string
          lat: number
          lng: number
          order: number
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          journey_id: string
          name: string
          lat: number
          lng: number
          order: number
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          journey_id?: string
          name?: string
          lat?: number
          lng?: number
          order?: number
          notes?: string | null
          created_at?: string
        }
      }
    }
  }
}