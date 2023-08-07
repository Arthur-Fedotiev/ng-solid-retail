export interface CreateProductForm {
  name: string;
  sku: string;
  description: string;
  url: string;
  category: { id: string; name: string };
  prices: ReadonlyArray<Price>;
  specifications: Record<string, unknown>;
}

export interface Price {
  price: number;
  tier: number;
  retailer: { id: string; name: string };
}
