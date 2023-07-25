using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Reflection;
using System;
using Order.Data;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using IdentityServer4.AccessTokenValidation;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;

namespace Order.Core
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            CurrentEnvironment = env;
        }

        public IConfiguration Configuration { get; }

        private IWebHostEnvironment CurrentEnvironment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            var connectionString = Configuration.GetConnectionString("OrderDatabase");
            var migrationAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            if (CurrentEnvironment.IsDevelopment())
            {
                services.AddDbContext<OrderDbContext>(options =>
                    options.UseSqlite(connectionString, x => x.MigrationsAssembly("Order.SqliteMigrations")));
            }
            else
            {
                services.AddDbContext<OrderDbContext>(options =>
                    options.UseMySql(connectionString, new MySqlServerVersion(new Version(5, 7, build: 22)), x =>
                    x.MigrationsAssembly("Order.MySqlMigrations")
                        .EnableRetryOnFailure(
                            maxRetryCount: 5,
                            maxRetryDelay: System.TimeSpan.FromSeconds(30),
                            errorNumbersToAdd: null
                    )));
            }

            services
                .AddMvcCore(options =>
                {
                    options.Filters.Add(new AuthorizeFilter());
                })
                .AddAuthorization();

            var IdentityApiUrl = Configuration.GetValue<string>("IdentityApiUrl");

            services.AddAuthentication(IdentityServerAuthenticationDefaults.AuthenticationScheme)
                    .AddIdentityServerAuthentication(options =>
                    {
                        options.Authority = IdentityApiUrl;
                        options.RequireHttpsMetadata = false;

                        options.ApiName = "orderAPI";
                        options.ApiSecret = "secret";
                        options.LegacyAudienceValidation = true;
                    });

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                     builder => builder
                    .WithOrigins(Configuration.GetSection("Cors").Get<string[]>())
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });

            services.AddSwaggerGen();

            services.AddMvc(options =>
            {
                options.SuppressAsyncSuffixInActionNames = false;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, OrderDbContext context)
        // public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            context.Database.Migrate();

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}