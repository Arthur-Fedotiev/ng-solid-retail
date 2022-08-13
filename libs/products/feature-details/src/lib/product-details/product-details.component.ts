import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  CategoryViewModel,
  PriceViewModel,
  ProductsFacadeService,
  ProductViewModel,
} from '@omnia/products/data-access';
import { CompetitorsDialogComponent } from '@omnia/products/ui';
import { toISOStringWithTimezone, WithId } from '@omnia/shared/util';

@Component({
  selector: 'omnia-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnDestroy {
  public readonly product$ = this.productsFacade.selectedProduct$;

  constructor(
    private readonly productsFacade: ProductsFacadeService,
    public dialog: MatDialog
  ) {}

  public ngOnDestroy(): void {
    this.releaseResources();
  }

  public updateProductPrice(
    product: ProductViewModel,
    $event: PriceViewModel
  ): void {
    const updatedPrices = product.prices.map((price) =>
      price.id === $event.id
        ? price.clone({
            ...$event,
            updateTime: toISOStringWithTimezone(new Date()),
          })
        : price
    );

    this.productsFacade.selectedProductPriceUpdate(
      product.clone({ prices: updatedPrices }),
      $event.id
    );
  }

  public deleteProduct(id: string): void {
    this.productsFacade.deleteSelectedProduct(id);
  }

  public openCompetitorsDialog(category: CategoryViewModel): void {
    this.dialog.open(CompetitorsDialogComponent, {
      width: '500px',
      data: {
        category,
        retailers$: this.productsFacade.getCompetitorsForCategory$(category),
      },
    });
  }

  public trackById(index: number, item: WithId<unknown>): string {
    return item.id ?? index;
  }

  private releaseResources(): void {
    this.productsFacade.releaseSelectedProduct();
  }
}
