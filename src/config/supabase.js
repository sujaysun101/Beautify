import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project URL and anon key
// You can find these in your Supabase project dashboard under Settings > API
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://rkwtrerffisxdfmgwnrj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrd3RyZXJmZmlzeGRmbWd3bnJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI0MTk1MDksImV4cCI6MjA2Nzk5NTUwOX0.ln4eWj_i8m5RJdAIAR--oB0JY50GkDPgObM_NSasx_M'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Auth configuration
export const authConfig = {
  // Configure OAuth providers
  redirectTo: `${window.location.origin}/auth/callback`,
  
  // Provider configurations
  providers: {
    google: {
      scopes: 'email profile'
    },
    github: {
      scopes: 'user:email'
    }
  }
}
