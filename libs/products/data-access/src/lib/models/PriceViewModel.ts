import { Price } from '@sr/products/domain';
import { RetailerViewModel } from './RetailerViewModel';

export class PriceViewModel {
  constructor(
    private readonly dto: Price,
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

  public clone(dto: Partial<PriceViewModel> = {}): PriceViewModel {
    return Object.assign(new PriceViewModel(this.dto), dto);
  }
}
