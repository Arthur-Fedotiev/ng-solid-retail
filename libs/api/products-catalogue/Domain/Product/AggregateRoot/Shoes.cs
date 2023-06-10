using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;

namespace Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot
{
  public sealed class Shoes : Product
  {
    public override ProductCategory Category { get; protected set; } = ProductCategory.Shoes;

    public float ShoesSize { get; private set; } = default!;

    public string Color { get; private set; } = default!;

    private Shoes(
        ProductId id,
        string name,
        string description,
        string sku,
        List<ProductPrice> prices,
        ProductRetailer retailer,
        string url,
        float shoesSize,
        string color
        ) : base(id, name, description, sku, prices, retailer, url)
    {
      ShoesSize = shoesSize;
      Color = color;
    }

#pragma warning disable CS8618
    private Shoes()
    {
    }
#pragma warning restore CS8618

    public static Shoes Create(
         ProductId id,
         string name,
         string description,
         string sku,
         List<ProductPrice> prices,
         ProductRetailer retailer,
         string url,
         float shoesSize,
         string color)
    {
      return new(id, name, description, sku, prices, retailer, url, shoesSize, color);
    }

  }
}
