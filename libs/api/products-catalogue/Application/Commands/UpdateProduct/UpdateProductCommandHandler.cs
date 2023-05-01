using FluentResults;
using MediatR;
using Sr.Api.ProductsCatalogue.Application.Persistance;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application.Commands.UpdateProduct
{
  public record UpdateProductCommandHandler : IRequestHandler<UpdateProductCommand, Result<Product>>
  {
    private readonly IProductsCatalogueRepository _productsCatalogueRepository;

    public UpdateProductCommandHandler(IProductsCatalogueRepository productsCatalogueRepository)
    {
      _productsCatalogueRepository = productsCatalogueRepository;
    }

    public async Task<Result<Product>> Handle(UpdateProductCommand request, CancellationToken cancellationToken)
    {
      return await _productsCatalogueRepository.UpdateProductAsync(request);
    }
  }
}
