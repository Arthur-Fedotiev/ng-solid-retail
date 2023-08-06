import {
  BooksSpecificationControlComponent,
  FurnitureSpecificationControlComponent,
  ShoesSpecificationControlComponent,
  SpecificationSelectComponent,
} from '@sr/products/ui';

export type BooksSpecificationInputs = Pick<
  BooksSpecificationControlComponent,
  'coverOptions'
>;

export type ShoesSpecificationsInputs = Pick<
  ShoesSpecificationControlComponent,
  'colors' | 'shoesSizes'
>;

export type SpecificationSelectComponentInputs = Pick<
  SpecificationSelectComponent,
  'label' | 'options' | 'formControlName'
>;

export type FurnitureSpecificationsInputs = Pick<
  FurnitureSpecificationControlComponent,
  'colors' | 'materials'
>;

export type SpecificationInputs =
  | BooksSpecificationInputs
  | ShoesSpecificationsInputs
  | SpecificationSelectComponentInputs
  | FurnitureSpecificationsInputs;
