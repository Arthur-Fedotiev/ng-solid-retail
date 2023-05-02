using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;

namespace Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot
{
  public sealed class Book : Product
  {
    public override ProductCategory Category => ProductCategory.Books;
    public string Cover { get; }

    private Book(
        ProductId id,
        string name,
        string description,
        string sku,
        List<ProductPrice> prices,
        ProductRetailerId retailerId,
        string url,
        string cover) : base(id, name, description, sku, prices, retailerId, url)
    {
      Cover = cover;
    }

    public static Book Create(
        ProductId id,
        string name,
        string description,
        string sku,
        List<ProductPrice> prices,
        ProductRetailerId retailerId,
        string url,
        string cover)
    {
      return new(id, name, description, sku, prices, retailerId, url, cover);
    }
  }
}
