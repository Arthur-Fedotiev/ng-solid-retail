import { Retailer } from '@omnia/products/domain';
import { RetailerViewModel } from '../models/RetailerViewModel';

export const toRetailerViewModel = (
  { id, Name }: Retailer = {} as Retailer
): RetailerViewModel => new RetailerViewModel(id, Name);
