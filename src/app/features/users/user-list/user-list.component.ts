import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { User } from '../../../core/models/user.model';
import * as UsersActions from '../../../store/users/users.actions';
import * as AuthActions from '../../../store/auth/auth.actions';
import * as fromUsers from '../../../store/users/users.selectors';
import { UserFormComponent } from '../user-form/user-form.component';
import { ConfirmDialogComponent } from '../../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressBarModule,
    MatDialogModule,
    MatSnackBarModule
  ],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  private store = inject(Store);
  private dialog = inject(MatDialog);

  users$: Observable<User[]>;
  loading$: Observable<boolean>;
  displayedColumns: string[] = ['id', 'username', 'email', 'jobRole', 'actions'];

  constructor() {
    this.users$ = this.store.select(fromUsers.selectAllUsers);
    this.loading$ = this.store.select(fromUsers.selectUsersLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(UsersActions.loadUsers());
  }

  openAddDialog(): void {
    this.dialog.open(UserFormComponent, {
      width: '500px',
      data: { mode: 'add' }
    });
  }

  openEditDialog(user: User): void {
    this.dialog.open(UserFormComponent, {
      width: '500px',
      data: { mode: 'edit', user }
    });
  }

  deleteUser(user: User): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '500px',
      data: {
        title: 'Delete User',
        message: `Are you sure you want to delete ${user.username}?`,
        confirmText: 'Delete',
        cancelText: 'Cancel'
      }
    });

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.store.dispatch(UsersActions.deleteUser({ id: user.id }));
      }
    });
  }

  logout(): void {
    this.store.dispatch(AuthActions.logout());
  }
}