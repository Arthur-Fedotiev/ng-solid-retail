import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormArray, NonNullableFormBuilder, Validators } from '@angular/forms';
import { TRACK_BY_ID_OR_IDX } from '@sr/shared/util';
import { PriceFormGroup } from './models/price-form-group.type';
import { validateSize } from './util/validate-size';
import { CREATE_PRODUCT_COMMAND } from './cqrs/commands/create-product.command';
import { CREATE_PRODUCT_VM_QUERY } from './cqrs/queries/create-product-vm.query';

@Component({
  selector: 'sr-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreateProductComponent {
  private readonly createProductCommand = inject(CREATE_PRODUCT_COMMAND);
  private readonly fb = inject(NonNullableFormBuilder);

  public readonly vm$ = inject(CREATE_PRODUCT_VM_QUERY).get();

  public readonly trackById = inject(TRACK_BY_ID_OR_IDX);
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

  public onSave(): void {
    this.createProductCommand.execute(this.productForm.getRawValue());
  }
  public addPrice() {
    this.prices.push(this.priceFormGroup);
  }

  public deletePrice(idx: number) {
    this.prices.removeAt(idx);
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
