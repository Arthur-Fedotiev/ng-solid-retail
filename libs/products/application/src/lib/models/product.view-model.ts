import { Price, Product } from '@sr/products/entities';
import { CategoryEnum } from '../constants/category.enum';
import { PriceViewModel } from './price.view-model';
import { CategoryViewModel } from './category.view-model';

export class ProductViewModel {
  constructor(
    private readonly dto: Product,
    public readonly id: string = dto.id,
    public readonly name: string = dto.Name,
    public readonly description: string = dto.Description,
    public readonly sku: string = dto.SKU,
    public readonly url: string = dto.Url,
    public readonly category: CategoryViewModel = new CategoryViewModel(
      dto.Category.id as string,
      dto.Category.Name as CategoryEnum
    ),
    public readonly prices: ReadonlyArray<PriceViewModel> = dto.Prices.map(
      (price: Price) => new PriceViewModel(price)
    ),
    public readonly specifications: Record<string, any> = dto.Specifications
  ) {}

  public clone(dto: Partial<ProductViewModel> = {}): ProductViewModel {
    return Object.assign(new ProductViewModel(this.dto), dto);
  }
}
