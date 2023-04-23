using Sr.Api.ProductsCatalogue.Domain.Product.Entities;
using Sr.Api.ProductsCatalogue.Domain.ValueObjects;
using Sr.Api.Shared.Domain.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot
{
  public sealed class Product : AggregateRoot<ProductId>
  {
    public string Name { get; }
    public string Description { get; }
    public string SKU { get; }
    public ProductCategory Category { get; }
    public List<ProductPrice> Prices { get; } = new();
    public string Url { get; }
    public List<object> Specifications { get; } = new();

    private Product(
      ProductId id,
      string name,
      string description,
      string sku,
      ProductCategory category,
      List<ProductPrice> prices,
      string url,
      List<object> specifications) : base(id)
    {
      {
        Name = name;
        Description = description;
        SKU = sku;
        Category = category;
        Prices = prices;
        Url = url;
        Specifications = specifications;
      }
    }

    public static Product Create(
      string name,
      string description,
      string sku,
      ProductCategory category,
      List<ProductPrice> prices,
      string url,
      List<object> specifications)
    {
      return new(ProductId.CreateUnique(), name, description, sku, category, prices, url, specifications);
    }
  }
}
