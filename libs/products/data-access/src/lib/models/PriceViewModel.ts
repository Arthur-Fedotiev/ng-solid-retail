import { Price } from '@omnia/products/domain';
import { RetailerViewModel } from './RetailerViewModel';

export class PriceViewModel {
  constructor(
    dto: Price,
    public readonly id: string = dto.id,
    public readonly productId: string = dto.productId,
    public readonly retailer: RetailerViewModel = new RetailerViewModel(
      dto.Retailer.id,
      dto.Retailer.Name
    ),
    public readonly tier: number = dto.Tier,
    public readonly updateTime: string = dto.UpdateTime,
    public readonly price: number = Number(dto.Price)
  ) {}
}
