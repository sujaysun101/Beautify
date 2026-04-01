import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before running Beautify.'
  )
}

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
