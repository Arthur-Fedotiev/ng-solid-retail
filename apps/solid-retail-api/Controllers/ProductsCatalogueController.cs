using Microsoft.AspNetCore.Mvc;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;
using Sr.Api.ProductsCatalogue.Application.CreateProduct.Commands;
using MediatR;
using MapsterMapper;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;
using Sr.Api.ProductsCatalogue.Contracts.Common;
using Sr.Api.ProductsCatalogue.Application.GetProducts.Queries;
using FluentResults;
using Sr.Api.ProductsCatalogue.Application.Common;

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

    [HttpGet]
    [ProducesResponseType(typeof(PaginatedItemsResponse<ProductResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetProducts(int? pageSize, int? pageIndex, string? ids)
    {
      var result = await _mediator.Send(new GetProductsQuery(pageSize, pageIndex, ids));

      return ResponseFor<PaginatedItemsResponse<Product>, PaginatedItemsResponse<ProductResponse>>(result);
    }

    [HttpPost]
    [ProducesResponseType(typeof(ProductResponse), StatusCodes.Status201Created)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> CreateProduct(CreateProductRequest request)
    {
      var createProductCommand = _mapper.Map<CreateProductRequest, CreateProductCommand>(request);
      var createProductResult = await _mediator.Send(createProductCommand);

      return ResponseFor<Product, ProductResponse>(createProductResult);
    }

    private IActionResult ResponseFor<TFrom, TTo>(Result<TFrom> result)
    {
      return result.IsSuccess
        ? Ok(_mapper.Map<TFrom, TTo>(result.Value))
        : Problem(result.Errors);
    }

  }
}
