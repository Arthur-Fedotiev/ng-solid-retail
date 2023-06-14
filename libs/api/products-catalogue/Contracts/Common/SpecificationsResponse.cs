namespace Sr.Api.ProductsCatalogue.Contracts.Common
{
  public record ShoesSpecificationResponse(
    float Size,
    string Color
  );

  public record ClothingSpecificationResponse(
    string Size,
    string Color
  );

  public record BookSpecificationResponse(
    string Cover
  );
}
