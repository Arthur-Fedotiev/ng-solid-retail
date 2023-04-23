
using Sr.Api.ProductsCatalogue.Domain.Common.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects.Specifications
{
  public abstract class ProductSpecification<TSpecType> : ValueObject
    where TSpecType : notnull
  {
    public abstract ProductCategory Category { get; }
    public TSpecType Value { get; }

    protected ProductSpecification(TSpecType value)
    {
      Value = value;
    }

    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Category;
      yield return Value;
    }
  }
}
