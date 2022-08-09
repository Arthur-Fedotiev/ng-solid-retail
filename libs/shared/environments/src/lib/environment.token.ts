import { InjectionToken } from '@angular/core';
import { environment } from './environment';

export interface Environment {
  production: boolean;
  api: string;
}

export const ENVIRONMENT = new InjectionToken<Environment>('environment', {
  providedIn: 'root',
  factory: () => ({
    ...environment,
  }),
});
