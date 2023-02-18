import { Product } from '@sr/products/entities';
import { CategoryEnum } from '../constants/category.enum';
import { PriceViewModel } from './PriceViewModel';
import { CategoryViewModel } from './CategoryViewModel';

export class ProductViewModel {
  constructor(
    private readonly dto: Product,
    public readonly id: string = dto.id,
    public readonly name: string = dto.Name,
    public readonly description: string = dto.Description,
    public readonly sku: string = dto.SKU,
    public readonly url: string = dto.Url,
    public readonly categories: ReadonlyArray<CategoryViewModel> = dto.Categories.map(
      ({ id, Name }) =>
        new CategoryViewModel(id as string, Name as CategoryEnum)
    ),
    public readonly prices: ReadonlyArray<PriceViewModel> = dto.Prices.map(
      (price) => new PriceViewModel(price)
    )
  ) {}

  public clone(dto: Partial<ProductViewModel> = {}): ProductViewModel {
    return Object.assign(new ProductViewModel(this.dto), dto);
  }
}
