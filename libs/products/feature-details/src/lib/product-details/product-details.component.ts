import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  CategoryViewModel,
  PriceViewModel,
  ProductsFacadeService,
  ProductViewModel,
} from '@sr/products/data-access';
import { CompetitorsDialogComponent } from '@sr/products/ui';
import { MatCardModule } from '@angular/material/card';
import { NgIf, AsyncPipe, NgFor, NgTemplateOutlet } from '@angular/common';
import {
  toISOStringWithTimezone,
  TrackByIdOrIdx,
  TRACK_BY_ID_OR_IDX,
} from '@sr/shared/util';
import { LowestTierPricePipe } from './lowest-tier-price.pipe';
import { ProductCategoriesComponent } from '@sr/products/ui';
import { ProductPriceComponent } from '../product-price/product-price.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FlexLayoutModule } from '@angular/flex-layout';

@Component({
  selector: 'sr-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    FlexLayoutModule,
    NgTemplateOutlet,
    NgIf,
    NgFor,
    AsyncPipe,
    LowestTierPricePipe,
    ProductCategoriesComponent,
    ProductPriceComponent,
  ],
})
export class ProductDetailsComponent implements OnDestroy {
  public readonly product$ = this.productsFacade.selectedProduct$;

  constructor(
    @Inject(TRACK_BY_ID_OR_IDX) public readonly trackById: TrackByIdOrIdx,
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
    const updateProduct = product.clone({
      prices: updatedPrices,
    });

    this.productsFacade.selectedProductUpdate(updateProduct);
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

  private releaseResources(): void {
    this.productsFacade.releaseSelectedProduct();
  }
}
