import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { ProductShortInfo } from './product-short-info';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'sr-product-card',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,

  imports: [MatCardModule, MatIconModule, MatTooltipModule, FlexLayoutModule],

  template: `<mat-card class="card mat-elevation-z3" tabindex="0">
    <img
      class="card__image"
      mat-card-image
      src="{{ product.url }}"
      alt="Photo of {{ product.name }}"
    />
    <p class="card__price-container">
      <span class="price">\${{ product.price }}</span>
    </p>
    <mat-card-header class="card__header">
      <mat-card-title [matTooltip]="product.name" class="card__title">{{
        product.name
      }}</mat-card-title>
    </mat-card-header>
    <mat-card-content
      class="card__content"
      fxLayout="row nowrap"
      fxLayoutGap="2rem"
      fxLayoutAlign="space-around center"
    >
      <div>
        <p>Retailer</p>
        <p>GTIN</p>
      </div>
      <div>
        <p>{{ product.retailer }}</p>
        <p>{{ product.sku }}</p>
      </div>
    </mat-card-content>
  </mat-card> `,
})
export class ProductCardComponent {
  @Input() product!: ProductShortInfo;
}
