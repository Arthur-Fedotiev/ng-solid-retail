export interface BooksSpecificationInputs {
  coverOptions: readonly string[];
}

export interface FurnitureSpecificationsInputs {
  colors: readonly string[];
  materials: readonly string[];
}

export interface SpecificationSelectComponentInputs {
  label: string;
  options: readonly (string | number)[];
  formControlName: string;
}

export interface ShoesSpecificationsInputs {
  colors: readonly string[];
  shoesSizes: readonly (string | number)[];
}

export type SpecificationInputs =
  | BooksSpecificationInputs
  | ShoesSpecificationsInputs
  | SpecificationSelectComponentInputs
  | FurnitureSpecificationsInputs;
