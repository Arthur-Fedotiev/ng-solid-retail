import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product.component';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [CommonModule],
  exports: [CreateProductComponent],
})
export class CreateProductModule {}
