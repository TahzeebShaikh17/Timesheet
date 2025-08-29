import { ApiResponse, AuthSuccessResponse } from '@/types/api';
import { LoginModel, User } from '../types/auth';

// Use Next.js API proxy instead of direct API calls
const API_BASE_URL = '/api';

// Generic API error handler
class ApiError extends Error {
  constructor(public status: number, message: string, public isApiError: boolean = false) {
    super(message);
    this.name = 'ApiError';
  }
}

class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'access_token';
  private readonly USER_KEY = 'user';

  // Check if we're in browser environment
  private get isClient() {
    return typeof window !== 'undefined';
  }

  // Get access token from localStorage
  getAccessToken(): string | null {
    if (!this.isClient) return null;
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  // Get user from localStorage
  getUser(): User | null {
    if (!this.isClient) return null;
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  // Store access token and user data
  private setTokens(accessToken: string, user_data?: User) {
    if (!this.isClient) return;
    localStorage.setItem(this.ACCESS_TOKEN_KEY, accessToken);
    if (user_data) {
      localStorage.setItem(this.USER_KEY, JSON.stringify(user_data));
    }
  }

  // Clear all stored data
  clearTokens() {
    if (!this.isClient) return;
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Check if user is authenticated (simplified)
  isAuthenticated(): boolean {
    const token = this.getAccessToken();
    return !!token; // Just check if token exists
  }

  // Login method
  async login(credentials: LoginModel): Promise<{ accessToken: string; user?: User }> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for refresh token
        body: JSON.stringify(credentials),
      });

      const authData: AuthSuccessResponse = await response.json();

      console.log(authData);

      // Check API response structure
      if (!authData.response.is_success) {
        throw new ApiError(response.status, authData.response.message, true);
      }

      if (!authData.access_token) {
        throw new ApiError(response.status, 'No access token received', true);
      }

      // Store access token and user data (if provided)
      this.setTokens(authData.access_token, authData.user_data);

      return {
        accessToken: authData.access_token,
        user: authData.user_data
      };
    } catch (error) {
      console.error('Login error:', error);
      if (error instanceof ApiError) {
        throw error;
      }
      throw new ApiError(500, 'Network error occurred', false);
    }
  }

  // Refresh token method (uses cookies)
  async refreshToken(): Promise<string | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/token/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Include cookies for refresh token
      });

      const authData: AuthSuccessResponse = await response.json();

      // Check if refresh was successful
      if (!authData.response.is_success || !authData.access_token) {
        this.logout();
        return null;
      }

      // Update stored access token and user data (if provided)
      this.setTokens(authData.access_token, authData.user_data);

      return authData.access_token;
    } catch (error) {
      console.error('Token refresh error:', error);
      this.logout();
      return null;
    }
  }

  // Logout method
  async logout(): Promise<void> {
    const accessToken = this.getAccessToken();

    // Call logout endpoint to clear cookies
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
        },
        credentials: 'include', // Include cookies
      });
    } catch (error) {
      console.error('Logout API error:', error);
    }

    // Clear stored data regardless of API call success
    this.clearTokens();

    // Redirect to login page
    if (this.isClient) {
      window.location.href = '/';
    }
  }

  // Generic API request wrapper
  async apiRequest(endpoint: string, options: RequestInit = {}): Promise<ApiResponse> {
    const accessToken = this.getAccessToken();
    if (!accessToken) {
      this.logout();
      throw new ApiError(401, 'No access token available', true);
    }

    const config: RequestInit = {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
        ...options.headers,
      },
      credentials: 'include',
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data: ApiResponse = await response.json();

      if (!data.response.is_success) {
        if (response.status === 401) {
          const newAccessToken = await this.refreshToken();
          if (newAccessToken) {
            return this.apiRequest(endpoint, {
              ...options,
              headers: {
                ...options.headers,
                'Authorization': `Bearer ${newAccessToken}`,
              },
            });
          }
          this.logout();
        }
        throw new ApiError(response.status, data.response.message, true);
      }

      return data;
    } catch (error) {
      console.error('API request error:', error);
      if (error instanceof ApiError) throw error;
      throw new ApiError(500, 'Network error occurred', false);
    }
  }

}

// Export singleton instance
export const authService = new AuthService();
export default authService;