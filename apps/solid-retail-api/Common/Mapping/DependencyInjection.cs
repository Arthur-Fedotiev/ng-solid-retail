using System.Reflection;
using Mapster;
using MapsterMapper;

namespace Sr.SolidRetailApi.Common.Mapping;

public static class DependencyInjection
{
  public static IServiceCollection AddMapping(this IServiceCollection services)
  {
    TypeAdapterConfig.GlobalSettings.Scan(Assembly.GetExecutingAssembly());

    services.AddSingleton(TypeAdapterConfig.GlobalSettings);
    services.AddScoped<IMapper, ServiceMapper>();

    return services;
  }
}

