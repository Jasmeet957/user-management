import { reducer, initialState, adapter } from './users.reducer';
import * as UsersActions from './users.actions';
import { User } from '../../core/models/user.model';

describe('Users Reducer', () => {
  const mockUsers: User[] = [
    { id: 1, username: 'john', email: 'john@test.com', jobRole: 'tech' },
    { id: 2, username: 'jane', email: 'jane@test.com', jobRole: 'qa' }
  ];

  it('should return the initial state', () => {
    const action = { type: 'Unknown' };
    const state = reducer(initialState, action as any);

    expect(state).toBe(initialState);
  });

  it('should set loading on load users', () => {
    const action = UsersActions.loadUsers();
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should load users on success', () => {
    const action = UsersActions.loadUsersSuccess({ users: mockUsers });
    const state = reducer(initialState, action);

    expect(state.ids.length).toBe(2);
    expect(state.loading).toBe(false);
    expect(Object.keys(state.entities).length).toBe(2);
  });

  it('should add user on success', () => {
    const newUser: User = { id: 3, username: 'test', email: 'test@test.com', jobRole: 'gd' };
    const action = UsersActions.addUserSuccess({ user: newUser });
    const state = reducer(initialState, action);

    expect(state.ids.length).toBe(1);
    expect(state.entities[3]).toEqual(newUser);
    expect(state.loading).toBe(false);
  });

  it('should update user on success', () => {
    const loadedState = adapter.setAll(mockUsers, initialState);
    const updatedUser: User = { id: 1, username: 'updated', email: 'updated@test.com', jobRole: 'id' };
    const action = UsersActions.updateUserSuccess({ user: updatedUser });
    const state = reducer(loadedState, action);

    expect(state.entities[1]).toEqual(updatedUser);
    expect(state.loading).toBe(false);
  });

  it('should delete user on success', () => {
    const loadedState = adapter.setAll(mockUsers, initialState);
    const action = UsersActions.deleteUserSuccess({ id: 1 });
    const state = reducer(loadedState, action);

    expect(state.ids.length).toBe(1);
    expect(state.entities[1]).toBeUndefined();
    expect(state.loading).toBe(false);
  });

  it('should set error on failure', () => {
    const action = UsersActions.loadUsersFailure({ error: 'Error loading users' });
    const state = reducer(initialState, action);

    expect(state.error).toBe('Error loading users');
    expect(state.loading).toBe(false);
  });
});