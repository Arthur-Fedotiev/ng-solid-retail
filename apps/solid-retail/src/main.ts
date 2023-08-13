import { enableProdMode } from '@angular/core';

import { environment } from '@sr/shared/environments';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

try {
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideAnimations(),
      provideRouter(appRoutes),
    ],
  });
} catch (err) {
  console.error(err);
}
