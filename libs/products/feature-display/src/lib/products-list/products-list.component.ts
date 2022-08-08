import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProductsFacadeService } from '@omnia/products/data-access';
import { tap } from 'rxjs';

@Component({
  selector: 'omnia-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  public readonly products$ = this.productsFacade.productsShortInfo$.pipe(
    tap((products) => console.log('products', products))
  );

  constructor(private readonly productsFacade: ProductsFacadeService) {}

  public ngOnInit(): void {
    this.loadProducts();
  }

  private loadProducts() {
    this.productsFacade.loadProducts();
  }
}
