import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'omnia-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
