import { Retailer } from './retailer';

export interface Price {
  id: string;
  productId: string;
  Retailer: Retailer;
  Price: number | string;
  Tier: number;
  UpdateTime: string;
}
