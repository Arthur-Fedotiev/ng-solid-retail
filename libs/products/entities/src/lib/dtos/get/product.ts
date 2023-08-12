import {
  SrApiProductsCatalogueApplicationCommonPaginatedItemsResponse1SrApiProductsCatalogueContractsCommonProductResponse,
  SrApiProductsCatalogueContractsCommonPriceResponse,
} from '@sr/generated/solid-retail-api-types';
import { ProductCategory } from '../../../constants';

export type GetProductsPaginatedResponse =
  SrApiProductsCatalogueApplicationCommonPaginatedItemsResponse1SrApiProductsCatalogueContractsCommonProductResponse;

export type ProductDTO = NonNullable<
  GetProductsPaginatedResponse['data']
>[number];

export type Category = typeof ProductCategory[keyof typeof ProductCategory];
export type Price = ProductDTO['prices'][number];
export type Currency = Price['currency'];
export type Tier = Price['tier'];
export type Retailer = ProductDTO['retailer'];
export type Specifications = ProductDTO['specifications'];
export type PriceDTO = SrApiProductsCatalogueContractsCommonPriceResponse;

export type PaginatedResponse = GetProductsPaginatedResponse;
