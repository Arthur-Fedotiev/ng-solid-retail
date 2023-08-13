import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  inject,
} from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import {
  Category,
  PriceViewModel,
  ProductViewModel,
} from '@sr/products/application';
import {
  CompetitorsDialogComponent,
  ProductCategoriesComponent,
} from '@sr/products/ui';
import { MatCardModule } from '@angular/material/card';
import { NgIf, AsyncPipe, NgFor, NgTemplateOutlet } from '@angular/common';
import { LowestTierPricePipe } from './lowest-tier-price.pipe';
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

  constructor(public readonly dialog: MatDialog) {}

  public ngOnDestroy(): void {
    this.releaseResources();
  }

  public updateProductPrice(
    product: ProductViewModel,
    priceIdx: number,
    $event: PriceViewModel
  ): void {
    const updatedPrices = product.prices.map((price, idx) =>
      idx === priceIdx ? price.clone({ ...$event }) : price
    );
    const updateProduct = product.clone({
      prices: updatedPrices,
    });

    this.productDetailsCommandsAPI.update(updateProduct);
  }

  public deleteProduct(id: string): void {
    this.productDetailsCommandsAPI.delete(id);
  }

  public openCompetitorsDialog(category: Category): void {
    this.dialog.open(CompetitorsDialogComponent, {
      width: '500px',
      data: { category, retailers$: this.competitorsQuery.get(category) },
    });
  }

  private releaseResources(): void {
    this.productDetailsCommandsAPI.releaseResources();
  }
}
