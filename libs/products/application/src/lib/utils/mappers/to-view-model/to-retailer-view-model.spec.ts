import { RetailerViewModel } from '../../../models';
import { toRetailerViewModel } from './to-retailer-view-model';

describe('toRetailerViewModel', () => {
  it('should return a RetailerViewModel', () => {
    const retailer = { id: '1', Name: 'Retailer 1' };
    const result = toRetailerViewModel(retailer);

    expect(result).toEqual(new RetailerViewModel(retailer.id, retailer.Name));
  });
});
