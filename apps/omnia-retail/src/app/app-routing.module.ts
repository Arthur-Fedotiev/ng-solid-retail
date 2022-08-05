import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { LayoutFeatureComponent } from '@omnia/layout/feature';

const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutFeatureComponent,
    children: [],
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
