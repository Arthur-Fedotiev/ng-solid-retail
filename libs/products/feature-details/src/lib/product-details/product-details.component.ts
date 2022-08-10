import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsFacadeService } from '@omnia/products/data-access';

@Component({
  selector: 'omnia-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailsComponent implements OnDestroy {
  public readonly product = this.route.snapshot.data['product'];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly productsFacade: ProductsFacadeService
  ) {}

  public ngOnDestroy(): void {
    this.releaseResources();
  }

  private releaseResources(): void {
    this.productsFacade.releaseSelectedProduct();
  }
}
