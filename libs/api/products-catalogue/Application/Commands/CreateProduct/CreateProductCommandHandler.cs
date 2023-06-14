using FluentResults;
using MediatR;
using Sr.Api.ProductsCatalogue.Application.Persistance;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application.Commands.CreateProduct
{
  public record CreateProductCommandHandler : IRequestHandler<CreateProductCommand, Result<Product>>
  {
    private readonly IProductsCatalogueRepository _productsCatalogueRepository;

    public CreateProductCommandHandler(IProductsCatalogueRepository productsCatalogueRepository)
    {
      _productsCatalogueRepository = productsCatalogueRepository;
    }

    public async Task<Result<Product>> Handle(CreateProductCommand request, CancellationToken cancellationToken)
    {
      return await _productsCatalogueRepository.CreateProductAsync(request);
    }
  }
}
