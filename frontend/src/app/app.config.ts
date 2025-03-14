import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';

import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { authInterceptor } from './interceptors/auth.interceptor';
import { ReservaServiceService } from './services/reserva-service.service';
import { SalasServiceService } from './services/salas-service.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideClientHydration(), provideAnimationsAsync(),provideHttpClient(),
    importProvidersFrom([ButtonModule,TableModule, DialogModule, InputTextModule, CalendarModule,ToastModule]),
    MessageService,
    providePrimeNG({
      theme: {
          preset: Aura,
          options:{
            darkmodeSelector: '.my'
          }
      }
  }),
  provideHttpClient(withInterceptors([authInterceptor])),
  ReservaServiceService,
  SalasServiceService
  ]
};
