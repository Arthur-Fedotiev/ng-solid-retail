using Sr.Api.ProductsCatalogue.Application;
using Sr.Api.ProductsCatalogue.Infrastructure;
using Sr.SolidRetailApi;
using Sr.SolidRetailApi.Common.Swagger;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddPresentation()
  .AddProductsCatalogueApplication()
  .AddProductsCatalogueInfrastructure();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  _ = app.UseCors(builder =>
  {
    _ = builder.AllowAnyOrigin()
      .AllowAnyMethod()
      .AllowAnyHeader();
  });
}

app.UseSwaggerConfiguration();
app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
