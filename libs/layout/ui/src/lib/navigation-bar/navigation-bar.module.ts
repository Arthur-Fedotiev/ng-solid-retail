import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationBarComponent } from './navigation-bar.component';
import { SharedUiMaterialModule } from '@sr/shared/ui-material';

@NgModule({
  declarations: [NavigationBarComponent],
  imports: [CommonModule, SharedUiMaterialModule],
  exports: [NavigationBarComponent],
})
export class NavigationBarModule {}
