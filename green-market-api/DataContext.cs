using Microsoft.EntityFrameworkCore;

public class DataContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public DataContext(DbContextOptions<DataContext> options) : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
     {
        builder.Entity<OrderProduct>().HasKey(op => new {
           op.OrderId, op.ProductId
        });

        builder.Entity<Order>().HasKey(op => op.Id);
     }

    public DbSet<Order> orders { get; set; }
    public DbSet<OrderProduct> orderProducts { get; set; }
}