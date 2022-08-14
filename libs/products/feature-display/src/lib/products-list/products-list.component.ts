import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsFacadeService } from '@omnia/products/data-access';

@Component({
  selector: 'omnia-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent implements OnInit {
  public readonly products$ = this.productsFacade.productsShortInfo$;
  private readonly isHydrated =
    !!this.router.getCurrentNavigation()?.extras?.state?.['isHydrated'];

  constructor(
    private readonly productsFacade: ProductsFacadeService,
    private readonly router: Router
  ) {}

  public ngOnInit(): void {
    this.loadProducts();
  }

  public onClick(productId: string): void {
    this.productsFacade.productSelected(productId);
  }

  private loadProducts(): void {
    !this.isHydrated && this.productsFacade.loadProducts();
  }
}
