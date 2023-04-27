using MediatR;
using Microsoft.Extensions.DependencyInjection;

namespace Sr.Api.ProductsCatalogue.Application;

public static class DependencyInjection
{
  public static IServiceCollection AddApplication(this IServiceCollection services)
  {
    services.AddMediatR(typeof(MediatREntrypoint).Assembly);

    return services;
  }
}
