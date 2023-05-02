using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;

namespace Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot
{
  public sealed class Shoes : Product
  {
    public override ProductCategory Category => ProductCategory.Shoes;

    public float ShoesSize { get; }

    public string Color { get; }

    private Shoes(
        ProductId id,
        string name,
        string description,
        string sku,
        List<ProductPrice> prices,
        ProductRetailerId retailerId,
        string url,
        float shoesSize,
        string color
        ) : base(id, name, description, sku, prices, retailerId, url)
    {
      ShoesSize = shoesSize;
      Color = color;
    }

    public static Shoes Create(
         ProductId id,
         string name,
         string description,
         string sku,
         List<ProductPrice> prices,
         ProductRetailerId retailerId,
         string url,
         float shoesSize,
         string color)
    {
      return new(id, name, description, sku, prices, retailerId, url, shoesSize, color);
    }

  }
}
