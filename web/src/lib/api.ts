/* eslint-disable */
import { ApiResponse } from '../types/api';

// Use Next.js API proxy instead of direct API calls
const API_BASE_URL = '/api';

// Generic API error handler
class ApiError extends Error {
  constructor(public status: number, message: string, public isApiError: boolean = false) {
    super(message);
    this.name = 'ApiError';
  }
}

// Fetch wrapper with API response structure handling
async function apiRequest(endpoint: string, options?: RequestInit): Promise<any> {
  try {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      credentials: 'include', // Include cookies
      ...options,
    };

    const response = await fetch(url, config);
    const data: ApiResponse = await response.json();

    // Check API response structure
    if (!data.response.is_success) {
      throw new ApiError(response.status, data.response.message, true);
    }

    return data.data || data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    throw new ApiError(500, `Network Error: ${error instanceof Error ? error.message : 'Unknown error'}`, false);
  }
}

// Authenticated API request wrapper (uses auth service)
async function authenticatedApiRequest(endpoint: string, options?: RequestInit): Promise<any> {
  const { authService } = await import('./auth');
  return authService.apiRequest(endpoint, options);
}

// Dashboard API
export const dashboardApi = {
  getStats: () => authenticatedApiRequest('/dashboard/stats'),
  getTrafficData: (period: string = '7d') => authenticatedApiRequest(`/dashboard/traffic?period=${period}`),
  getCompanyDistribution: () => authenticatedApiRequest('/dashboard/companies/distribution'),
  getCompanies: (search?: string) => authenticatedApiRequest(`/dashboard/companies${search ? `?search=${search}` : ''}`),
};

// Trucks API
export const trucksApi = {
  getExpected: () => authenticatedApiRequest('/truck/expected'),
  getAll: (filters?: any) => authenticatedApiRequest('/truck', {
    method: 'POST',
    body: JSON.stringify(filters),
  }),
  checkIn: (data: any) => authenticatedApiRequest('/truck/checkin', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  checkOut: (data: any) => authenticatedApiRequest('/truck/checkout', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getById: (id: string) => authenticatedApiRequest(`/truck/${id}`),
  update: (id: string, data: any) => authenticatedApiRequest(`/truck/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Analytics API
export const analyticsApi = {
  getReports: (type: string, dateRange: any) => authenticatedApiRequest('/analytics/reports', {
    method: 'POST',
    body: JSON.stringify({ type, dateRange }),
  }),
  exportData: (type: string, format: string = 'csv') => authenticatedApiRequest(`/analytics/export?type=${type}&format=${format}`),
};

// User Management API
export const usersApi = {
  getAll: () => authenticatedApiRequest('/users'),
  create: (userData: any) => authenticatedApiRequest('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  update: (id: string, userData: any) => authenticatedApiRequest(`/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  delete: (id: string) => authenticatedApiRequest(`/users/${id}`, {
    method: 'DELETE',
  }),
};

// Billing API
export const billingApi = {
  getInvoices: (filters?: any) => authenticatedApiRequest('/billing/invoices', {
    method: 'POST',
    body: JSON.stringify(filters || {}),
  }),
  generateInvoice: (data: any) => authenticatedApiRequest('/billing/invoices/generate', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  getInvoiceById: (id: string) => authenticatedApiRequest(`/billing/invoices/${id}`),
};

// Export combined API object
export const api = {
  dashboard: dashboardApi,
  trucks: trucksApi,
  analytics: analyticsApi,
  users: usersApi,
  billing: billingApi,
};

export default api;