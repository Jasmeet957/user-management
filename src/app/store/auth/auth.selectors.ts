import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAuth from './auth.reducer';

export const selectAuthState = createFeatureSelector<fromAuth.State>(
  fromAuth.authFeatureKey
);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  state => state.isAuthenticated
);

export const selectAuthUser = createSelector(
  selectAuthState,
  state => state.user
);

export const selectAuthError = createSelector(
  selectAuthState,
  state => state.error
);

export const selectAuthLoading = createSelector(
  selectAuthState,
  state => state.loading
);