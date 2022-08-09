import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ProductShortInfo } from './product-short-info';

@Component({
  selector: 'omnia-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent {
  @Input() product!: ProductShortInfo;
}
