import { Retailer } from '@omnia/products/domain';
import { RetailerViewModel } from '../models/RetailerViewModel';

export const toRetailerViewModel = (retailer: Retailer): RetailerViewModel =>
  new RetailerViewModel(retailer.Id, retailer.Name);
