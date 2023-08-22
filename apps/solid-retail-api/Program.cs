using Microsoft.AspNetCore.Mvc.Infrastructure;
using Sr.Api.ProductsCatalogue.Application;
using Sr.Api.ProductsCatalogue.Infrastructure;
using Sr.SolidRetailApi;
using Sr.SolidRetailApi.Common.Errors;
using Sr.SolidRetailApi.Common.Security;
using Sr.SolidRetailApi.Common.Swagger;

var builder = WebApplication.CreateBuilder(args);

builder.Services
  .AddPresentation()
  .AddProductsCatalogueApplication()
  .AddProductsCatalogueInfrastructure(builder.Configuration);


builder.Services.AddSingleton<ProblemDetailsFactory, SolidRetailProblemDetailsFactory>();

var app = builder.Build();

app.ConfigureWebAppCors();

app.UseExceptionHandler("/error");
app.UseSwaggerConfiguration();
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

