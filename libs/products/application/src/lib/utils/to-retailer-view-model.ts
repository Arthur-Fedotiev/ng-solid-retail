import { Retailer } from '@sr/products/entities';
import { RetailerViewModel } from '../models/retailer.view-model';

export const toRetailerViewModel = (
  { id, Name }: Retailer = {} as Retailer
): RetailerViewModel => new RetailerViewModel(id, Name);
