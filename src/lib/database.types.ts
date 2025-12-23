export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      guilds: {
        Row: {
          created_at_discord: string | null
          guild_id: string
          is_blacklisted: boolean | null
          joined_at: string | null
          preferred_locale: string | null
          premium: boolean | null
          shard_id: number | null
          state: boolean | null
          system_channel_id: string | null
        }
        Insert: {
          created_at_discord?: string | null
          guild_id: string
          is_blacklisted?: boolean | null
          joined_at?: string | null
          preferred_locale?: string | null
          premium?: boolean | null
          shard_id?: number | null
          state?: boolean | null
          system_channel_id?: string | null
        }
        Update: {
          created_at_discord?: string | null
          guild_id?: string
          is_blacklisted?: boolean | null
          joined_at?: string | null
          preferred_locale?: string | null
          premium?: boolean | null
          shard_id?: number | null
          state?: boolean | null
          system_channel_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          first_name: string | null
          id: string
          last_name: string | null
          onboarding_complete: boolean | null
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          onboarding_complete?: boolean | null
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          onboarding_complete?: boolean | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          access_token: string | null
          avatar: string | null
          created_at: string | null
          discriminator: string | null
          expires_at: string | null
          id: string
          refresh_token: string | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          access_token?: string | null
          avatar?: string | null
          created_at?: string | null
          discriminator?: string | null
          expires_at?: string | null
          id: string
          refresh_token?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          access_token?: string | null
          avatar?: string | null
          created_at?: string | null
          discriminator?: string | null
          expires_at?: string | null
          id?: string
          refresh_token?: string | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      handle_new_user: {
        Args: Record<PropertyKey, never>
        Returns: unknown
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Profile = Database['public']['Tables']['profiles']['Row'];