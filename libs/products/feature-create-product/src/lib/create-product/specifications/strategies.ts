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
  Categories,
  Category,
  SpecificationsDataService,
} from '@sr/products/application';
import { Injectable, Type, inject } from '@angular/core';
import { Observable, from, map } from 'rxjs';

import {
  BooksSpecificationInputs,
  FurnitureSpecificationsInputs,
  ShoesSpecificationsInputs,
  SpecificationSelectComponentInputs,
} from './input.models';

export interface DynamicComponentConfig<TCmpInputs = object> {
  component: Observable<Type<TCmpInputs>>;
  inputs: TCmpInputs;
}

export abstract class SpecificationsFormGroupStrategy<
  TCmpInputs = object,
  TFormGroup = object
> {
  abstract readonly category: Category | null;
  abstract buildFormGroup(fb: FormBuilder): FormGroup<{
    [K in keyof TFormGroup]: FormControl<TFormGroup[K]>;
  }>;

  abstract getDynamicComponentConfig(): DynamicComponentConfig<TCmpInputs>;
}

export class BooksSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<
  BooksSpecificationInputs,
  BooksCategoryFormGroup
> {
  readonly category = Categories.Books;
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
      component: from(
        import(
          'libs/products/ui-lazy/src/lib/specification-controls/books-specification-control/books-specification-control.component'
        )
      ).pipe(map((m) => m.BooksSpecificationControlComponent)),
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
  readonly category = Categories.Shoes;
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
      component: from(
        import(
          'libs/products/ui-lazy/src/lib/specification-controls/shoes-specification-control/shoes-specification-control.component'
        )
      ).pipe(map((m) => m.ShoesSpecificationControlComponent)),
      inputs: {
        shoesSizes: this.sizes as number[],
        colors: this.colors,
      },
    };
  }
}

export class SmartphonesSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<
  SpecificationSelectComponentInputs,
  SmartphonesCategoryFormGroup
> {
  readonly category = Categories.Smartphones;
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
      component: from(
        import(
          'libs/products/ui-lazy/src/lib/specification-controls/specification-select/specification-select.component'
        )
      ).pipe(map((m) => m.SpecificationSelectComponent)),
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
  readonly category = Categories.Furniture;
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
      component: from(
        import(
          'libs/products/ui-lazy/src/lib/specification-controls/furniture-specification-control/furniture-specification-control.component'
        )
      ).pipe(map((m) => m.FurnitureSpecificationControlComponent)),
      inputs: {
        colors: this.colors,
        materials: ['Wood', 'Plastic'],
      },
    };
  }
}

export class NullSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy {
  readonly category = null;
  buildFormGroup(fb: FormBuilder) {
    return fb.group({});
  }

  getDynamicComponentConfig(): DynamicComponentConfig {
    throw new Error('Component should be implemented for the category');
  }
}
