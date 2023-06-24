using System.Text.RegularExpressions;
using Microsoft.OpenApi.Models;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;

namespace Sr.SolidRetailApi.Common.Swagger
{
  public static partial class DependencyInjection
  {
    public static IServiceCollection AddSwaggerGenConfiguration(this IServiceCollection services)
    {
      _ = services.AddSwaggerGen(options =>
        {
          // adhere to ^[a-zA-Z0-9\.\-_]+$ pattern (could be `, [, [])
          options.CustomSchemaIds(type =>
          {
            var regex = MyRegex();
            return regex.Replace(type.ToString(), "_");
          });
          options.SwaggerDoc("v1", new OpenApiInfo { Title = "SOLID Retail API", Version = "v1" });
          options.UseAllOfToExtendReferenceSchemas();
          options.UseAllOfForInheritance();
          options.UseOneOfForPolymorphism();
          options.SelectDiscriminatorNameUsing(type => type.Name switch
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

    [GeneratedRegex("[^a-zA-Z0-9\\.\\-_]+")]
    private static partial Regex MyRegex();
  }
}
