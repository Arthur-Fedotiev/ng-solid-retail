import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LayoutFeatureComponent } from '@sr/layout/feature';

const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutFeatureComponent,
    children: [
      {
        path: 'products',
        loadChildren: () =>
          import('@sr/products/shell').then((m) => m.ProductsShellModule),
      },
      {
        path: '**',
        redirectTo: 'products',
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      enableTracing: false,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
