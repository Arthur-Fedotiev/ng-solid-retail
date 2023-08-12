import {
  Price,
  ProductDTO,
  Category,
  Specifications,
  Retailer,
} from '@sr/products/entities';
import { PriceViewModel } from './price.view-model';

export class ProductViewModel {
  constructor(
    private readonly dto: ProductDTO,
    public readonly id: string = dto.id,
    public readonly name: string = dto.name,
    public readonly description: string = dto.description,
    public readonly sku: string = dto.sku,
    public readonly url: string = dto.url,
    public readonly category: Category = dto.category,
    public readonly retailer: Retailer = dto.retailer,
    public readonly prices: ReadonlyArray<PriceViewModel> = dto.prices.map(
      (price: Price) => new PriceViewModel(price, dto)
    ),
    public readonly specifications: Specifications = dto.specifications
  ) {}

  public clone(dto: Partial<ProductViewModel> = {}): ProductViewModel {
    return Object.assign(new ProductViewModel(this.dto), dto);
  }
}
