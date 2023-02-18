import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import {
  SELECT_PRODUCT_COMMAND,
  useProductsDisplayVm,
} from '@sr/products/application';
import { ProductCardComponent } from '@sr/products/ui';
import { LetModule } from '@ngrx/component';
import { LIST_SHELL } from '@sr/shared/ui-list';

@Component({
  selector: 'sr-products-display-feature',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LIST_SHELL, LetModule, ProductCardComponent],
  template: `
    ><sr-list *ngrxLet="vm$ as vm" [items]="vm.productsShortInfo">
      <sr-product-card
        *srListItem="vm.productsShortInfo; let product"
        class="tw-cursor-pointer"
        [product]="product"
        (click)="selectProductCommand.execute(product.id)"
      ></sr-product-card>
    </sr-list>
  `,
})
export class ProductsDisplayFeatureComponent {
  protected readonly vm$ = useProductsDisplayVm();
  protected readonly selectProductCommand = inject(SELECT_PRODUCT_COMMAND);
}
