using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace green_market_api.Controllers;

[ApiController]
[Route("[controller]")]
public class OrdersController : ControllerBase
{
    private readonly ILogger<OrdersController> _logger;
    private readonly DataContext _dbContext;

    public OrdersController(ILogger<OrdersController> logger, DataContext dbContext)
    {
        _logger = logger;
        _dbContext = dbContext;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Order>> GetOrderDetailAsync([FromRoute] Guid id)
    {
        var order = await _dbContext.orders
            .Include(o => o.OrderProducts)
            .SingleOrDefaultAsync(o => o.Id.Equals(id));

        if (order is not null)
        {
            return order;
        }
        else
        {
            return NotFound();
        }
    }

    [HttpGet()]
    public async Task<ActionResult<IEnumerable<Order>>> GetAllAsync()
    {
        var orders = await _dbContext.orders.ToListAsync();
        return orders;
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<Order>> UpdateAsync([FromRoute] Guid id, [FromBody] UpsertOrderContract upsertOrder)
    {
        var oldOrder = await _dbContext.orders
            .Include(o => o.OrderProducts)
            .SingleOrDefaultAsync(o => o.Id.Equals(id));

        if (oldOrder is null)
        {
            return NotFound();
        }
        
        oldOrder.OrderProducts = upsertOrder.Products.Select(p => new OrderProduct
        {
            OrderId = oldOrder.Id,
            ProductName = p.ProductName,
            ProductId = p.ProductId,
            Quantity = p.Quantity,
            PriceAtTheTime = p.PriceAtTheTime,
        }).ToList();
        oldOrder.Total = upsertOrder.Products.Select(p => p.PriceAtTheTime * p.Quantity).Sum();

        await _dbContext.SaveChangesAsync();

        return Ok(oldOrder);
    }

    [HttpPost(Name = "CreateOrder")]
    public async Task<ActionResult<Order>> Create([FromBody] UpsertOrderContract upsertOrder)
    {
        var newOrder = new Order
        {
            Total = upsertOrder.Products.Select(p => p.PriceAtTheTime * p.Quantity).Sum(),
            UserId = upsertOrder.UserId,
        };

        newOrder.OrderProducts = upsertOrder.Products.Select(p => new OrderProduct
        {
            OrderId = newOrder.Id,
            ProductName = p.ProductName,
            ProductId = p.ProductId,
            Quantity = p.Quantity,
            PriceAtTheTime = p.PriceAtTheTime,
        }).ToList();

        await _dbContext.orders.AddAsync(newOrder);
        await _dbContext.SaveChangesAsync();

        return Ok(newOrder);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> Delete([FromRoute] Guid id)
    {
        var order = await _dbContext.orders.SingleOrDefaultAsync(o => o.Id.Equals(id));

        if (order is null)
        {
            return NotFound();
        }
        
        _dbContext.Remove(order);
        await _dbContext.SaveChangesAsync();

        return Ok();
    }
}
