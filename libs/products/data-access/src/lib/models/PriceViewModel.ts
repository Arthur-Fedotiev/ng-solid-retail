import { Price } from '@omnia/products/domain';
import { RetailerViewModel } from './RetailerViewModel';

export class PriceViewModel {
  constructor(
    dto: Price,
    public readonly id: string = dto.id,
    public readonly retailer: RetailerViewModel = new RetailerViewModel(
      dto.Retailer.id,
      dto.Retailer.Name
    ),
    public readonly price: number = dto.Price,
    public readonly tier: number = dto.Tier,
    public readonly updateTime: string = dto.UpdateTime
  ) {}
}
