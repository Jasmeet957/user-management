import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, exhaustMap, mergeMap, tap } from 'rxjs/operators';
import * as UsersActions from './users.actions';
import { UserService } from '../../core/services/user.service';
import { SnackbarService } from '../../core/services/snackbar.service';

@Injectable()
export class UsersEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private snackbarService = inject(SnackbarService);

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.loadUsers),
      exhaustMap(() =>
        this.userService.getUsers().pipe(
          map(users => UsersActions.loadUsersSuccess({ users })),
          catchError(error => of(UsersActions.loadUsersFailure({ error: error.message })))
        )
      )
    )
  );

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.addUser),
      mergeMap(action =>
        this.userService.addUser(action.user).pipe(
          map(user => UsersActions.addUserSuccess({ user })),
          catchError(error => of(UsersActions.addUserFailure({ error: error.message })))
        )
      )
    )
  );

  updateUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.updateUser),
      mergeMap(action =>
        this.userService.updateUser(action.user).pipe(
          map(user => UsersActions.updateUserSuccess({ user })),
          catchError(error => of(UsersActions.updateUserFailure({ error: error.message })))
        )
      )
    )
  );

  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UsersActions.deleteUser),
      mergeMap(action =>
        this.userService.deleteUser(action.id).pipe(
          map(() => UsersActions.deleteUserSuccess({ id: action.id })),
          catchError(error => of(UsersActions.deleteUserFailure({ error: error.message })))
        )
      )
    )
  );

  addUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.addUserSuccess),
        tap(() => this.snackbarService.showSuccess('User added successfully'))
      ),
    { dispatch: false }
  );

  addUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.addUserFailure),
        tap(() => this.snackbarService.showError('Failed to add user'))
      ),
    { dispatch: false }
  );

  updateUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.updateUserSuccess),
        tap(() => this.snackbarService.showSuccess('User updated successfully'))
      ),
    { dispatch: false }
  );

  updateUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.updateUserFailure),
        tap(() => this.snackbarService.showError('Failed to update user'))
      ),
    { dispatch: false }
  );

  deleteUserSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.deleteUserSuccess),
        tap(() => this.snackbarService.showSuccess('User deleted successfully'))
      ),
    { dispatch: false }
  );

  deleteUserFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.deleteUserFailure),
        tap(() => this.snackbarService.showError('Failed to delete user'))
      ),
    { dispatch: false }
  );

  loadUsersFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(UsersActions.loadUsersFailure),
        tap(() => this.snackbarService.showError('Failed to load users'))
      ),
    { dispatch: false }
  );
}