import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;

  const initialState = {
    auth: {
      isAuthenticated: false,
      user: null,
      error: null,
      loading: false
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideAnimations(),
        provideMockStore({ initialState })
      ]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form with empty values', () => {
    expect(component.loginForm.value).toEqual({
      username: '',
      password: ''
    });
  });

  it('should mark form as invalid when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  it('should validate username field', () => {
    const username = component.loginForm.get('username');
    expect(username?.valid).toBeFalsy();

    username?.setValue('test');
    expect(username?.valid).toBeTruthy();
  });

  it('should validate password field with minimum length', () => {
    const password = component.loginForm.get('password');
    expect(password?.valid).toBeFalsy();

    password?.setValue('12345');
    expect(password?.hasError('minlength')).toBeTruthy();

    password?.setValue('123456');
    expect(password?.valid).toBeTruthy();
  });

  it('should dispatch login action on valid form submission', () => {
    jest.spyOn(store, 'dispatch');
    
    component.loginForm.setValue({
      username: 'testuser',
      password: 'password123'
    });

    component.onSubmit();

    expect(store.dispatch).toHaveBeenCalled();
  });
});