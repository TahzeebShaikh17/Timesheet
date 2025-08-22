/* eslint-disable */
import { User } from "./auth";

// Base API response structure used across all endpoints
export interface BaseApiResponse {
  response: {
    is_success: boolean;
    message: string;
  };
}

export type ApiResponse = BaseApiResponse & Record<string, any>;

export interface AuthSuccessResponse extends ApiResponse {
  access_token: string;
  user_data?: User;
}

// Success response for endpoints that return data
export interface ApiSuccessResponse<T> extends BaseApiResponse {
  data: T;
}

// Error response
export interface ApiErrorResponse extends BaseApiResponse {
  // Inherits response from BaseApiResponse
}