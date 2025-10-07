import { createReducer, on } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import * as UsersActions from './users.actions';
import { User } from '../../core/models/user.model';

export const usersFeatureKey = 'users';

export interface State extends EntityState<User> {
  loading: boolean;
  error: string | null;
}

export const adapter: EntityAdapter<User> = createEntityAdapter<User>();

export const initialState: State = adapter.getInitialState({
  loading: false,
  error: null
});

export const reducer = createReducer(
  initialState,
  on(UsersActions.loadUsers, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.loadUsersSuccess, (state, { users }) =>
    adapter.setAll(users, { ...state, loading: false })
  ),
  on(UsersActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.addUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.addUserSuccess, (state, { user }) =>
    adapter.addOne(user, { ...state, loading: false })
  ),
  on(UsersActions.addUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.updateUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.updateUserSuccess, (state, { user }) =>
    adapter.updateOne({ id: user.id, changes: user }, { ...state, loading: false })
  ),
  on(UsersActions.updateUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),
  on(UsersActions.deleteUser, state => ({
    ...state,
    loading: true,
    error: null
  })),
  on(UsersActions.deleteUserSuccess, (state, { id }) =>
    adapter.removeOne(id, { ...state, loading: false })
  ),
  on(UsersActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  }))
);

export const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();