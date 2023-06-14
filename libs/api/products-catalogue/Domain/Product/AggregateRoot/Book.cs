using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;

namespace Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot
{
  public sealed class Book : Product
  {
    public override ProductCategory Category { get; protected set; } = ProductCategory.Books;
    public string Cover { get; private set; }

    private Book(
        ProductId id,
        string name,
        string description,
        string sku,
        List<ProductPrice> prices,
        ProductRetailer retailer,
        string url,
        string cover) : base(id, name, description, sku, prices, retailer, url)
    {
      Cover = cover;
    }

#pragma warning disable CS8618
    private Book()
    {
    }
#pragma warning restore CS8618

    public static Book Create(
        ProductId id,
        string name,
        string description,
        string sku,
        List<ProductPrice> prices,
        ProductRetailer retailer,
        string url,
        string cover)
    {
      return new(id, name, description, sku, prices, retailer, url, cover);
    }
  }
}
