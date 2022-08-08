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
  @Input() product!: ProductShortInfo;

  constructor() {}

  ngOnInit(): void {}
}
