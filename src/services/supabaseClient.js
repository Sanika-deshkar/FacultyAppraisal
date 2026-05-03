import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase URL and Anon Key are missing. Please check your .env file.');
}

// createClient will throw if url is not a valid URL string, so we use a fallback if missing to prevent crash during initialization
// though it will still fail when used. 
export const supabase = (supabaseUrl && supabaseAnonKey && supabaseUrl !== 'your_supabase_url') 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithPassword: () => Promise.reject(new Error("Supabase is not configured. Please check your .env file.")),
        signUp: () => Promise.reject(new Error("Supabase is not configured. Please check your .env file.")),
        signOut: () => Promise.resolve({ error: null }),
      }
    };
