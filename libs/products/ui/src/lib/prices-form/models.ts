import { FormGroup, FormControl } from '@angular/forms';

export type PriceFormGroup = FormGroup<{
  tier: FormControl<number>;
  retailer: FormControl<{
    name: string;
    id: string;
  }>;
  price: FormControl<number>;
}>;

export interface PricesFormVM {
  readonly retailers: readonly { readonly name: string }[];
}
