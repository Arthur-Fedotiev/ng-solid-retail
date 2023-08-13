import { AbstractControl, FormArray } from '@angular/forms';

export const validateSize =
  (min: number, max = Infinity) =>
  (arr: AbstractControl) => {
    if (!(arr instanceof FormArray)) {
      throw new Error('Expected FormArray');
    }

    return arr.length < min || arr.length > max
      ? {
          invalidSize: true,
        }
      : null;
  };
