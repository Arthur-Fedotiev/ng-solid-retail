using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Sr.Api.ProductsCatalogue.Application.Persistance;
using Sr.Api.ProductsCatalogue.Infrastructure.Repositories;

namespace Sr.Api.ProductsCatalogue.Infrastructure
{
  public static class DependencyInjection
  {
    public static void AddProductsCatalogueInfrastructure(this IServiceCollection services)
    {
      _ = services.AddDbContext<ProductsCatalogueDbContext>(options => options.UseSqlServer());
      _ = services.AddScoped<IProductsCatalogueRepository, SqlServerProductsRepository>();
      // _ = services.AddScoped<IProductsCatalogueRepository, InMemoryProductsCatalogueRepository>();
    }
  }
}
