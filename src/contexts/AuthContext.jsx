import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({});

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session immediately
    const getInitialSession = async () => {
      try {
        const { data: { session }, error } = await supabase?.auth?.getSession();
        if (error) {
          console.error('❌ Error getting initial session:', error);
        } else {
          console.log('🔐 Initial session check:', session?.user ? session?.user?.email : 'No user');
          setUser(session?.user ?? null);
        }
      } catch (error) {
        console.error('❌ Exception in getInitialSession:', error);
      } finally {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth state changes - MUST be synchronous
    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(
      (event, session) => {
        console.log(`🔐 Auth Event: ${event}`, session?.user ? session?.user?.email : 'No user');
        
        // Handle auth state changes immediately
        setUser(session?.user ?? null);
        
        // Handle specific events
        if (event === 'SIGNED_IN') {
          console.log('✅ User signed in successfully:', session?.user?.email);
          console.log('✅ Provider:', session?.user?.app_metadata?.provider || 'email');
        } else if (event === 'SIGNED_OUT') {
          console.log('👋 User signed out');
          setUser(null);
        } else if (event === 'TOKEN_REFRESHED') {
          console.log('🔄 Token refreshed for user:', session?.user?.email);
        }
        
        // Ensure loading is false after any auth event
        setLoading(false);
      }
    );

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      console.log('✅ Sign in successful:', data?.user?.email);
      return { data, error: null };
    } catch (error) {
      console.error('❌ Sign in error:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email, password, options = {}) => {
    try {
      setLoading(true);
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: options?.metadata || {},
        },
      });
      
      if (error) throw error;
      
      console.log('✅ Sign up successful:', data?.user?.email);
      return { data, error: null };
    } catch (error) {
      console.error('❌ Sign up error:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    try {
      console.log('🚀 Initiating Google OAuth sign in...');
      console.log('🌐 Current origin:', window?.location?.origin);
      
      setLoading(true);
      
      // Enhanced Google OAuth configuration
      const { data, error } = await supabase?.auth?.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window?.location?.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          skipBrowserRedirect: false,
        },
      });
      
      if (error) {
        console.error('❌ Google OAuth error:', error);
        
        // Enhanced error messages based on common issues
        if (error?.message?.includes('Invalid login credentials')) {
          throw new Error('Google 로그인 정보가 올바르지 않습니다. 다시 시도해주세요.');
        } else if (error?.message?.includes('Invalid request') || error?.status === 400) {
          throw new Error(
            'Google OAuth 설정에 문제가 있습니다.\n' + 'Google Cloud Console에서 다음을 확인해주세요:\n' +
            `1. Authorized JavaScript origins에 "${window?.location?.origin}" 추가\n` +
            '2. Authorized redirect URIs 설정 확인\n' + '3. OAuth 동의 화면 설정 확인'
          );
        } else if (error?.message?.includes('redirect_uri_mismatch')) {
          throw new Error(
            'Redirect URI 불일치 오류입니다.\n' + 'Google Cloud Console에서 다음을 확인해주세요:\n'+ '1. Authorized redirect URIs에 Supabase callback URL 추가\n'+ '2. URL 형식이 정확한지 확인'
          );
        } else if (error?.message?.includes('403') || error?.status === 403) {
          throw new Error(
            'Google 인증 권한 오류 (403)가 발생했습니다.\n' +
            'Google Cloud Console 설정을 확인해주세요:\n' +
            `1. Authorized JavaScript origins: "${window?.location?.origin}"\n` +
            '2. OAuth 동의 화면 게시 상태 확인\n' + '3. 프로젝트 설정 및 API 활성화 확인'
          );
        }
        
        throw error;
      }
      
      console.log('✅ Google OAuth initiated successfully');
      console.log('🔄 Redirecting to Google for authentication...');
      
      return { data, error: null };
    } catch (error) {
      console.error('❌ Google sign in error:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      console.log('👋 Signing out user...');
      setLoading(true);
      
      const { error } = await supabase?.auth?.signOut();
      if (error) throw error;
      
      console.log('✅ Sign out successful');
      return { error: null };
    } catch (error) {
      console.error('❌ Sign out error:', error);
      return { error };
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      setLoading(true);
      const { data, error } = await supabase?.auth?.updateUser({
        data: updates,
      });
      
      if (error) throw error;
      
      console.log('✅ Profile updated successfully');
      return { data, error: null };
    } catch (error) {
      console.error('❌ Update profile error:', error);
      return { data: null, error };
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signInWithGoogle,
    signOut,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};