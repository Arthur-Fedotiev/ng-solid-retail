namespace Sr.Api.ProductsCatalogue.Contracts.Common
{
  public record ShoesSpecificationRequest(
    float Size,
    string Color
  );

  public record ClothingSpecificationRequest(
    string Size,
    string Color
  );

  public record BookSpecificationRequest(
    string Cover
  );
}
