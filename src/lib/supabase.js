import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env?.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env?.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

console.log('🔧 Initializing Supabase client...');
console.log('📍 Supabase URL:', supabaseUrl);
console.log('🔑 Anon key (first 10 chars):', supabaseKey?.substring(0, 10) + '...');

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
    debug: true,
  },
  global: {
    headers: {
      'X-Client-Info': 'printforge-ai@1.0.0',
    },
  },
});

// Enhanced debug logging for auth events
supabase?.auth?.onAuthStateChange((event, session) => {
  const timestamp = new Date()?.toISOString();
  const user = session?.user;
  
  console.log(`🔐 [${timestamp}] Supabase Auth Event: ${event}`);
  
  if (user) {
    console.log('👤 User details:', {
      id: user?.id,
      email: user?.email,
      provider: user?.app_metadata?.provider,
      emailConfirmed: user?.email_confirmed_at ? 'Yes' : 'No',
      lastSignIn: user?.last_sign_in_at
    });
  } else {
    console.log('👤 No user session');
  }
  
  // Log specific events
  if (event === 'SIGNED_IN') {
    console.log(`✅ [${timestamp}] Successfully signed in:`, user?.email);
    console.log(`🔗 [${timestamp}] Sign in provider:`, user?.app_metadata?.provider || 'email');
  } else if (event === 'SIGNED_OUT') {
    console.log(`👋 [${timestamp}] User signed out`);
  } else if (event === 'TOKEN_REFRESHED') {
    console.log(`🔄 [${timestamp}] Token refreshed for:`, user?.email);
  } else if (event === 'USER_UPDATED') {
    console.log(`📝 [${timestamp}] User updated:`, user?.email);
  }
});

// Test Supabase connection on initialization
const testConnection = async () => {
  try {
    const { data, error } = await supabase?.auth?.getSession();
    if (error) {
      console.warn('⚠️ Supabase connection warning:', error?.message);
    } else {
      console.log('✅ Supabase connection successful');
      if (data?.session?.user) {
        console.log('🔐 Existing session found for:', data?.session?.user?.email);
      }
    }
  } catch (err) {
    console.error('❌ Supabase connection test failed:', err);
  }
};

// Run connection test
testConnection();

// Legacy compatibility exports
export const auth = {
  getCurrentSession: () => supabase?.auth?.getSession(),
  onAuthStateChange: (callback) => supabase?.auth?.onAuthStateChange(callback),
  signUp: (email, password, options) => supabase?.auth?.signUp({
    email,
    password,
    options
  }),
  signIn: (email, password) => supabase?.auth?.signInWithPassword({
    email,
    password
  }),
  signInWithGoogle: () => supabase?.auth?.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${window?.location?.origin}/auth/callback`,
      queryParams: {
        access_type: 'offline',
        prompt: 'consent',
      }
    }
  }),
  signOut: () => supabase?.auth?.signOut()
};

export const db = {
  getUserProfile: async (userId) => {
    return supabase?.from('user_profiles')?.select('*')?.eq('id', userId)?.single();
  },
  updateUserProfile: async (userId, updates) => {
    return supabase?.from('user_profiles')?.update(updates)?.eq('id', userId)?.select()?.single();
  }
};