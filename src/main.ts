/// <reference types="@angular/localize" />
import { provideZoneChangeDetection } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { App } from './app/app';
import { appConfig } from './app/app.config';

bootstrapApplication(App, {
  ...appConfig,
  providers: [
    provideAnimations(),
    provideToastr(
      
    ),
    provideZoneChangeDetection(),
     ...appConfig.providers],
}).catch(err => console.error(err));
