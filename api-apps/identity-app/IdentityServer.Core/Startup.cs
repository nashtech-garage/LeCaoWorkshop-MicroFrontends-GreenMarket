using IdentityServer.Core.Data;
using IdentityServer.Core.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Reflection;
using System;
using IdentityServer.Data;
using IdentityServer.Data.Models;
using IdentityServer4.Services;
using IdentityServer.Core.Services;

namespace IdentityServer.Core
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

            var connectionString = Configuration.GetConnectionString("IdentityServerDatabase");
            var migrationAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;

            if (CurrentEnvironment.IsDevelopment())
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlite(connectionString, x => x.MigrationsAssembly("IdentityServer.SqliteMigrations")));
            }
            else
            {
                services.AddDbContext<ApplicationDbContext>(options =>
                    options.UseSqlServer(connectionString, x =>
                        x.MigrationsAssembly("IdentityServer.SqlServerMigrations")
                        .EnableRetryOnFailure(
                            maxRetryCount: 5,
                            maxRetryDelay: System.TimeSpan.FromSeconds(30),
                            errorNumbersToAdd: null
                        )));
            }

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            services.AddIdentityServer()
                .AddAspNetIdentity<ApplicationUser>()
                .AddConfigurationStore(options =>
                {
                    if (CurrentEnvironment.IsDevelopment())
                    {
                        options.ConfigureDbContext = b =>
                            b.UseSqlite(connectionString, x => x.MigrationsAssembly("IdentityServer.SqliteMigrations"));
                    }
                    else
                    {
                        options.ConfigureDbContext = b =>
                            b.UseSqlServer(connectionString, sql => sql.MigrationsAssembly("IdentityServer.SqlServerMigrations"));
                    }
                })
                .AddOperationalStore(options =>
                {
                    if (CurrentEnvironment.IsDevelopment())
                    {
                        options.ConfigureDbContext = b =>
                            b.UseSqlite(connectionString, x => x.MigrationsAssembly("IdentityServer.SqliteMigrations"));
                    }
                    else
                    {
                        options.ConfigureDbContext = b =>
                            b.UseSqlServer(connectionString, sql => sql.MigrationsAssembly("IdentityServer.SqlServerMigrations"));
                    }

                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 30; // interval in seconds
                })
                .AddInMemoryClients(Config.GetClients)
                .AddInMemoryApiScopes(Config.GetScopes)
                .AddInMemoryIdentityResources(Config.GetIdentityResources())
                .AddInMemoryApiResources(Config.GetApiResources)
                .AddJwtBearerClientAuthentication()
                .AddDeveloperSigningCredential();


            services.AddTransient<IProfileService, IdentityClaimsProfileService>();

            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                     builder => builder
                    .WithOrigins(Configuration.GetSection("Cors").Get<string[]>())
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ApplicationDbContext context)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            context.Database.Migrate();

            DatabaseInitializer.PopulateIdentityServer(app);

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseCors("CorsPolicy");

            app.UseIdentityServer();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
}
