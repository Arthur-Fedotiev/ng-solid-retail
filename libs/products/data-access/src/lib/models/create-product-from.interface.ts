export interface CreateProductForm {
  name: string;
  sku: string;
  description: string;

  categories: { id: string; name: string }[];
  prices: {
    price: number;
    tier: number;
    retailer: { id: string; name: string };
  }[];
}
