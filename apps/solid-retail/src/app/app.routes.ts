import { Route } from '@angular/router';
import { LayoutFeatureComponent } from '@sr/layout/feature';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutFeatureComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('@sr/products/shell').then((m) => m.PRODUCT_ROUTES),
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];
