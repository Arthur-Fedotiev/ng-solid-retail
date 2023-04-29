using Microsoft.AspNetCore.Mvc;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;
using Sr.Api.ProductsCatalogue.Application.CreateProduct.Commands;
using MediatR;
using MapsterMapper;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.SolidRetailApi.Controllers
{
  [Route("api/v1/catalogue")]
  public class ProductsCatalogueController : ApiController
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
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateProduct(CreateProductRequest request)
    {
      var createProductCommand = _mapper.Map<CreateProductRequest, CreateProductCommand>(request);

      var createProductResult = await _mediator.Send(createProductCommand);

      return createProductResult.IsSuccess
        ? Ok(_mapper.Map<Product, CreateProductResponse>(createProductResult.Value))
        : Problem(createProductResult.Errors);
    }
  }
}
