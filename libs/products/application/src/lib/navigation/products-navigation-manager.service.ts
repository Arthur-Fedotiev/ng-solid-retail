import { Injectable } from '@angular/core';
import { NavigateToDisplay } from './contracts/navigate-to-display.interface';
import { NavigateToProduct } from './contracts/navigate-to-product.interface';
import { Router } from '@angular/router';
import { ROUTES } from './constants';

@Injectable({
  providedIn: 'root',
})
export class ProductsNavigationManagerService
  implements NavigateToDisplay, NavigateToProduct
{
  constructor(private readonly router: Router) {}

  navigateToProduct(id: string): void {
    this.router.navigateByUrl(ROUTES.details(id));
  }

  navigateToDisplay(): void {
    this.router.navigateByUrl(ROUTES.display());
  }
}
