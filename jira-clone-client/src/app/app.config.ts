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
  ],
};
