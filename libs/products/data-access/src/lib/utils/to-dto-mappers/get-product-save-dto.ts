import { IdGenerator, toISOStringWithTimezone } from '@omnia/shared/util';
import { CreateProductForm } from '../../models/create-product-from.interface';
import { PriceViewModel } from '../../models/PriceViewModel';
import { ProductViewModel } from '../../models/ProductViewModel';

const isProductViewModel = (
  product: ProductViewModel | CreateProductForm
): product is ProductViewModel => 'id' in product;

const isPriceViewModel = (
  price: PriceViewModel | CreateProductForm['prices'][number]
): price is PriceViewModel => 'id' in price;

export const getSaveProductDto =
  (IdGenerator: IdGenerator) =>
  (product: ProductViewModel | CreateProductForm) => {
    const productId = isProductViewModel(product) ? product.id : IdGenerator();

    return {
      id: productId,
      Name: product.name,
      SKU: product.sku.toUpperCase(),
      Description: product.description,
      Url: product.url,
      Categories: product.categories.map((category) => ({
        id: category.id,
        Name: category.name,
      })),
      Prices: product.prices.map((price) => {
        const { id, UpdateTime } = isPriceViewModel(price)
          ? { id: price.id, UpdateTime: price.updateTime }
          : {
              id: IdGenerator(),
              UpdateTime: toISOStringWithTimezone(new Date()),
            };

        return {
          id,
          productId,
          Price: price.price,
          Tier: price.tier,
          Retailer: { id: price.retailer.id, Name: price.retailer.name },
          UpdateTime,
        };
      }),
    };
  };
