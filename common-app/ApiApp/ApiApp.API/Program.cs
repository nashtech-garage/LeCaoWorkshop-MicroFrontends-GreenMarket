using ApiApp.Infratructure.Configs;
using ApiApp.Infratructure.Database;
using ApiApp.Infratructure.Services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c => c.SwaggerDoc("v1", new OpenApiInfo { Title = "Green Market API", Version = "v1" }));

builder.Services.Configure<DatabaseConfig>(builder.Configuration.GetSection(nameof(DatabaseConfig)));

// Add binding service
builder.Services.AddScoped<IDbContext, DbContext>();
builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();
builder.Services.AddScoped<IBlogService, BlogService>();
builder.Services.AddScoped<ICouponService, CouponService>();
builder.Services.AddScoped<IMainHeroBannerService, MainHeroBannerService>();

builder.Services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                     x => x
                        .WithOrigins(builder.Configuration.GetSection("Cors").Get<string[]>())
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    //Create SQLite database
    var databaseConfig = builder.Configuration.GetSection(nameof(DatabaseConfig)).Get<DatabaseConfig>();
    SqLiteDataMigration.InitialSQLiteDatabase(databaseConfig.ConnectionString);

    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSwagger();

app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Green Market API V1"));

app.UseHttpsRedirection();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.MapControllers();

app.Run();
