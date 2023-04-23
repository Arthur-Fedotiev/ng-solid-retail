namespace Sr.Api.ProductsCatalogue.Domain.Product.ValueObjects.Specifications.Shoes
{
  public class BooksSpecification : ProductSpecification<BooksSpecificationValue>
  {
    public override ProductCategory Category => ProductCategory.Books;

    private BooksSpecification(BooksSpecificationValue value) : base(value)
    {
    }

    public static BooksSpecification Create(BooksSpecificationValue value)
    {
      return new BooksSpecification(value);
    }
  }
}
