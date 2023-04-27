using Microsoft.AspNetCore.Mvc;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;
using MediatR;
using Price = Sr.Api.ProductsCatalogue.Application.CreateProduct.Price;
using CommonContracts = Sr.Api.ProductsCatalogue.Contracts.Common;

using Sr.Api.ProductsCatalogue.Application.CreateProduct;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.SolidRetailApi.Controllers
{
  [ApiController]
  [Route("api/v1/catalogue")]
  [Produces("application/json")]
  public class ProductsCatalogueController : ControllerBase
  {
    private readonly IMediator _mediator;

    public ProductsCatalogueController(IMediator mediator)
    {
      _mediator = mediator;
    }

    [HttpPost]
    [ProducesResponseType(typeof(CreateProductResponse), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateProduct(CreateProductRequest request)
    {
      var createdProduct = await _mediator.Send(new CreateProductCommand(
        request.Category,
        request.Name,
        request.Description,
        request.SKU,
        request.Url,
        request.Prices.ConvertAll(price => new Price(price.Value, price.Currency)),
        request switch
        {
          CreateShoesRequest shoesRequest => new ShoesSpecification(shoesRequest.Specifications.Size, shoesRequest.Specifications.Color),
          CreateClothingRequest clothingRequest => new ClothingSpecification(clothingRequest.Specifications.Size, clothingRequest.Specifications.Color),
          CreateBookRequest bookRequest => new BookSpecification(bookRequest.Specifications.Cover),
          _ => throw new ArgumentOutOfRangeException(nameof(request.Category))
        }
      ));



      CreateProductResponse result = createdProduct switch
      {
        Shoes => new CreateShoesResponse(
          createdProduct.Id.Value,
          createdProduct.Name,
          createdProduct.Description,
          createdProduct.SKU,
          createdProduct.Url,
          createdProduct.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Currency.Code)),
          new CommonContracts.ShoesSpecification(
            ((Shoes)createdProduct).ShoesSize,
            ((Shoes)createdProduct).Color)),
        Clothing => new CreateClothingResponse(
          createdProduct.Id.Value,
          createdProduct.Name,
          createdProduct.Description,
          createdProduct.SKU,
          createdProduct.Url,
          createdProduct.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Currency.Code)),
          new CommonContracts.ClothingSpecification(
            ((Clothing)createdProduct).ClothingSize,
            ((Clothing)createdProduct).Color)),
        Book => new CreateBookResponse(
          createdProduct.Id.Value,
          createdProduct.Name,
          createdProduct.Description,
          createdProduct.SKU,
          createdProduct.Url,
          createdProduct.Prices.ToList().ConvertAll(price => new PriceResponse(price.Amount, price.Currency.Code)),
          new CommonContracts.BookSpecification(
            ((Book)createdProduct).Cover)),

        _ => throw new ArgumentOutOfRangeException(nameof(request.Category))
      };

      return CreatedAtAction(nameof(CreateProduct), result);
    }
  }
}
