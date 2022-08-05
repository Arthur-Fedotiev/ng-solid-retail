import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileToolbarModule } from './profile-toolbar/profile-toolbar.module';

@NgModule({
  imports: [CommonModule, ProfileToolbarModule],
  exports: [ProfileToolbarModule],
})
export class LayoutUiModule {}
