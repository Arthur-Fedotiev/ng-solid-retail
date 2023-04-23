namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects.Specifications.Shoes
{
  public record ShoesSpecificationValue
  {
    public int Size { get; }
    public string Color { get; } = null!;
  }
}
