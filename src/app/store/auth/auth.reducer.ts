import { createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { AuthState } from '../../core/models/user.model';

export const authFeatureKey = 'auth';

export interface State extends AuthState {
  error: string | null;
  loading: boolean;
}

export const initialState: State = {
  isAuthenticated: false,
  user: null,
  error: null,
  loading: false
};

export const reducer = createReducer(
  initialState,
  on(AuthActions.login, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(AuthActions.loginSuccess, (state, { username }) => ({
    ...state,
    isAuthenticated: true,
    user: { username },
    loading: false,
    error: null
  })),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    loading: false,
    error
  })),
  on(AuthActions.logout, () => initialState)
);