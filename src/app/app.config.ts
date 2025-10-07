import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { appRoutes } from './app.routes';
import { reducer as authReducer, authFeatureKey } from './store/auth/auth.reducer';
import { reducer as usersReducer, usersFeatureKey } from './store/users/users.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { UsersEffects } from './store/users/users.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(appRoutes),
    provideAnimations(),
    provideHttpClient(),
    provideStore({
      [authFeatureKey]: authReducer,
      [usersFeatureKey]: usersReducer
    }),
    provideEffects([AuthEffects, UsersEffects]),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false
    })
  ]
};