/* eslint-disable */
'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { AuthState, LoginModel, User } from '../types/auth';
import { authService } from '../lib/auth';

interface AuthContextType extends AuthState {
  login: (credentials: LoginModel) => Promise<void>;
  logout: () => Promise<void>;
  refreshToken: () => Promise<void>;
  checkAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Initialize auth state on mount
  useEffect(() => {
    checkAuth();
  }, []);

  // Check authentication status
  const checkAuth = () => {
    try {
      const accessToken = authService.getAccessToken();
      const user = authService.getUser();
      const isAuthenticated = !!accessToken; // Simplified check

      setAuthState({
        user,
        accessToken,
        isAuthenticated,
        isLoading: false,
      });
    } catch (error) {
      console.error('Auth check error:', error);
      setAuthState({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  // Handle login
  const handleLogin = async (credentials: LoginModel) => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      
      const loginResult = await authService.login(credentials);
      const user = authService.getUser(); // Get user from storage
      
      setAuthState({
        user,
        accessToken: loginResult.accessToken,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error) {
      setAuthState({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
      throw error;
    }
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      setAuthState(prev => ({ ...prev, isLoading: true }));
      await authService.logout();
      
      setAuthState({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    } catch (error) {
      console.error('Logout error:', error);
      // Clear state even if API call fails
      setAuthState({
        user: null,
        accessToken: null,
        isAuthenticated: false,
        isLoading: false,
      });
    }
  };

  // Handle token refresh
  const handleRefreshToken = async () => {
    try {
      const newAccessToken = await authService.refreshToken();
      
      if (newAccessToken) {
        const user = authService.getUser();
        
        setAuthState({
          user,
          accessToken: newAccessToken,
          isAuthenticated: true,
          isLoading: false,
        });
      } else {
        // Refresh failed, logout
        await handleLogout();
      }
    } catch (error) {
      console.error('Token refresh error:', error);
      await handleLogout();
    }
  };

  const contextValue: AuthContextType = {
    ...authState,
    login: handleLogin,
    logout: handleLogout,
    refreshToken: handleRefreshToken,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthProvider;