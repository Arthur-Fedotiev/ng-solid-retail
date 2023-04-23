using Sr.Api.ProductsCatalogue.Contracts.Common;

namespace Sr.Api.ProductsCatalogue.Contracts.CreateProduct;

public record CreateProductResponse(
  Guid Id,
  string Name,
  string Description,
  string SKU,
  string Url,
  Category Category,
  List<PriceResponse> Prices,
  object Specifications
);

public record PriceResponse(
  decimal Value,
  string Currency
);
