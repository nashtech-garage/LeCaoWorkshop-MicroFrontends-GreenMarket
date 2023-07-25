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
            builder.Entity<CategoryEntity>().HasKey(op => op.id);
        }

        public DbSet<CategoryEntity> Categories { get; set; }
    }
}