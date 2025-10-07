import { createAction, props } from '@ngrx/store';
import { AuthCredentials } from '../../core/models/user.model';

export const login = createAction(
  '[Auth] Login',
  props<{ credentials: AuthCredentials }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ username: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');