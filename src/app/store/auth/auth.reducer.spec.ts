import { reducer, initialState } from './auth.reducer';
import * as AuthActions from './auth.actions';

describe('Auth Reducer', () => {
  it('should return the initial state', () => {
    const action = { type: 'Unknown' };
    const state = reducer(initialState, action as any);

    expect(state).toBe(initialState);
  });

  it('should set loading to true on login', () => {
    const action = AuthActions.login({ credentials: { username: 'test', password: 'test' } });
    const state = reducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set user and authenticated on login success', () => {
    const action = AuthActions.loginSuccess({ username: 'testuser' });
    const state = reducer(initialState, action);

    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual({ username: 'testuser' });
    expect(state.loading).toBe(false);
  });

  it('should set error on login failure', () => {
    const action = AuthActions.loginFailure({ error: 'Invalid credentials' });
    const state = reducer(initialState, action);

    expect(state.isAuthenticated).toBe(false);
    expect(state.error).toBe('Invalid credentials');
    expect(state.loading).toBe(false);
  });

  it('should reset state on logout', () => {
    const authenticatedState = {
      ...initialState,
      isAuthenticated: true,
      user: { username: 'test' }
    };
    const action = AuthActions.logout();
    const state = reducer(authenticatedState, action);

    expect(state).toEqual(initialState);
  });
});