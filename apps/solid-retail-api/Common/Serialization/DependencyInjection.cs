using System.Text.Json.Serialization;
using JsonSubTypes;
using Newtonsoft.Json.Converters;
using Sr.Api.ProductsCatalogue.Common;
using Sr.Api.ProductsCatalogue.Contracts.CreateProduct;
using Sr.Api.ProductsCatalogue.Contracts.UpdateProduct;

namespace Sr.SolidRetailApi.Common.Serialization
{
  public static class ControllersConfiguration
  {
    public static IServiceCollection AddControllersConfiguration(this IServiceCollection services)
    {
      _ = services.AddControllers()
          .AddNewtonsoftJson(options =>
          {
            options.SerializerSettings.Converters.Add(new StringEnumConverter());
            options
              .SerializerSettings.Converters
                .Add(JsonSubtypesConverterBuilder.Of(typeof(CreateProductRequest), nameof(CreateProductRequest.Category))
                  .RegisterSubtype(typeof(CreateBookRequest), ProductCategory.Books)
                  .RegisterSubtype(typeof(CreateShoesRequest), ProductCategory.Shoes)
                  .RegisterSubtype(typeof(CreateClothingRequest), ProductCategory.Clothing)
                  .SerializeDiscriminatorProperty()
                  .Build());
            options.SerializerSettings.Converters
                .Add(JsonSubtypesConverterBuilder.Of(typeof(UpdateProductRequest), nameof(UpdateProductRequest.Category))
                  .RegisterSubtype(typeof(UpdateBookRequest), ProductCategory.Books)
                  .RegisterSubtype(typeof(UpdateShoesRequest), ProductCategory.Shoes)
                  .RegisterSubtype(typeof(UpdateClothingRequest), ProductCategory.Clothing)
                  .SerializeDiscriminatorProperty()
                  .Build());
          })
          .AddJsonOptions(options =>
          {
            options.JsonSerializerOptions.PropertyNamingPolicy = null;
            options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
          });

      return services;
    }
  }
}
