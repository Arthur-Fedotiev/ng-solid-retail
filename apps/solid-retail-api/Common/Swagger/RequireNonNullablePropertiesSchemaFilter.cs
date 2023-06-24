using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Sr.SolidRetailApi.Common.Swagger
{
  public class RequireNonNullablePropertiesSchemaFilter : ISchemaFilter
  {
    public void Apply(OpenApiSchema schema, SchemaFilterContext context)
    {
      var additionalRequiredProps = schema.Properties
          .Where(x => !x.Value.Nullable && !schema.Required.Contains(x.Key))
          .Select(x => x.Key);

      foreach (var propKey in additionalRequiredProps)
      {
        _ = schema.Required.Add(propKey);
      }
    }
  }

}
