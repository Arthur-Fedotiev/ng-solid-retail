import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileToolbarComponent } from './profile-toolbar.component';
import { SharedUiMaterialModule } from '@sr/shared/ui-material';

@NgModule({
  declarations: [ProfileToolbarComponent],
  imports: [CommonModule, SharedUiMaterialModule],
  exports: [ProfileToolbarComponent],
})
export class ProfileToolbarModule {}
