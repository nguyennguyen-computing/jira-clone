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
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { tokenInterceptor } from '@jira-clone/token-interceptor';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { NzConfig, provideNzConfig } from 'ng-zorro-antd/core/config';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

registerLocaleData(en);

const ngZorroConfig: NzConfig = {
  // You can customize NG-ZORRO default behaviors here
  notification: { nzPlacement: 'topRight' },
  message: { nzTop: 70 }
};

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
    provideNzI18n(en_US),
    provideHttpClient(withInterceptors([tokenInterceptor])),
    provideNzConfig(ngZorroConfig)
  ],
};
