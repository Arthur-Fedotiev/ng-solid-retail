import { CategoryEnum } from '../constants/category.enum';
import { toCategoryViewModel } from './to-category-view-model';

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
