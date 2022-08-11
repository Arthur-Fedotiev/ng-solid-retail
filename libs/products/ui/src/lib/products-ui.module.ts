import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardModule } from './product-card/product-card.module';
import { CompetitorsDialogComponent } from './competitors-dialog/competitors-dialog.component';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';

@NgModule({
  declarations: [CompetitorsDialogComponent],
  imports: [CommonModule, ProductCardModule, SharedUiMaterialModule],
  exports: [ProductCardModule, CompetitorsDialogComponent],
})
export class ProductsUiModule {}
