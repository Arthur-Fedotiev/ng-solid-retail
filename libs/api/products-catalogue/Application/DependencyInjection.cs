using System.Reflection;
using FluentResults;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Sr.Api.ProductsCatalogue.Application.Common;
using Sr.Api.ProductsCatalogue.Application.CreateProduct.Commands;
using Sr.Api.ProductsCatalogue.Application.GetProducts.Queries;
using Sr.Api.ProductsCatalogue.Domain.Product.AggregateRoot;

namespace Sr.Api.ProductsCatalogue.Application
{
  public static class DependencyInjection
  {
    public static IServiceCollection AddProductsCatalogueApplication(this IServiceCollection services)
    {
      _ = services.AddMediatR(typeof(MediatREntrypoint).Assembly);
      _ = services.AddScoped<IPipelineBehavior<CreateProductCommand, Result<Product>>, CreateProductCommandValidateBehavior>();
      _ = services.AddScoped<IPipelineBehavior<GetProductsQuery, Result<PaginatedItemsResponse<Product>>>, GetProductsQueryValidateBehavior>();
      _ = services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());

      return services;
    }
  }
}
