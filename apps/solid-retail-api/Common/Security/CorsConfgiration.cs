namespace Sr.SolidRetailApi.Common.Security
{
  public static class CorsConfiguration
  {
    public static void ConfigureWebAppCors(this WebApplication app)
    {
      if (app.Environment.IsDevelopment())
      {
        app.UseCors(builder =>
        {
          _ = builder.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
      }
      else
      {
        app.UseCors(builder =>
        {
          _ = builder.WithOrigins("https://ng-solid-retail.firebaseapp.com/")
            .AllowAnyMethod()
            .AllowAnyHeader();
        });
      }
    }
  }
}
