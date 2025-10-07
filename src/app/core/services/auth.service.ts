import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AuthCredentials } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/auth`;

  constructor(private http: HttpClient) {}

  login(credentials: AuthCredentials): Observable<boolean> {
    return of(
      credentials.username === 'admin' && credentials.password === 'admin123'
    ).pipe(delay(500));
  }

  logout(): void {
    localStorage.removeItem('isAuthenticated');
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('isAuthenticated') === 'true';
  }
}