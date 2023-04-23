namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects.Specifications.Shoes
{
  public class ClothingSpecification : ProductSpecification<ClothingSpecificationValue>
  {
    public override ProductCategory Category => ProductCategory.Clothing;

    private ClothingSpecification(ClothingSpecificationValue value) : base(value)
    {
    }

    public static ClothingSpecification Create(ClothingSpecificationValue value)
    {
      return new ClothingSpecification(value);
    }
  }
}
