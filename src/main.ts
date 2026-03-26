/// <reference types="@angular/localize" />
import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { App } from './app/app';
import { appConfig } from './app/app.config';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { AuthInterceptor } from './app/shared/interceptors/auth.interceptor';


bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideAnimations(),
    provideToastr(
      
    ),
    provideZoneChangeDetection(),
     ...appConfig.providers,
      provideHttpClient(withInterceptorsFromDi()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
    ],
}).catch(err => console.error(err));
