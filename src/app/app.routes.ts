import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => 
      import('./features/auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: 'users',
    loadComponent: () => 
      import('./features/users/user-list/user-list.component').then(m => m.UserListComponent),
    canActivate: [authGuard]
  },
  {
    path: '**',
    redirectTo: '/login'
  }
];