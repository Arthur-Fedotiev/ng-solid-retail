using System.Reflection;
using FluentValidation;
using MediatR;
using Microsoft.Extensions.DependencyInjection;
using Sr.Api.ProductsCatalogue.Application.Common;

namespace Sr.Api.ProductsCatalogue.Application
{
  public static class DependencyInjection
  {
    public static IServiceCollection AddProductsCatalogueApplication(this IServiceCollection services)
    {
      _ = services.AddMediatR(typeof(MediatREntrypoint).Assembly);
      _ = services.AddValidatorsFromAssembly(Assembly.GetExecutingAssembly());
      _ = services.AddScoped(
        typeof(IPipelineBehavior<,>),
        typeof(ValidationBehavior<,>)
      );

      return services;
    }
  }
}
