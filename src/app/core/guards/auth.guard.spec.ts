import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthService } from '../services/auth.service';

describe('authGuard', () => {
  let authService: jest.Mocked<AuthService>;
  let router: jest.Mocked<Router>;

  beforeEach(() => {
    const authServiceMock = {
      isAuthenticated: jest.fn(),
      login: jest.fn(),
      logout: jest.fn()
    } as unknown as jest.Mocked<AuthService>;

    const routerMock = {
      parseUrl: jest.fn()
    } as unknown as jest.Mocked<Router>;

    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: Router, useValue: routerMock }
      ]
    });

    authService = TestBed.inject(AuthService) as unknown as jest.Mocked<AuthService>;
    router = TestBed.inject(Router) as unknown as jest.Mocked<Router>;
  });

  it('should allow access when authenticated', () => {
    authService.isAuthenticated.mockReturnValue(true);
    
    const result = TestBed.runInInjectionContext(() => 
      authGuard({} as any, {} as any)
    );

    expect(result).toBe(true);
  });

  it('should redirect to login when not authenticated', () => {
    authService.isAuthenticated.mockReturnValue(false);
    const urlTree = {} as any;
    router.parseUrl.mockReturnValue(urlTree);
    
    const result = TestBed.runInInjectionContext(() => 
      authGuard({} as any, {} as any)
    );

    expect(router.parseUrl).toHaveBeenCalledWith('/login');
    expect(result).toBe(urlTree);
  });
});