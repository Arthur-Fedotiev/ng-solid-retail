using Sr.SolidRetailApi.Common.Mapping;
using Sr.SolidRetailApi.Common.Serialization;
using Sr.SolidRetailApi.Common.Swagger;

namespace Sr.SolidRetailApi
{
  public static class DependencyInjection
  {
    public static IServiceCollection AddPresentation(this IServiceCollection services)
    {
      return services.AddControllersConfiguration()
        .AddEndpointsApiExplorer()
        .AddSwaggerGenConfiguration()
        .AddMapping();
    }
  }
}
