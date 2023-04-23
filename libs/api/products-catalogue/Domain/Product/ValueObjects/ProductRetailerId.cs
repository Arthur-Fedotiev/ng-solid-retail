using Sr.Api.ProductsCatalogue.Domain.Common.Models;

namespace Sr.Api.ProductsCatalogue.Domain.ValueObjects;

public sealed class ProductRetailerId : ValueObject
{
  public static ProductRetailerId CreateUnique() => new(Guid.NewGuid());

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
