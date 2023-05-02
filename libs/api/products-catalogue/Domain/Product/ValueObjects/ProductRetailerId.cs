using Sr.Api.ProductsCatalogue.Domain.Common.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects
{
  public sealed class ProductRetailerId : ValueObject
  {
    public static ProductRetailerId CreateUnique()
    {
      return new(Guid.NewGuid());
    }

    public static ProductRetailerId Create(Guid value)
    {
      return new(value);
    }

    public Guid Value { get; } = Guid.NewGuid();

    private ProductRetailerId(Guid value)
    {
      Value = value;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Value;
    }
  }
}