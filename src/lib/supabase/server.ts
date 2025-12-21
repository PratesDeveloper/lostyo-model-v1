import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

// Hardcoded values for the specific environment as requested by the system protocol
const PROJECT_URL = 'https://wxlltninzxsmlzenkctw.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bGx0bmluenhzbWx6ZW5rY3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyOTIxODgsImV4cCI6MjA4MTg2ODE4OH0.iAXq2wUQiu6tYxDDjZ2H4b8EXrHwR0xoy1BTbN9kA14';

export async function createServerSupabaseClient() {
  const cookieStore = await cookies() // O erro estava aqui: faltava o await

  return createServerClient(PROJECT_URL, ANON_KEY, {
    cookies: {
      get: (name) => cookieStore.get(name)?.value,
      set: (name, value, options) => {
        try { cookieStore.set({ name, value, ...options }) } catch {}
      },
      remove: (name, options) => {
        try { cookieStore.delete({ name, ...options }) } catch {}
      },
    },
  })
}