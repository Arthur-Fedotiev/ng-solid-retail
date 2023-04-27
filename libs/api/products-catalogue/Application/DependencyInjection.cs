using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Sr.Api.ProductsCatalogue.Application
{
  public static class DependencyInjection
  {
    public static IServiceCollection AddProductsCatalogueApplication(this IServiceCollection services)
    {
      _ = services.AddMediatR(typeof(MediatREntrypoint).Assembly);

      return services;
    }
  }
}