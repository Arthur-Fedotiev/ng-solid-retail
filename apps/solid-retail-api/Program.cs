WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services
  .AddControllers()
  .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

WebApplication app = builder.Build();

if (app.Environment.IsDevelopment())
{
  _ = app.UseSwagger();
  _ = app.UseSwaggerUI();

  _ = app.UseCors(builder =>
  {
    _ = builder.AllowAnyOrigin()
      .AllowAnyMethod()
      .AllowAnyHeader();
  });
}

app.UseHttpsRedirection();
app.UseAuthorization();

app.MapControllers();

app.Run();
