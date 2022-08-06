import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListModule } from './list/list.module';

@NgModule({
  imports: [CommonModule, ListModule],
  exports: [ListModule],
})
export class SharedUiListModule {}
