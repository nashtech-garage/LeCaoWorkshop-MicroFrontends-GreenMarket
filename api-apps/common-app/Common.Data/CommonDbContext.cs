using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Common.Data.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Common.Data
{
    public class CommonDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public CommonDbContext(DbContextOptions<CommonDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<CategoryEntity>().HasKey(x => x.id);
            builder.Entity<ProductEntity>().HasKey(x => x.id);
            builder.Entity<BlogEntity>().HasKey(x => x.id);
            builder.Entity<MainHeroBannerEntity>().HasKey(x => x.Title);
            builder.Entity<CouponEntity>().HasKey(x => x.code);
        }

        public DbSet<CategoryEntity> categories { get; set; }
        public DbSet<ProductEntity> products { get; set; }
        public DbSet<BlogEntity> blogs { get; set; }
        public DbSet<MainHeroBannerEntity> mainHeroBannerEntity { get; set; }
        public DbSet<CouponEntity> coupons { get; set; }
    }
}