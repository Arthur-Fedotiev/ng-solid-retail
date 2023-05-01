using Sr.Api.ProductsCatalogue.Domain.Common.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects
{
  public sealed class ProductId : ValueObject
  {
    public static ProductId CreateUnique()
    {
      return new(Guid.NewGuid());
    }

    public Guid Value { get; } = Guid.NewGuid();

    public ProductId(Guid value)
    {
      Value = value;
    }


    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Value;
    }
  }
}
