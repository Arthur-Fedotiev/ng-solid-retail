import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import {
  BooksCategoryFormGroup,
  FurnitureCategoryFormGroup,
  ShoesCategoryFormGroup,
  SmartphonesCategoryFormGroup,
} from './form-group.models';
import {
  CategoryEnum,
  SpecificationsDataService,
} from '@sr/products/application';
import { Injectable, Type, inject } from '@angular/core';
import {
  BooksSpecificationControlComponent,
  FurnitureSpecificationControlComponent,
  ShoesSpecificationControlComponent,
  SpecificationSelectComponent,
} from '@sr/products/ui';
import {
  BooksSpecificationInputs,
  FurnitureSpecificationsInputs,
  ShoesSpecificationsInputs,
  SpecificationSelectComponentInputs,
} from './input.models';

export interface DynamicComponentConfig<TCmpInputs = object> {
  component: Type<TCmpInputs>;
  inputs: TCmpInputs;
}

export abstract class SpecificationsFormGroupStrategy<
  TCmpInputs = any,
  TFormGroup = any
> {
  abstract readonly category: CategoryEnum;
  abstract buildFormGroup(fb: FormBuilder): FormGroup<{
    [K in keyof TFormGroup]: FormControl<TFormGroup[K]>;
  }>;

  abstract getDynamicComponentConfig(): DynamicComponentConfig<TCmpInputs>;
}

export class BooksSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<
  BooksSpecificationInputs,
  BooksCategoryFormGroup
> {
  readonly category = CategoryEnum.Books;
  private readonly coverTypes = inject(
    SpecificationsDataService
  ).getCoverTypes();

  buildFormGroup(fb: FormBuilder) {
    return fb.group({
      cover: fb.control<BooksCategoryFormGroup['cover']>(
        null,
        Validators.required
      ),
      author: fb.control<BooksCategoryFormGroup['author']>(
        null,
        Validators.required
      ),
    });
  }

  getDynamicComponentConfig(): DynamicComponentConfig<BooksSpecificationInputs> {
    return {
      component: BooksSpecificationControlComponent,
      inputs: {
        coverOptions: this.coverTypes,
      },
    };
  }
}

export class ShoesSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<
  ShoesSpecificationsInputs,
  ShoesCategoryFormGroup
> {
  readonly category = CategoryEnum.Shoes;
  private readonly sizes = inject(SpecificationsDataService).getSizes(
    this.category
  );
  private readonly colors = inject(SpecificationsDataService).getColors(
    this.category
  );

  buildFormGroup(fb: FormBuilder) {
    return fb.group({
      size: fb.control<ShoesCategoryFormGroup['size']>(
        null,
        Validators.required
      ),
      color: fb.control<ShoesCategoryFormGroup['color']>(
        null,
        Validators.required
      ),
    });
  }

  getDynamicComponentConfig(): DynamicComponentConfig<ShoesSpecificationsInputs> {
    return {
      component: ShoesSpecificationControlComponent,
      inputs: {
        shoesSizes: this.sizes,
        colors: this.colors,
      },
    };
  }
}

export class SmartphonesSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<
  SpecificationSelectComponentInputs,
  SmartphonesCategoryFormGroup
> {
  readonly category = CategoryEnum.Smartphones;
  private readonly colors = inject(SpecificationsDataService).getColors(
    this.category
  );

  buildFormGroup(fb: FormBuilder) {
    return fb.group({
      color: fb.control<SmartphonesCategoryFormGroup['color']>(
        null,
        Validators.required
      ),
    });
  }

  getDynamicComponentConfig(): DynamicComponentConfig<SpecificationSelectComponentInputs> {
    return {
      component: SpecificationSelectComponent,
      inputs: {
        label: 'Color',
        options: this.colors,
        formControlName: 'color',
      },
    };
  }
}

@Injectable()
export class FurnitureSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<
  FurnitureSpecificationsInputs,
  FurnitureCategoryFormGroup
> {
  readonly category = CategoryEnum.Furniture;
  private readonly colors = inject(SpecificationsDataService).getColors(
    this.category
  );

  buildFormGroup(fb: FormBuilder) {
    return fb.group({
      color: fb.control<FurnitureCategoryFormGroup['color']>(
        null,
        Validators.required
      ),
      material: fb.control<FurnitureCategoryFormGroup['material']>(
        null,
        Validators.required
      ),
    });
  }

  getDynamicComponentConfig(): DynamicComponentConfig<FurnitureSpecificationsInputs> {
    return {
      component: FurnitureSpecificationControlComponent,
      inputs: {
        colors: this.colors,
        materials: ['Wood', 'Plastic'],
      },
    };
  }
}

export class NullSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy {
  readonly category = CategoryEnum.Null;
  buildFormGroup(fb: FormBuilder) {
    return fb.group({});
  }

  getDynamicComponentConfig(): DynamicComponentConfig {
    throw new Error('Component should be implemented for the category');
  }
}
