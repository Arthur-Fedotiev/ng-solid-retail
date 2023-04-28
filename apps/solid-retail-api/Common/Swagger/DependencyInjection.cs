using Microsoft.OpenApi.Models;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;

namespace Sr.SolidRetailApi.Common.Swagger
{
  public static class DependencyInjection
  {
    public static IServiceCollection AddSwaggerGenConfiguration(this IServiceCollection services)
    {
      _ = services.AddSwaggerGen(c =>
        {
          c.SwaggerDoc("v1", new OpenApiInfo { Title = "SOLID Retail API", Version = "v1" });
          c.UseAllOfToExtendReferenceSchemas();
          c.UseAllOfForInheritance();
          c.UseOneOfForPolymorphism();
          c.SelectDiscriminatorNameUsing(type => type.Name switch
              {
                nameof(CreateProductRequest) => nameof(CreateProductRequest.Category),
                _ => null
              });
        });

      return services;
    }

    public static IApplicationBuilder UseSwaggerConfiguration(this IApplicationBuilder app)
    {
      _ = app.UseSwagger();
      _ = app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Solid Retail API v1"));

      return app;
    }
  }
}
