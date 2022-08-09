import { Category } from '@omnia/products/domain';
import { CategoryEnum } from '../constants/category.enum';
import { CategoryViewModel } from '../models/CategoryViewModel';

export const toCategoryViewModel = ({
  Id,
  Name,
}: Category): CategoryViewModel =>
  new CategoryViewModel(Id as string, Name as CategoryEnum);

//test suit for toCategoryViewModel
// 1. define test cases constant
// 2. run it.each on defined constant
// 3. expect result to be equal to expected value

const testCases = [
  {
    input: {
      Id: '1',
      Name: 'Electronics',
    },
    expected: {
      id: '1',
      name: CategoryEnum.Electronics,
    },
  },
  {
    input: {
      Id: '2',
      Name: 'Brandy',
    },
    expected: {
      id: '2',
      name: CategoryEnum.Brandy,
    },
  },
  {
    input: {
      Id: '3',
      Name: 'Food',
    },
    expected: {
      id: '3',
      name: CategoryEnum.Food,
    },
  },
];

describe('toCategoryViewModel', () => {
  it.each(testCases)(
    'should return category view model: %s for category: %s',
    ({ expected, input }) => {
      expect(toCategoryViewModel(input)).toEqual(expected);
    }
  );
});
