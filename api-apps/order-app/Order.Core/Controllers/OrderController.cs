using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Order.Data;
using Order.Data.Models;

namespace Order.Core.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class OrderController : ControllerBase
    {
        private readonly OrderDbContext _orderContext;

        public OrderController(OrderDbContext context)
        {
            _orderContext = context ?? throw new ArgumentNullException(nameof(context));
        }

        [HttpGet("{id}")]
        // [Route("{id}")]
        [ProducesResponseType((int)HttpStatusCode.NotFound)]
        [ProducesResponseType((int)HttpStatusCode.BadRequest)]
        [ProducesResponseType(typeof(OrderData), (int)HttpStatusCode.OK)]
        public async Task<ActionResult<OrderData>> ItemByIdAsync(string id)
        {
            if (id.Length == 0)
            {
                return BadRequest();
            }

            var item = await _orderContext.orders.SingleOrDefaultAsync(ci => ci.Id == id);

            return (item != null) ? item : NotFound();
        }

        [HttpPost]
        [ProducesResponseType((int)HttpStatusCode.Created)]
        public async Task<ActionResult> CreateProductAsync([FromBody] OrderDataRequest orderData)
        {
            string id = Guid.NewGuid().ToString();
            var item = new OrderData
            {
                Id = id,
                FirstName = orderData.FirstName,
                LastName = orderData.LastName,
                Country = orderData.Country,
                Address = orderData.Address,
                City = orderData.City,
                State = orderData.State,
                Postcode = orderData.Postcode,
                Phone = orderData.Phone,
                Email = orderData.Email,
                OrderNotes = orderData.OrderNotes
            };

            _orderContext.orders.Add(item);

            await _orderContext.SaveChangesAsync();

            // return Ok();
            // var createdResource = new { id = item.Id };
            // var actionName = nameof(ItemByIdAsync);
            // var routeValues = new { id = createdResource.id };
            // return CreatedAtAction(actionName, routeValues, createdResource);

            return CreatedAtAction(nameof(ItemByIdAsync), new { id = item.Id }, item);
        }
    }
}