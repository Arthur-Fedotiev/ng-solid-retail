import { IdGenerator } from '@sr/shared/util';
import { ProductViewModel } from '../../../models/product.view-model';
import { Category, CreateProductDto,  } from '@sr/products/entities';
import { CreateProductForm } from '../../../models';


export const getSaveProductDto =
  (IdGenerator: IdGenerator) =>
  (product: ProductViewModel | CreateProductForm) => {

    const result = {
      ...('id' in product ? { id: product.id } : {  }),
      name: product.name,
      sku: product.sku.toUpperCase(),
      description: product.description,
      url: product.url,
      category: product.category as Category,
      retailer: product.retailer,
      specifications: product.specifications as any,
      prices: product.prices.map(({ value, tier }) => ({ value, tier, currency: 'USD' })),
    } satisfies CreateProductDto

    console.log('result', result);


    return result
  };
