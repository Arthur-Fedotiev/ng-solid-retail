import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  inject,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  CategoryViewModel,
  PriceViewModel,
  ProductsFacadeService,
  ProductViewModel,
} from '@sr/products/application';
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
import { PRODUCT_DETAIL_VM_QUERY } from './cqrs/product-details-vm.query';
import { LetModule } from '@ngrx/component';
import { PRODUCT_DETAILS_COMMANDS_API } from './cqrs/product.details-api.commands';
import { COMPETITORS_QUERY } from './cqrs/categories.query';

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
    LetModule,
    AsyncPipe,
    LowestTierPricePipe,
    ProductCategoriesComponent,
    ProductPriceComponent,
  ],
  providers: [],
})
export class ProductDetailsComponent implements OnDestroy {
  private readonly productDetailsCommandsAPI = inject(
    PRODUCT_DETAILS_COMMANDS_API
  );
  private readonly competitorsQuery = inject(COMPETITORS_QUERY);
  public readonly vm$ = inject(PRODUCT_DETAIL_VM_QUERY).get();

  constructor(
    @Inject(TRACK_BY_ID_OR_IDX) public readonly trackById: TrackByIdOrIdx,
    public readonly dialog: MatDialog
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

    this.productDetailsCommandsAPI.update(updateProduct);
  }

  public deleteProduct(id: string): void {
    this.productDetailsCommandsAPI.delete(id);
  }

  public openCompetitorsDialog(category: CategoryViewModel): void {
    this.dialog.open(CompetitorsDialogComponent, {
      width: '500px',
      data: { category, retailers$: this.competitorsQuery.get(category) },
    });
  }

  private releaseResources(): void {
    this.productDetailsCommandsAPI.releaseResources();
  }
}
