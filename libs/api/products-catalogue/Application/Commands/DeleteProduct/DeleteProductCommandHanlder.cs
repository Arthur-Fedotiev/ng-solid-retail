using FluentResults;
using MediatR;
using Sr.Api.ProductsCatalogue.Application.Persistance;

namespace Sr.Api.ProductsCatalogue.Application.Commands.DeleteProduct
{
  public class DeleteProductCommandHandler : IRequestHandler<DeleteProductCommand, Result>
  {

    private readonly IProductsCatalogueRepository _productsCatalogueRepository;

    public DeleteProductCommandHandler(IProductsCatalogueRepository productsCatalogueRepository)
    {
      _productsCatalogueRepository = productsCatalogueRepository;
    }

    public async Task<Result> Handle(DeleteProductCommand request, CancellationToken cancellationToken)
    {
      var result = await _productsCatalogueRepository.DeleteProductAsync(request.Id);

      return result;
    }
  }
}
