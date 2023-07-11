public class UpsertOrderContract
{
    public Guid UserId { get; set; }
    public IEnumerable<OrderProductContract> Products { get; set; }
}
