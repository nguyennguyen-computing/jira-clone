import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NZ_JIRA_ICONS } from '../../libs/client/shell/src/lib/shell/layout/models/icons.const';
import { API_URL } from '@jira-clone/http-client';
import { environment } from 'src/enviroments/enviroment';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    provideAnimations(),
    importProvidersFrom([
      BrowserModule,
      BrowserAnimationsModule,
      NzIconModule.forRoot(NZ_JIRA_ICONS),
    ]),
    { provide: API_URL, useValue: environment.api_url },
    provideHttpClient(),
  ],
};
