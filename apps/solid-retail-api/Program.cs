using Sr.SolidRetailApi.Common;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCOntrollersConfiguration();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGenConfiguration();

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
