import { supabase } from '../lib/supabase';

export const authService = {
  // Sign in with email and password
  async signIn(email, password) {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign up with email, password and profile data
  async signUp(email, password, fullName, avatarUrl = '') {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            avatar_url: avatarUrl,
            role: 'user'
          }
        }
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign in with Google OAuth
  async signInWithGoogle() {
    try {
      const { data, error } = await supabase?.auth?.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location?.origin}/file-upload-workspace`
        }
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Sign out
  async signOut() {
    try {
      const { error } = await supabase?.auth?.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error };
    }
  },

  // Reset password
  async resetPassword(email) {
    try {
      const { data, error } = await supabase?.auth?.resetPasswordForEmail(email, {
        redirectTo: `${window.location?.origin}/reset-password`
      });
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update password
  async updatePassword(password) {
    try {
      const { data, error } = await supabase?.auth?.updateUser({ password });
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Get current user profile
  async getUserProfile() {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase?.from('user_profiles')?.select('*')?.eq('id', user?.id)?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  },

  // Update user profile
  async updateUserProfile(updates) {
    try {
      const { data: { user } } = await supabase?.auth?.getUser();
      if (!user) throw new Error('No authenticated user');

      const { data, error } = await supabase?.from('user_profiles')?.update({
          full_name: updates?.fullName,
          avatar_url: updates?.avatarUrl,
          updated_at: new Date()?.toISOString()
        })?.eq('id', user?.id)?.select()?.single();

      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error };
    }
  }
};