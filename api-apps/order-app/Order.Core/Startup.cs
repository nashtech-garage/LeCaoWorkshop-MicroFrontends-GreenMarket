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

            services.AddDbContext<OrderDbContext>(options =>
                options.UseSqlite(connectionString, x => x.MigrationsAssembly(migrationAssembly)));

            if (CurrentEnvironment.IsDevelopment())
            {
                // services.AddDbContext<ApplicationDbContext>(options =>
                //     options.UseSqlite(connectionString, x => x.MigrationsAssembly("IdentityServer.SqliteMigrations")));
            }
            else
            {
                // services.AddDbContext<ApplicationDbContext>(options =>
                //     options.UseSqlServer(connectionString, x => x.MigrationsAssembly("IdentityServer.SqlServerMigrations")));
            }

            // services.AddCors(options => options.AddPolicy("AllowAll", p => p.AllowAnyOrigin()
            //    .AllowAnyMethod()
            //    .AllowAnyHeader()));

            services.AddCors(options =>
            {
                options.AddPolicy(name: "AllowAll",
                                builder =>
                                {
                                    builder.WithOrigins("http://localhost:9000", "http://localhost:4001");
                                });
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
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseSwagger();
            app.UseSwaggerUI();

            context.Database.Migrate();

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseCors("AllowAll");
        }
    }
}