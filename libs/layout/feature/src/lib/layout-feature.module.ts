import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';
import { RouterModule } from '@angular/router';
import { LayoutFeatureComponent } from './layout-feature.component';

@NgModule({
  imports: [CommonModule, SharedUiMaterialModule, RouterModule],
  declarations: [LayoutFeatureComponent],
  exports: [LayoutFeatureComponent],
})
export class LayoutFeatureModule {}
