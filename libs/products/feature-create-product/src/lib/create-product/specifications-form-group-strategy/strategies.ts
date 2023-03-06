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
import { CategoryEnum } from '@sr/products/application';
import { Injectable } from '@angular/core';

export abstract class SpecificationsFormGroupStrategy<
  T extends object = object
> {
  abstract category: CategoryEnum;
  abstract buildFormGroup(fb: FormBuilder): FormGroup<{
    [K in keyof T]: FormControl<T[K]>;
  }>;
}

export class BooksSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<BooksCategoryFormGroup> {
  category = CategoryEnum.Books;
  buildFormGroup(fb: FormBuilder) {
    return fb.group({
      cover: fb.control<BooksCategoryFormGroup['cover']>(
        null,
        Validators.required
      ),
    });
  }
}

export class ShoesSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<ShoesCategoryFormGroup> {
  category = CategoryEnum.Shoes;
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
}

export class ClothingSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<ShoesCategoryFormGroup> {
  category = CategoryEnum.Clothing;
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
}

export class SmartphonesSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<SmartphonesCategoryFormGroup> {
  category = CategoryEnum.Smartphones;
  buildFormGroup(fb: FormBuilder) {
    return fb.group({
      color: fb.control<SmartphonesCategoryFormGroup['color']>(
        null,
        Validators.required
      ),
    });
  }
}

@Injectable()
export class FurnitureSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<FurnitureCategoryFormGroup> {
  category = CategoryEnum.Furniture;
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
}

export class NullSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy {
  category = CategoryEnum.Null;
  buildFormGroup(fb: FormBuilder) {
    return fb.group({});
  }
}

export const STRATEGY_PROVIDERS = [
  {
    provide: SpecificationsFormGroupStrategy,
    useClass: BooksSpecificationsFormGroupStrategy,
    multi: true,
  },
  {
    provide: SpecificationsFormGroupStrategy,
    useClass: ShoesSpecificationsFormGroupStrategy,
    multi: true,
  },

  {
    provide: SpecificationsFormGroupStrategy,
    useClass: ClothingSpecificationsFormGroupStrategy,
    multi: true,
  },
  {
    provide: SpecificationsFormGroupStrategy,
    useClass: SmartphonesSpecificationsFormGroupStrategy,
    multi: true,
  },
  {
    provide: SpecificationsFormGroupStrategy,
    useClass: FurnitureSpecificationsFormGroupStrategy,
    multi: true,
  },
  {
    provide: SpecificationsFormGroupStrategy,
    useClass: NullSpecificationsFormGroupStrategy,
    multi: true,
  },
];
