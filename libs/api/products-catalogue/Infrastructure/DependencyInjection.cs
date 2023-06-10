using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Sr.Api.ProductsCatalogue.Application.Persistance;
using Sr.Api.ProductsCatalogue.Infrastructure.Repositories;

namespace Sr.Api.ProductsCatalogue.Infrastructure
{
  public static class DependencyInjection
  {
    public static void AddProductsCatalogueInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
      var connectionString = configuration.GetConnectionString("AZURE_SQL_CONNECTIONSTRING");

      _ = services.AddDbContext<ProductsCatalogueDbContext>(
          options => options
            .EnableSensitiveDataLogging()
            .UseSqlServer(connectionString)
            .LogTo(Console.WriteLine, new[] { DbLoggerCategory.Database.Command.Name }, LogLevel.Information));

      _ = services.AddScoped<IProductsCatalogueRepository, SqlServerProductsRepository>();
      // _ = services.AddScoped<IProductsCatalogueRepository, InMemoryProductsCatalogueRepository>();


    }
  }
}
