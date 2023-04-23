using Sr.Api.ProductsCatalogue.Domain.Common.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.Entities;


public sealed class ProductPriceId : ValueObject
{
  public static ProductPriceId CreateUnique() => new(Guid.NewGuid());

  protected override IEnumerable<object> GetEqualityComponents()
  {
    throw new NotImplementedException();
  }

  public Guid Value { get; } = Guid.NewGuid();

  private ProductPriceId(Guid value)
  {
    Value = value;
  }
}

