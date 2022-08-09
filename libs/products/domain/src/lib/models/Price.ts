import { Retailer } from './Retailer';

export interface Price {
  id: string;
  Retailer: Retailer;
  Price: number;
  Tier: number;
  UpdateTime: string;
}
