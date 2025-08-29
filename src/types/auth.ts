export interface LoginModel {
  username: string;
  password: string;
}

import { UUID } from 'crypto';

export interface User {
  uuid: UUID;
  full_name: string;
  email_id: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}