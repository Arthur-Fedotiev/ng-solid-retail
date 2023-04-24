using Microsoft.AspNetCore.Mvc;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;
using OneOf;

namespace Sr.SolidRetailApi.Controllers
{
  [ApiController]
  [Route("api/v1/catalogue")]
  [Produces("application/json")]
  public class ProductsCatalogueController : ControllerBase
  {
    [HttpPost]
    [ProducesResponseType(typeof(CreateProductResponse), StatusCodes.Status201Created)]
    public ActionResult<CreateProductResponse> CreateProduct(CreateProductRequest request)
    {
      OneOf<CreateShoesResponse, CreateClothingResponse, CreateBookResponse>
       result = request switch
       {
         CreateShoesRequest => new CreateShoesResponse(Guid.NewGuid(),
           request.Name,
           request.Description,
           request.SKU,
           request.Url,
           request.Category,
           request.Prices.ConvertAll(price => new PriceResponse(price.Value, price.Currency)),
           ((CreateShoesRequest)request).Specifications),
         CreateClothingRequest => new CreateClothingResponse(
           Guid.NewGuid(),
           request.Name,
           request.Description,
           request.SKU,
           request.Url,
           request.Category,
           request.Prices.ConvertAll(price => new PriceResponse(price.Value, price.Currency)),
           ((CreateClothingRequest)request).Specifications),
         CreateBookRequest => new CreateBookResponse(
           Guid.NewGuid(),
           request.Name,
           request.Description,
           request.SKU,
           request.Url,
           request.Category,
           request.Prices.ConvertAll(price => new PriceResponse(price.Value, price.Currency)),
           ((CreateBookRequest)request).Specifications),
         _ => throw new ArgumentOutOfRangeException(nameof(request.Category))
       };

      var response = result.Match<CreateProductResponse>(
        shoes => shoes,
        clothing => clothing,
        book => book
      );
      return Ok(response);
    }
  }
}
