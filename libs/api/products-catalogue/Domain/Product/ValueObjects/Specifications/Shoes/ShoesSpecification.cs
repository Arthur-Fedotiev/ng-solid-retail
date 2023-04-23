namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects.Specifications.Shoes
{
  public class ShoesSpecification : ProductSpecification<ShoesSpecificationValue>
  {
    public override ProductCategory Category => ProductCategory.Shoes;

    private ShoesSpecification(ShoesSpecificationValue value) : base(value)
    {
    }

    public static ShoesSpecification Create(ShoesSpecificationValue value)
    {
      return new ShoesSpecification(value);
    }
  }
}
