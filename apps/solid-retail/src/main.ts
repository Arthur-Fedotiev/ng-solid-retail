import { enableProdMode, importProvidersFrom } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { environment } from '@sr/shared/environments';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app/app.routes';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

if (environment.production) {
  enableProdMode();
}

try {
  bootstrapApplication(AppComponent, {
    providers: [
      provideHttpClient(),
      provideAnimations(),
      provideRouter(appRoutes),
      importProvidersFrom(
        AngularFireModule.initializeApp(environment.firebaseConfig)
      ),
      importProvidersFrom(AngularFirestoreModule),
    ],
  });
} catch (err) {
  console.error(err);
}
