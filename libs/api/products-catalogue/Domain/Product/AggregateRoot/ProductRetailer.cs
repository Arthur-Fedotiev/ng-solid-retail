using Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects;
using Sr.Api.Shared.Domain.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot
{
  public sealed class RetailerAggregate : AggregateRoot<ProductRetailerId>
  {
    private readonly List<ProductId> _products = new();
    public string Name { get; private set; }
    public IReadOnlyList<ProductId> ProductIds => _products.AsReadOnly();

    private RetailerAggregate(ProductRetailerId retailerId, string name) : base(retailerId)
    {
      Name = name;
    }

    public static RetailerAggregate Create(string name)
    {
      return new(ProductRetailerId.CreateUnique(), name);
    }
  }
}
