using Sr.Api.ProductsCatalogue.Domain.Common.Models;

namespace Sr.Api.ProductsCatalogue.Domain.ValueObjects;

public sealed class ProductId : ValueObject
{
  public static ProductId CreateUnique() => new(Guid.NewGuid());

  public Guid Value { get; } = Guid.NewGuid();

  private ProductId(Guid value)
  {
    Value = value;
  }


  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Value;
  }
}
