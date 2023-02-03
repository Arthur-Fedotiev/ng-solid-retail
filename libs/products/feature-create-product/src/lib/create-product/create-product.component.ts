import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  CreateProductForm,
  ProductsFacadeService,
} from '@sr/products/data-access';
import { TrackByIdOrIdx, TRACK_BY_ID_OR_IDX } from '@sr/shared/util';
import { PriceFormGroup } from './models/price-form-group.type';
import { validateSize } from './util/validate-size';

@Component({
  selector: 'sr-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductComponent {
  public readonly categories$ = this.productsFacade.categories$;
  public readonly retailers$ = this.productsFacade.retailers$;

  public readonly productForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(150)],
    ],
    description: ['', [Validators.required, Validators.maxLength(5000)]],
    sku: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    url: ['', [Validators.required, Validators.maxLength(150)]],
    categories: [[{ name: '', id: '' }], Validators.required],
    prices: this.fb.array([this.priceFormGroup], [validateSize(1)]),
  });

  get prices(): FormArray {
    return this.productForm.controls['prices'] as FormArray;
  }

  constructor(
    @Inject(TRACK_BY_ID_OR_IDX) public readonly trackById: TrackByIdOrIdx,
    private readonly fb: NonNullableFormBuilder,
    private readonly productsFacade: ProductsFacadeService
  ) {}

  public addPrice() {
    this.prices.push(this.priceFormGroup);
  }

  public deletePrice(idx: number) {
    this.prices.removeAt(idx);
  }

  public onSave(): void {
    this.productsFacade.createProduct(
      this.productForm.value as CreateProductForm
    );
  }

  private get priceFormGroup(): PriceFormGroup {
    return this.fb.group({
      tier: [1, [Validators.required, Validators.min(1), Validators.max(3)]],
      retailer: [
        null as unknown as PriceFormGroup['controls']['retailer']['value'],
        Validators.required,
      ],
      price: [0, [Validators.required, Validators.min(1)]],
    });
  }
}
