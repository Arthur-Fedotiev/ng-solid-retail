import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsFacadeService } from '@omnia/products/data-access';

@Component({
  selector: 'omnia-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent {
  public readonly product$ = this.productsFacade.selectedProduct$;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsFacade: ProductsFacadeService
  ) {
    console.log(this.route.snapshot.data['exercise'] ?? null);
  }
}
