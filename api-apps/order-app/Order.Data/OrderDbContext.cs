using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Order.Data.Models;

namespace Order.Data
{
    public class OrderDbContext : DbContext
    {
        protected readonly IConfiguration Configuration;

        public OrderDbContext(DbContextOptions<OrderDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<OrderData>().HasKey(op => op.Id);
            builder.Entity<OrderDetailData>().HasKey(op => op.Id);
        }

        public DbSet<OrderData> Orders { get; set; }
        public DbSet<OrderDetailData> OrderDetails { get; set; }
    }
}