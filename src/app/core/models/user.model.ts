export interface User {
  id: number;
  username: string;
  email: string;
  jobRole: 'tech' | 'id' | 'gd' | 'qa';
}

export interface AuthCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: { username: string } | null;
}