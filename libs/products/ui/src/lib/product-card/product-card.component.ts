import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ProductShortInfo } from './product-short-info';

@Component({
  selector: 'omnia-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductCardComponent implements OnInit {
  @Input() product: ProductShortInfo = {
    id: '1',
    price: 1,
    name: 'Product 1',
    sku: 'SKU 1',
    retailer: 'Retailer 1',
  };

  constructor() {}

  ngOnInit(): void {}
}
