import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUsers from './users.reducer';

export const selectUsersState = createFeatureSelector<fromUsers.State>(
  fromUsers.usersFeatureKey
);

export const selectAllUsers = createSelector(
  selectUsersState,
  fromUsers.selectAll
);

export const selectUsersLoading = createSelector(
  selectUsersState,
  state => state.loading
);

export const selectUsersError = createSelector(
  selectUsersState,
  state => state.error
);

export const selectUserById = (id: number) => createSelector(
  selectUsersState,
  state => state.entities[id]
);