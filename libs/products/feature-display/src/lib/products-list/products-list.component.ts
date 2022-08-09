import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductsFacadeService } from '@omnia/products/data-access';

@Component({
  selector: 'omnia-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  public readonly products$ = this.productsFacade.productsShortInfo$;

  constructor(private readonly productsFacade: ProductsFacadeService) {}

  public ngOnInit(): void {
    this.loadProducts();
  }

  public onClick(productId: string): void {
    this.productsFacade.selectProduct(productId);
  }

  private loadProducts(): void {
    this.productsFacade.loadProducts();
  }
}
