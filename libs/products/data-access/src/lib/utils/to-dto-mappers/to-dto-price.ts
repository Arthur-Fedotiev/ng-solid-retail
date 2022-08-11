export const toPriceDto = (
  price: {
    price: number;
    tier: number;
    retailer: { id: string; name: string };
  },
  idGEnerator?: () => string
): {
  id: string;
  productId: string;
  Price: number;
  Tier: number;
  Retailer: { id: string; Name: string };
  UpdateTime: string;
} => {
  const priceId = IdGenerator();
  return {
    id: priceId,
    productId,
    Price: price.price,
    Tier: price.tier,
    Retailer: { id: price.retailer.id, Name: price.retailer.name },
    UpdateTime: toISOStringWithTimezone(new Date()),
  };
};
