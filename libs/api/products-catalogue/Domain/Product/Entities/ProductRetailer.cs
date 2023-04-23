using Sr.Api.ProductsCatalogue.Domain.ValueObjects;
using Sr.Api.Shared.Domain.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.Entities
{
  public sealed class ProductRetailer : Entity<ProductRetailerId>
  {
    public string Name { get; }

    private ProductRetailer(ProductRetailerId retailerId, string name) : base(retailerId)
    {
      Name = name;
    }

    public static ProductRetailer Create(string name)
    {
      return new(ProductRetailerId.CreateUnique(), name);
    }
  }
}
