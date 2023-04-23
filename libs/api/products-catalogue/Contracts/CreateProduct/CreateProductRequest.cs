using Sr.Api.ProductsCatalogue.Contracts.Common;

namespace Sr.Api.ProductsCatalogue.Contracts.CreateProduct
{
  public record CreateProductRequest(
    string Name,
    string Description,
    string SKU,
    string Url,
    Category Category,
    List<Price> Prices,
    object Specifications
  );

  public record Price(
    decimal Value,
    string Currency
  );
}
