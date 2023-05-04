using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;

namespace Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot
{
  public sealed class Clothing : Product
  {
    public override ProductCategory Category { get; protected set; } = ProductCategory.Clothing;

    public string ClothingSize { get; }

    public string Color { get; }

    private Clothing(
        ProductId id,
        string name,
        string description,
        string sku,
        List<ProductPrice> prices,
        ProductRetailer retailer,
        string url,
        string clothSize,
        string color
        ) : base(id, name, description, sku, prices, retailer, url)
    {
      ClothingSize = clothSize;
      Color = color;
    }

#pragma warning disable CS8618
    private Clothing()
    {
    }
#pragma warning restore CS8618

    public static Clothing Create(
         ProductId id,
         string name,
         string description,
         string sku,
         List<ProductPrice> prices,
         ProductRetailer retailer,
         string url,
         string clothSize,
         string color)
    {
      return new(id, name, description, sku, prices, retailer, url, clothSize, color);
    }
  }
}
