import { Component, OnInit, Inject, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

// Material Imports
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';

import { User } from '../../../core/models/user.model';
import * as UsersActions from '../../../store/users/users.actions';

interface DialogData {
  mode: 'add' | 'edit';
  user?: User;
}

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss']
})
export class UserFormComponent implements OnInit {
  private fb = inject(FormBuilder);
  private store = inject(Store);
  
  userForm!: FormGroup;
  jobRoles = [
    { value: 'tech', label: 'Tech' },
    { value: 'id', label: 'ID' },
    { value: 'gd', label: 'GD' },
    { value: 'qa', label: 'QA' }
  ];

  constructor(
    public dialogRef: MatDialogRef<UserFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      jobRole: ['', Validators.required]
    });

    if (this.data.mode === 'edit' && this.data.user) {
      this.userForm.patchValue(this.data.user);
    }
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      if (this.data.mode === 'add') {
        this.store.dispatch(UsersActions.addUser({ user: this.userForm.value }));
      } else if (this.data.mode === 'edit' && this.data.user) {
        this.store.dispatch(
          UsersActions.updateUser({
            user: { ...this.userForm.value, id: this.data.user.id }
          })
        );
      }
      this.dialogRef.close(true);
    }
  }

  onCancel(): void {
    this.dialogRef.close(false);
  }

  get username() {
    return this.userForm.get('username');
  }

  get email() {
    return this.userForm.get('email');
  }

  get jobRole() {
    return this.userForm.get('jobRole');
  }
}