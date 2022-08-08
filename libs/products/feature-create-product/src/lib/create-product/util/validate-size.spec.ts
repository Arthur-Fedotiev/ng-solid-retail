import { FormArray, FormControl } from '@angular/forms';
import { validateSize } from './validate-size';

describe('validateSize', () => {
  const createArray = (length: number) =>
    new FormArray(
      Array(length)
        .fill(0)
        .map(() => new FormControl(''))
    );

  it('should return null if the array is valid', () => {
    const arr = createArray(1);

    expect(validateSize(1)(arr)).toBeNull();
  });

  it('should return an error if the array is invalid', () => {
    const arr = createArray(1);

    expect(validateSize(2)(arr)).toEqual({
      invalidSize: true,
    });
  });

  it('should validate max size', () => {
    const arr = createArray(3);

    expect(validateSize(1, 2)(arr)).toEqual({
      invalidSize: true,
    });
  });
});
