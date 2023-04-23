using Sr.Api.ProductsCatalogue.Domain.Common.Models;

namespace Sr.Api.ProductsCatalogue.Domain.ValueObjects;

public sealed class ProductSpecification : ValueObject
{
  public string Name { get; private set; }
  public string Value { get; private set; }

  public ProductSpecification(string name, string value)
  {
    Name = name;
    Value = value;
  }

  protected override IEnumerable<object> GetEqualityComponents()
  {
    yield return Name;
    yield return Value;
  }
}
