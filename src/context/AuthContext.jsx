import React, { useReducer, useEffect } from 'react';
import { message } from 'antd';
import { AuthContext } from './authContext';
import { supabase, authConfig } from '../config/supabase';

const AUTH_ACTIONS = {
  AUTH_REQUEST: 'AUTH_REQUEST',
  AUTH_RESOLVED: 'AUTH_RESOLVED',
  AUTH_FAILURE: 'AUTH_FAILURE',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_RECOVERY: 'SET_RECOVERY'
};

const initialState = {
  user: null,
  session: null,
  isAuthenticated: false,
  isRecoveryMode: false,
  loading: true,
  error: null
};

const normalizeAuthError = (error, fallbackMessage) => {
  const messageText = error?.message?.trim();

  if (!messageText) {
    return fallbackMessage;
  }

  if (messageText.toLowerCase().includes('invalid login credentials')) {
    return 'That email and password combination did not match our records.';
  }

  if (messageText.toLowerCase().includes('email not confirmed')) {
    return 'Please confirm your email before signing in.';
  }

  if (messageText.toLowerCase().includes('user already registered')) {
    return 'An account already exists for that email. Try signing in instead.';
  }

  if (messageText.toLowerCase().includes('password should be at least')) {
    return 'Choose a stronger password that meets the minimum length requirement.';
  }

  return messageText;
};

const authReducer = (state, action) => {
  switch (action.type) {
    case AUTH_ACTIONS.AUTH_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case AUTH_ACTIONS.AUTH_RESOLVED:
      return {
        ...state,
        loading: false,
        user: action.payload.user,
        session: action.payload.session,
        isAuthenticated: !!action.payload.session,
        isRecoveryMode: action.payload.isRecoveryMode ?? state.isRecoveryMode,
        error: null
      };
    case AUTH_ACTIONS.AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    case AUTH_ACTIONS.SET_RECOVERY:
      return {
        ...state,
        isRecoveryMode: action.payload
      };
    case AUTH_ACTIONS.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    let isMounted = true;

    const syncInitialSession = async () => {
      try {
        const {
          data: { session },
          error
        } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (!isMounted) {
          return;
        }

        dispatch({
          type: AUTH_ACTIONS.AUTH_RESOLVED,
          payload: {
            session,
            user: session?.user ?? null,
            isRecoveryMode: false
          }
        });
      } catch (error) {
        if (!isMounted) {
          return;
        }

        dispatch({
          type: AUTH_ACTIONS.AUTH_FAILURE,
          payload: normalizeAuthError(error, 'We could not restore your session.')
        });
      }
    };

    syncInitialSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (!isMounted) {
        return;
      }

      dispatch({
        type: AUTH_ACTIONS.AUTH_RESOLVED,
        payload: {
          session,
          user: session?.user ?? null,
          isRecoveryMode: event === 'PASSWORD_RECOVERY'
        }
      });

      if (event === 'SIGNED_OUT') {
        window.setTimeout(() => {
          message.success('You have been signed out.');
        }, 0);
      }

      if (event === 'PASSWORD_RECOVERY') {
        window.setTimeout(() => {
          message.info('Set a new password to finish recovering your account.');
        }, 0);
      }
    });

    return () => {
      isMounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const clearError = () => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });
  };

  const login = async (email, password) => {
    dispatch({ type: AUTH_ACTIONS.AUTH_REQUEST });

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      dispatch({
        type: AUTH_ACTIONS.AUTH_RESOLVED,
        payload: {
          session: data.session,
          user: data.session ? data.user : null,
          isRecoveryMode: false
        }
      });

      return data;
    } catch (error) {
      const authError = normalizeAuthError(error, 'We could not sign you in.');
      dispatch({
        type: AUTH_ACTIONS.AUTH_FAILURE,
        payload: authError
      });
      throw new Error(authError);
    }
  };

  const signUp = async (email, password, metadata = {}) => {
    dispatch({ type: AUTH_ACTIONS.AUTH_REQUEST });

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: metadata,
          emailRedirectTo: authConfig.emailRedirectTo
        }
      });

      if (error) {
        throw error;
      }

      dispatch({
        type: AUTH_ACTIONS.AUTH_RESOLVED,
        payload: {
          session: data.session,
          user: data.user,
          isRecoveryMode: false
        }
      });

      return {
        ...data,
        requiresEmailVerification: !data.session && !!data.user
      };
    } catch (error) {
      const authError = normalizeAuthError(error, 'We could not create your account.');
      dispatch({
        type: AUTH_ACTIONS.AUTH_FAILURE,
        payload: authError
      });
      throw new Error(authError);
    }
  };

  const loginWithProvider = async (provider, redirectPath = '/dashboard') => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

    try {
      const providerConfig = authConfig.providers[provider];
      const redirectTo = new URL(authConfig.redirectTo);
      redirectTo.searchParams.set('next', redirectPath);

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: redirectTo.toString(),
          scopes: providerConfig?.scopes
        }
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      const authError = normalizeAuthError(error, `We could not start the ${provider} sign-in flow.`);
      dispatch({
        type: AUTH_ACTIONS.AUTH_FAILURE,
        payload: authError
      });
      throw new Error(authError);
    }
  };

  const resetPassword = async (email) => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: authConfig.passwordResetRedirectTo
      });

      if (error) {
        throw error;
      }

      return true;
    } catch (error) {
      const authError = normalizeAuthError(error, 'We could not send the password reset email.');
      dispatch({
        type: AUTH_ACTIONS.AUTH_FAILURE,
        payload: authError
      });
      throw new Error(authError);
    }
  };

  const updatePassword = async (newPassword) => {
    dispatch({ type: AUTH_ACTIONS.CLEAR_ERROR });

    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      });

      if (error) {
        throw error;
      }

      dispatch({ type: AUTH_ACTIONS.SET_RECOVERY, payload: false });
      return true;
    } catch (error) {
      const authError = normalizeAuthError(error, 'We could not update your password.');
      dispatch({
        type: AUTH_ACTIONS.AUTH_FAILURE,
        payload: authError
      });
      throw new Error(authError);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      dispatch({
        type: AUTH_ACTIONS.AUTH_RESOLVED,
        payload: {
          session: null,
          user: null,
          isRecoveryMode: false
        }
      });
    } catch (error) {
      const authError = normalizeAuthError(error, 'We could not sign you out.');
      dispatch({
        type: AUTH_ACTIONS.AUTH_FAILURE,
        payload: authError
      });
      throw new Error(authError);
    }
  };

  const value = {
    ...state,
    clearError,
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
