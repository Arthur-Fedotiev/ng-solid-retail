using Microsoft.Extensions.DependencyInjection;
using Sr.Api.ProductsCatalogue.Application.Persistance;

namespace Sr.Api.ProductsCatalogue.Infrastructure;

public static class DependencyInjection
{
  public static void AddProductsCatalogueInfrastructure(this IServiceCollection services)
  {
    services.AddScoped<IProductsCatalogueRepository, InMemoryProductsCatalogueRepository>();
  }
}
