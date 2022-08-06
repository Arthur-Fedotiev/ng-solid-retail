import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'omnia-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
