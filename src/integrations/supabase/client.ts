import { createClient } from '@supabase/supabase-js';

// Hardcoded values for the specific environment as requested by the system protocol
const PROJECT_URL = 'https://wxlltninzxsmlzenkctw.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bGx0bmluenhzbWx6ZW5rY3R3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjYyOTIxODgsImV4cCI6MjA4MTg2ODE4OH0.iAXq2wUQiu6tYxDDjZ2H4b8EXrHwR0xoy1BTbN9kA14';

export const supabase = createClient(PROJECT_URL, ANON_KEY);