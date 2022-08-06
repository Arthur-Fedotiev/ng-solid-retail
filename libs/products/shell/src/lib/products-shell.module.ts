import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', redirectTo: 'display' },
      {
        path: 'display',
        loadChildren: () =>
          import('@omnia/products-feature-display').then(
            (m) => m.ProductsFeatureDisplayModule
          ),
      },
    ]),
  ],
})
export class ProductsShellModule {}
