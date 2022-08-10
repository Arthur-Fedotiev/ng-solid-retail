import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import {
  PriceViewModel,
  ProductsFacadeService,
  ProductViewModel,
} from '@omnia/products/data-access';

@Component({
  selector: 'omnia-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnDestroy {
  public readonly product$ = this.productsFacade.selectedProduct$;

  constructor(private readonly productsFacade: ProductsFacadeService) {}

  public ngOnDestroy(): void {
    this.releaseResources();
  }

  public updateProductPrice(
    product: ProductViewModel,
    $event: PriceViewModel
  ): void {
    const updatedPrices = product.prices.map((price) =>
      price.id === $event.id ? { ...price, ...$event } : price
    );

    this.productsFacade.selectedProductPriceUpdate(
      { ...product, prices: updatedPrices },
      $event.id
    );
  }

  public deleteProduct(id: string): void {
    this.productsFacade.deleteSelectedProduct(id);
  }

  private releaseResources(): void {
    this.productsFacade.releaseSelectedProduct();
  }
}
