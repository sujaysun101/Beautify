import React, { useReducer, useEffect } from 'react';
import { message } from 'antd';
import { AuthContext } from './authContext';
import { supabase, authConfig } from '../config/supabase';

// Auth Actions
const AUTH_ACTIONS = {
  LOGIN_START: 'LOGIN_START',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
  LOGOUT: 'LOGOUT',
  SET_LOADING: 'SET_LOADING',
  SESSION_LOADED: 'SESSION_LOADED'
};

// Auth Reducer
const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.LOGIN_START:
      return { ...state, loading: true, error: null };
    case AUTH_ACTIONS.LOGIN_SUCCESS:
      return { 
        ...state, 
        loading: false, 
        user: action.payload.user, 
        session: action.payload.session,
        isAuthenticated: true,
        error: null 
      };
    case AUTH_ACTIONS.LOGIN_FAILURE:
      return { 
        ...state, 
        loading: false, 
        error: action.payload, 
        isAuthenticated: false 
      };
    case AUTH_ACTIONS.LOGOUT:
      return { 
        ...state, 
        user: null, 
        session: null, 
        isAuthenticated: false,
        error: null 
      };
    case AUTH_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    case AUTH_ACTIONS.SESSION_LOADED:
      return {
        ...state,
        user: action.payload.user,
        session: action.payload.session,
        isAuthenticated: !!action.payload.session,
        loading: false
      };
    default:
      return state;
  }
};

// Initial state
const initialState = {
  user: null,
  session: null,
  isAuthenticated: false,
  loading: true, // Start with true for initial session check
  error: null
};

// Auth Provider Component
const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Initialize Supabase auth listener
  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      dispatch({
        type: AUTH_ACTIONS.SESSION_LOADED,
        payload: {
          session,
          user: session?.user || null
        }
      });
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        dispatch({
          type: AUTH_ACTIONS.SESSION_LOADED,
          payload: {
            session,
            user: session?.user || null
          }
        });

        if (event === 'SIGNED_IN') {
          message.success('Successfully signed in!');
        } else if (event === 'SIGNED_OUT') {
          message.success('Successfully signed out!');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  // Login with email and password
  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;

      dispatch({
        type: AUTH_ACTIONS.LOGIN_SUCCESS,
        payload: {
          user: data.user,
          session: data.session
        }
      });

      return data;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };

  // Sign up with email and password
  const signUp = async (email, password, metadata = {}) => {
    dispatch({ type: AUTH_ACTIONS.LOGIN_START });
    
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata
        }
      });

      if (error) throw error;

      // Note: User might need to confirm email before being logged in
      if (data.session) {
        dispatch({
          type: AUTH_ACTIONS.LOGIN_SUCCESS,
          payload: {
            user: data.user,
            session: data.session
          }
        });
      } else {
        dispatch({ type: AUTH_ACTIONS.SET_LOADING, payload: false });
        message.info('Please check your email to confirm your account');
      }

      return data;
    } catch (error) {
      dispatch({
        type: AUTH_ACTIONS.LOGIN_FAILURE,
        payload: error.message
      });
      throw error;
    }
  };

  // Social login (Google, GitHub, etc.)
  const loginWithProvider = async (provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: provider,
        options: {
          redirectTo: authConfig.redirectTo,
          scopes: authConfig.providers[provider]?.scopes
        }
      });

      if (error) throw error;

      // OAuth redirect happens automatically
      return data;
    } catch (error) {
      message.error(`${provider} login failed: ${error.message}`);
      throw error;
    }
  };

  // Password reset
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`
      });

      if (error) throw error;

      message.success('Password reset email sent! Check your inbox.');
      return true;
    } catch (error) {
      message.error(`Password reset failed: ${error.message}`);
      throw error;
    }
  };

  // Update password (for authenticated users)
  const updatePassword = async (newPassword) => {
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) throw error;

      message.success('Password updated successfully!');
      return true;
    } catch (error) {
      message.error(`Password update failed: ${error.message}`);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      dispatch({ type: AUTH_ACTIONS.LOGOUT });
    } catch (error) {
      message.error(`Logout failed: ${error.message}`);
      throw error;
    }
  };

  const value = {
    ...state,
    login,
    signUp,
    logout,
    loginWithProvider,
    resetPassword,
    updatePassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;