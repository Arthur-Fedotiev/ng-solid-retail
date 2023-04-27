using System.Text.Json.Serialization;
using JsonSubTypes;
using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;

namespace Sr.SolidRetailApi.Common
{
  public static class ControllersConfiguration
  {
    public static IServiceCollection AddCOntrollersConfiguration(this IServiceCollection services)
    {
      _ = services.AddControllers()
          .AddNewtonsoftJson(options => options
              .SerializerSettings
              .Converters
              .Add(JsonSubtypesConverterBuilder
                  .Of(typeof(CreateProductRequest), nameof(CreateProductRequest.Category))
                  .RegisterSubtype(typeof(CreateBookRequest), ProductCategory.Books)
                  .RegisterSubtype(typeof(CreateShoesRequest), ProductCategory.Shoes)
                  .RegisterSubtype(typeof(CreateClothingRequest), ProductCategory.Clothing)
                  .SerializeDiscriminatorProperty()
                  .Build()))
          .AddJsonOptions(options =>
          {
            options.JsonSerializerOptions.PropertyNamingPolicy = null;
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
          });

      return services;
    }
  }
}
