using FluentResults;
using MapsterMapper;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Sr.Api.ProductsCatalogue.Application.Commands.CreateProduct;
using Sr.Api.ProductsCatalogue.Application.Commands.DeleteProduct;
using Sr.Api.ProductsCatalogue.Application.Commands.UpdateProduct;
using Sr.Api.ProductsCatalogue.Application.Common;
using Sr.Api.ProductsCatalogue.Application.GetProducts.Queries;
using Sr.Api.ProductsCatalogue.Application.Queries.GetRetailersByCategory;
using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Contracts.Common;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;
using Sr.Api.ProductsCatalogue.Contracts.UpdateProduct;
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

    [HttpGet]
    [ProducesResponseType(typeof(PaginatedItemsResponse<ProductResponse>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetProducts(int? pageSize, int? pageIndex, string? ids, string? categories)
    {
      var result = await _mediator.Send(new GetProductsQuery(pageSize, pageIndex, ids, categories));

      return ResponseFor<PaginatedItemsResponse<Product>, PaginatedItemsResponse<ProductResponse>>(result);
    }

    [HttpGet("retailers/{category}")]
    [ProducesResponseType(typeof(IReadOnlyList<ProductRetailer>), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status500InternalServerError)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> GetRetailersByCategory(ProductCategory category)
    {
      return ResponseFor<IReadOnlyList<ProductRetailer>, IReadOnlyList<ProductRetailer>>(await _mediator.Send(new GetRetailersByCategoryQuery(category)));
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

    [HttpPut]
    [ProducesResponseType(typeof(ProductResponse), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> UpdateProduct(UpdateProductRequest request)
    {
      var updateProductCommand = _mapper.Map<UpdateProductRequest, UpdateProductCommand>(request);

      var updateProductResult = await _mediator.Send(updateProductCommand);

      return ResponseFor<Product, ProductResponse>(updateProductResult);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(typeof(Guid), StatusCodes.Status200OK)]
    [ProducesResponseType(typeof(ProblemDetails), StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> DeleteProduct(Guid id)
    {
      var deleteProductResult = await _mediator.Send(new DeleteProductCommand(id));

      return ResponseFor<Guid, Guid>(deleteProductResult);
    }



    private IActionResult ResponseFor<TFrom, TTo>(Result<TFrom> result)
    {
      return result.IsSuccess
        ? Ok(_mapper.Map<TFrom, TTo>(result.Value))
        : Problem(result.Errors);
    }
  }
}
