import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsFacadeService } from '@sr/products/application';
import { ProductCardComponent } from '@sr/products/ui';
import { LetModule } from '@ngrx/component';
import { LIST_SHELL } from '@sr/shared/ui-list';

@Component({
  selector: 'sr-products-display-feature',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [LIST_SHELL, LetModule, ProductCardComponent],
  template: `
    <sr-list *ngrxLet="products$ as products" [items]="products">
      <sr-product-card
        *srListItem="products; let product"
        class="tw-cursor-pointer"
        [product]="product"
        (click)="onClick(product.id)"
      ></sr-product-card>
    </sr-list>
  `,
})
export class ProductsDisplayFeatureComponent {
  public readonly products$ = this.productsFacade.productsShortInfo$;

  constructor(private readonly productsFacade: ProductsFacadeService) {}

  public onClick(productId: string): void {
    this.productsFacade.productSelected(productId);
  }
}
