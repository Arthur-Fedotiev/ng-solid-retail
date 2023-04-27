using Microsoft.AspNetCore.Mvc;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;
using Sr.Api.ProductsCatalogue.Application.CreateProduct;
using MediatR;
using MapsterMapper;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.SolidRetailApi.Controllers
{
  [ApiController]
  [Route("api/v1/catalogue")]
  [Produces("application/json")]
  public class ProductsCatalogueController : ControllerBase
  {
    private readonly IMediator _mediator;
    private readonly IMapper _mapper;

    public ProductsCatalogueController(IMediator mediator, IMapper mapper)
    {
      _mediator = mediator;
      _mapper = mapper;
    }

    [HttpPost]
    [ProducesResponseType(typeof(CreateProductResponse), StatusCodes.Status201Created)]
    public async Task<IActionResult> CreateProduct(CreateProductRequest request)
    {
      var createProductResult = await _mediator.Send(
        request switch
        {
          CreateShoesRequest createShoesRequest => _mapper.Map<CreateProductCommand>(createShoesRequest),
          CreateClothingRequest createClothingRequest => _mapper.Map<CreateProductCommand>(createClothingRequest),
          CreateBookRequest createBookRequest => _mapper.Map<CreateProductCommand>(createBookRequest),
          _ => throw new NotImplementedException()
        }
      );

      CreateProductResponse response = createProductResult switch
      {
        Shoes shoes => _mapper.Map<CreateShoesResponse>(shoes),
        Clothing clothing => _mapper.Map<CreateClothingResponse>(clothing),
        Book book => _mapper.Map<CreateBookResponse>(book),
        _ => throw new NotImplementedException()
      };

      return Ok(response);
    }
  }
}
