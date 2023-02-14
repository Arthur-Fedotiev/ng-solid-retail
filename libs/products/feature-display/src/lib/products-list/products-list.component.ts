import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsFacadeService } from '@sr/products/data-access';
import { ProductCardComponent } from '@sr/products/ui';
import { ListComponent } from '@sr/shared/ui-list';

@Component({
  selector: 'sr-products-list',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ListComponent, AsyncPipe, ProductCardComponent],
  template: `<sr-list class="products-list" [items]="products$ | async">
    <ng-template #omniaListItem let-product>
      <sr-product-card
        [product]="product"
        class="products-list__item"
        (click)="onClick(product.id)"
      ></sr-product-card>
    </ng-template>
  </sr-list> `,
})
export class ProductsListComponent {
  public readonly products$ = this.productsFacade.productsShortInfo$;

  constructor(private readonly productsFacade: ProductsFacadeService) {}

  public onClick(productId: string): void {
    this.productsFacade.productSelected(productId);
  }
}
