import { Price, ProductDTO } from '@sr/products/entities';

export class PriceViewModel {
  constructor(
    private readonly dto: Price,
    private readonly product: ProductDTO,
    public readonly value = dto.value,
    public readonly productId = product.id,
    public readonly retailer = product.retailer,
    public readonly tier = dto.tier
  ) {}

  public clone(dto: Partial<PriceViewModel> = {}): PriceViewModel {
    return Object.assign(new PriceViewModel(this.dto, this.product), dto);
  }
}
