import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedUiMaterialModule } from '@sr/shared/ui-material';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LetModule } from '@ngrx/component';

@NgModule({
  declarations: [CreateProductComponent],
  imports: [
    CommonModule,
    FlexLayoutModule,
    SharedUiMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    LetModule,
  ],
  exports: [CreateProductComponent],
})
export class CreateProductModule {}
