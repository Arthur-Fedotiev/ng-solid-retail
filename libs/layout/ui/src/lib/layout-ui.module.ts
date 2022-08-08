import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileToolbarModule } from './profile-toolbar/profile-toolbar.module';
import { NavigationBarModule } from './navigation-bar/navigation-bar.module';

@NgModule({
  imports: [CommonModule, ProfileToolbarModule, NavigationBarModule],
  exports: [ProfileToolbarModule, NavigationBarModule],
})
export class LayoutUiModule {}
