using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;
using Sr.Api.ProductsCatalogue.Domain.ValueObjects;
using Sr.Api.Shared.Domain.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot
{
  public abstract class Product : AggregateRoot<ProductId>
  {
    protected readonly List<ProductPrice> _prices = new();

    public abstract ProductCategory Category { get; }
    public string Name { get; }
    public string Description { get; }
    public string SKU { get; }
    public string Url { get; }

    public IReadOnlyList<ProductPrice> Prices => _prices.AsReadOnly();

    protected Product(
      ProductId id,
      string name,
      string description,
      string sku,
      List<ProductPrice> prices,
      string url) : base(id)
    {
      {
        Name = name;
        Description = description;
        SKU = sku;
        Url = url;
        _prices = prices;
      }
    }
  }
}
