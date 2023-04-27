using Sr.Api.ProductsCatalogue.Application;
using Sr.Api.ProductsCatalogue.Infrastructure;
using Sr.SolidRetailApi.Common;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCOntrollersConfiguration();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGenConfiguration();

builder.Services.AddApplication();
builder.Services.AddProductsCatalogueInfrastructure();

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
