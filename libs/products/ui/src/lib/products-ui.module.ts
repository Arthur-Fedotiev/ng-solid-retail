import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardModule } from './product-card/product-card.module';
import { CompetitorsDialogComponent } from './competitors-dialog/competitors-dialog.component';

@NgModule({
  imports: [CommonModule, ProductCardModule],
  exports: [ProductCardModule, CompetitorsDialogComponent],
  declarations: [CompetitorsDialogComponent],
})
export class ProductsUiModule {}
