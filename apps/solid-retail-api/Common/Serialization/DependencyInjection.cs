using System.Text.Json.Serialization;
using JsonSubTypes;
using Microsoft.AspNetCore.Mvc;
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
          .AddNewtonsoftJson(SetupNewtonsoftJson)
          .AddJsonOptions(SetupJsonOptions);

      return services;
    }

    private static void SetupNewtonsoftJson(MvcNewtonsoftJsonOptions options)
    {
      options.SerializerSettings.Converters.Add(new StringEnumConverter());
      AddCreateProductRequestConverter(options);
      AddUpdateProductRequestConverter(options);
    }

    private static void SetupJsonOptions(JsonOptions options)
    {
      options.JsonSerializerOptions.PropertyNamingPolicy = null;
      options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    }

    private static void AddCreateProductRequestConverter(MvcNewtonsoftJsonOptions options)
    {
      options.SerializerSettings.Converters
        .Add(JsonSubtypesConverterBuilder.Of(typeof(CreateProductRequest), nameof(CreateProductRequest.Category))
          .RegisterSubtype(typeof(CreateBookRequest), ProductCategory.Books)
          .RegisterSubtype(typeof(CreateShoesRequest), ProductCategory.Shoes)
          .RegisterSubtype(typeof(CreateClothingRequest), ProductCategory.Clothing)
          .SerializeDiscriminatorProperty()
          .Build());
    }

    private static void AddUpdateProductRequestConverter(MvcNewtonsoftJsonOptions options)
    {
      options.SerializerSettings.Converters
        .Add(JsonSubtypesConverterBuilder.Of(typeof(UpdateProductRequest), nameof(UpdateProductRequest.Category))
          .RegisterSubtype(typeof(UpdateBookRequest), ProductCategory.Books)
          .RegisterSubtype(typeof(UpdateShoesRequest), ProductCategory.Shoes)
          .RegisterSubtype(typeof(UpdateClothingRequest), ProductCategory.Clothing)
          .SerializeDiscriminatorProperty()
          .Build());
    }
  }
}
