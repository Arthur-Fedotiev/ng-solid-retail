namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects.Specifications.Shoes
{
  public record ClothingSpecificationValue
  {
    public int Size { get; }
    public string Color { get; } = null!;
  }
}
