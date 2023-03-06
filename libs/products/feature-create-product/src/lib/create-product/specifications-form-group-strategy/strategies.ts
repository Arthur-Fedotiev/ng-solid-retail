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

export abstract class SpecificationsFormGroupStrategy<
  T extends object = object
> {
  abstract buildFormGroup(fb: FormBuilder): FormGroup<{
    [K in keyof T]: FormControl<T[K]>;
  }>;
}

export class BooksSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<BooksCategoryFormGroup> {
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
  buildFormGroup(fb: FormBuilder) {
    return fb.group({
      color: fb.control<SmartphonesCategoryFormGroup['color']>(
        null,
        Validators.required
      ),
    });
  }
}

export class FurnitureSpecificationsFormGroupStrategy extends SpecificationsFormGroupStrategy<FurnitureCategoryFormGroup> {
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
  buildFormGroup(fb: FormBuilder) {
    return fb.group({});
  }
}
