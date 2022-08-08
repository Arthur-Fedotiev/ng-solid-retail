import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';
import { RouterModule } from '@angular/router';
import { LayoutFeatureComponent } from './layout-feature.component';
import { LayoutUiModule } from '@omnia/layout/ui';

@NgModule({
  imports: [CommonModule, LayoutUiModule, SharedUiMaterialModule, RouterModule],
  declarations: [LayoutFeatureComponent],
  exports: [LayoutFeatureComponent],
})
export class LayoutFeatureModule {}
