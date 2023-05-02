using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;

namespace Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot
{
  public sealed class Clothing : Product
  {
    public override ProductCategory Category => ProductCategory.Clothing;

    public string ClothingSize { get; }

    public string Color { get; }

    private Clothing(
        ProductId id,
        string name,
        string description,
        string sku,
        List<ProductPrice> prices,
        ProductRetailerId retailerId,
        string url,
        string clothSize,
        string color
        ) : base(id, name, description, sku, prices, retailerId, url)
    {
      ClothingSize = clothSize;
      Color = color;
    }

    public static Clothing Create(
         ProductId id,
         string name,
         string description,
         string sku,
         List<ProductPrice> prices,
         ProductRetailerId retailerId,
         string url,
         string clothSize,
         string color)
    {
      return new(id, name, description, sku, prices, retailerId, url, clothSize, color);
    }
  }
}
