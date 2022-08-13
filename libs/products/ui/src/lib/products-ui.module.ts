import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCardModule } from './product-card/product-card.module';
import { CompetitorsDialogComponent } from './competitors-dialog/competitors-dialog.component';
import { SharedUiMaterialModule } from '@omnia/shared/ui-material';
import { ProductCategoriesModule } from './product-categories/product-categories.module';

@NgModule({
  declarations: [CompetitorsDialogComponent],
  imports: [
    CommonModule,
    ProductCardModule,
    SharedUiMaterialModule,
    ProductCategoriesModule,
  ],
  exports: [
    ProductCardModule,
    CompetitorsDialogComponent,
    ProductCategoriesModule,
  ],
})
export class ProductsUiModule {}
