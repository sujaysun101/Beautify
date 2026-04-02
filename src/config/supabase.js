import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase environment variables. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY before running Beautify.'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    flowType: 'pkce',
    detectSessionInUrl: true
  }
})

// Auth configuration
export const authConfig = {
  redirectTo: `${window.location.origin}/auth/callback`,
  emailRedirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
  passwordResetRedirectTo: `${window.location.origin}/reset-password`,
  
  providers: {
    google: {
      scopes: 'email profile'
    },
    github: {
      scopes: 'user:email'
    }
  }
}
