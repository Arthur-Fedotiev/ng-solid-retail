import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';
import { RouterModule } from '@angular/router';
import { LayoutFeatureComponent } from './layout-feature.component';
import { LayoutUiModule } from '@omnia/layout/ui';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    LayoutUiModule,
    SharedUiMaterialModule,
    RouterModule,
    FlexLayoutModule,
  ],
  declarations: [LayoutFeatureComponent],
  exports: [LayoutFeatureComponent],
})
export class LayoutFeatureModule {}
