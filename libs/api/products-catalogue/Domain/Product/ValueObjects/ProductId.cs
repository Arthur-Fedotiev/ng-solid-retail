using Sr.Api.ProductsCatalogue.Domain.Common.Models;

namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects
{
  public sealed class ProductId : ValueObject
  {
    public static ProductId CreateUnique()
    {
      return new(Guid.NewGuid());
    }

    public static ProductId Create(Guid value)
    {
      return new(value);
    }

    public Guid Value { get; private set; } = Guid.NewGuid();

    private ProductId(Guid value)
    {
      Value = value;
    }

#pragma warning disable CS8618
    private ProductId()
    {
    }
#pragma warning restore CS8618


    protected override IEnumerable<object> GetEqualityComponents()
    {
      yield return Value;
    }
  }
}
