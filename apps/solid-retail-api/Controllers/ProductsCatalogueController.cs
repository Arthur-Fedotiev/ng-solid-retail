using Microsoft.AspNetCore.Mvc;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;

namespace Sr.SolidRetailApi.Controllers;

[ApiController]
[Route("api/v1/catalogue")]
public class ProductsCatalogueController : ControllerBase
{

  [HttpPost]
  public ActionResult<CreateProductResponse> CreateProduct(CreateProductRequest request)
  {
    var response = new CreateProductResponse(
      Guid.NewGuid(),
      request.Name,
      request.Description,
      request.SKU,
      request.Url,
      request.Category,
      request.Prices
        .Select(price => new PriceResponse(price.Value, price.Currency))
        .ToList(),
      request.Specifications
    );

    return Ok(response);
  }

}
