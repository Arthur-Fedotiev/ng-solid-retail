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
} from './models';
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

export interface DynamicComponentConfig {
  component: Type<object>;
  inputs: Record<string, any>;
}

export abstract class SpecificationsFormGroupStrategy<
  T extends object = object
> {
  abstract readonly category: CategoryEnum;
  abstract buildFormGroup(fb: FormBuilder): FormGroup<{
    [K in keyof T]: FormControl<T[K]>;
  }>;

  abstract getDynamicComponentConfig(): DynamicComponentConfig;
}

export class BooksSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<BooksCategoryFormGroup> {
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

  getDynamicComponentConfig(): DynamicComponentConfig {
    return {
      component: BooksSpecificationControlComponent,
      inputs: {
        coverOptions: this.coverTypes,
      },
    };
  }
}

export class ShoesSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<ShoesCategoryFormGroup> {
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

  getDynamicComponentConfig(): DynamicComponentConfig {
    return {
      component: ShoesSpecificationControlComponent,
      inputs: {
        sizes: this.sizes,
        colors: this.colors,
      },
    };
  }
}

export class ClothingSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<ShoesCategoryFormGroup> {
  readonly category = CategoryEnum.Clothing;
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

  getDynamicComponentConfig(): DynamicComponentConfig {
    return {
      component: ShoesSpecificationControlComponent,
      inputs: {
        sizes: this.sizes,
        colors: this.colors,
      },
    };
  }
}

export class SmartphonesSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<SmartphonesCategoryFormGroup> {
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

  getDynamicComponentConfig(): DynamicComponentConfig {
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
export class FurnitureSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<FurnitureCategoryFormGroup> {
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

  getDynamicComponentConfig(): DynamicComponentConfig {
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
