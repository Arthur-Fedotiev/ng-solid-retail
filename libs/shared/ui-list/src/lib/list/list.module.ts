import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ListComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [ListComponent],
})
export class ListModule {}
