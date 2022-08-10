import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import {
  CreateProductForm,
  ProductsFacadeService,
} from '@omnia/products/data-access';
import { PriceFormGroup } from './models/price-form-group.type';
import { validateSize } from './util/validate-size';

@Component({
  selector: 'omnia-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductComponent implements OnInit {
  public readonly categories$ = this.productsFacade.categories$;
  public readonly retailers$ = this.productsFacade.retailers$;

  public readonly productForm = this.fb.group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(50)],
    ],
    description: ['', [Validators.required, Validators.maxLength(100)]],
    sku: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(500)],
    ],
    categories: [[{ name: '', id: '' }], Validators.required],
    prices: this.fb.array([this.priceFormGroup], [validateSize(1)]),
  });

  get prices(): FormArray {
    return this.productForm.controls['prices'] as FormArray;
  }

  constructor(
    private readonly fb: NonNullableFormBuilder,
    private readonly productsFacade: ProductsFacadeService
  ) {}

  public ngOnInit(): void {
    this.productsFacade.loadCategories();
    this.productsFacade.loadRetailers();
  }

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
      retailer: [{ name: '', id: '' }, Validators.required],
      price: [0, [Validators.required, Validators.min(1)]],
    });
  }
}
