namespace Sr.Api.ProductsCatalogue.Contracts.Common
{
  public record ShoesSpecification(
    float Size,
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
