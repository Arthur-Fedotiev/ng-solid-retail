import { Retailer } from './Retailer';

export interface Price {
  Id: string;
  Retailer: Retailer;
  Price: number;
  Tier: number;
  UpdateTime: string;
}
