import { RetailerDTO } from './retailer';

export interface PriceDTO {
  id: string;
  productId: string;
  Retailer: RetailerDTO;
  Price: number | string;
  Tier: number;
  UpdateTime: string;
}
