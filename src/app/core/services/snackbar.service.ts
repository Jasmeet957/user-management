import { Injectable, inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private snackBar = inject(MatSnackBar);

  showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-success']
    });
  }

  showError(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-error']
    });
  }

  showInfo(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000,
      horizontalPosition: 'end',
      verticalPosition: 'bottom',
      panelClass: ['snackbar-info']
    });
  }

  show(message: string, type: 'success' | 'error' | 'info' = 'info'): void {
    switch(type) {
      case 'success':
        this.showSuccess(message);
        break;
      case 'error':
        this.showError(message);
        break;
      case 'info':
        this.showInfo(message);
        break;
    }
  }
}