import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Hardcoded values for the specific environment as requested by the system protocol
const PROJECT_URL = 'https://wxlltninzxsmlzenkctw.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bGx0bmluenhzbWx6ZW5rY3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyOTIxODgsImV4cCI6MjA4MTg2ODE4OH0.iAXq2wUQiu6tYxDDjDZZ2H4b8EXrHwR0xoy1BTbN9kA14';

export function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient(
    PROJECT_URL,
    ANON_KEY,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}