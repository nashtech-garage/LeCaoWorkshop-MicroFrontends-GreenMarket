public class Order
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public double Total { get; set; }
    public IEnumerable<OrderProduct> OrderProducts { get; set; }
}