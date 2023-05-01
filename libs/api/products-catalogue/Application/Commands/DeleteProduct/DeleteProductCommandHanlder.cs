using FluentResults;
using MediatR;
using Sr.Api.ProductsCatalogue.Application.Persistance;
using Sr.Api.ProductsCatalogue.Domain.Product.Errors;

namespace Sr.Api.ProductsCatalogue.Application.Commands.DeleteProduct
{
  public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, Result<Guid>>
  {

    private readonly IProductsCatalogueRepository _productsCatalogueRepository;

    public DeleteProductCommandHandler(IProductsCatalogueRepository productsCatalogueRepository)
    {
      _productsCatalogueRepository = productsCatalogueRepository;
    }

    public async Task<Result<Guid>> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
      var deleteProductResult = await _productsCatalogueRepository.DeleteProductAsync(request.Id);

      return deleteProductResult is not null
        ? deleteProductResult.Id.Value
        : Result.Fail(DomainErrors.Product.ProductNotFound);
    }
  }
}
