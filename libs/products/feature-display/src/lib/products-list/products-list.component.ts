import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ProductsFacadeService } from '@omnia/products/data-access';

@Component({
  selector: 'omnia-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  public readonly products$ = this.productsFacade.productsShortInfo$;

  constructor(private readonly productsFacade: ProductsFacadeService) {}

  public onClick(productId: string): void {
    this.productsFacade.productSelected(productId);
  }
}
