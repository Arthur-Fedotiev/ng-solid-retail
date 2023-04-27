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
      var createProductResult = await _mediator.Send(_mapper.Map<CreateProductCommand>(request));

      return Ok(_mapper.Map<Product, CreateProductResponse>(createProductResult));
    }
  }
}
