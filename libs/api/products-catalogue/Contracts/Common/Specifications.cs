namespace Sr.Api.ProductsCatalogue.Contracts.Common
{
  public record ShoesSpecification(
    string Size,
    string Color
  );

  public record ClothingSpecification(
    string Size,
    string Color
  );

  public record BookSpecification(
    string Cover
  );
}
