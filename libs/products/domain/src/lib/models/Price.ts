import { Retailer } from './Retailer';

export interface Price {
  id: string;
  productId: string;
  Retailer: Retailer;
  Price: number | string;
  Tier: number;
  UpdateTime: string;
}
