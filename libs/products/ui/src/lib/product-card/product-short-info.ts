export interface ProductCard {
  product: ProductShortInfo;
}

export interface ProductShortInfo {
  id: string;
  price: number;
  name: string;
  sku: string;
  retailer: string;
  currencySymbol?: string;
}
