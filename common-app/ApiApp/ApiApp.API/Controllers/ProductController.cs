using ApiApp.API.Models;
using ApiApp.Infratructure.Entities;
using ApiApp.Infratructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private readonly IProductService _productService;

    public ProductController(IProductService productService, ILogger<ProductController> logger)
    {
        _logger = logger;
        _productService = productService;
    }

    [HttpGet()]
    public async Task<ProductEntity> GetProductAsync(int id)
    {
        return await _productService.GetProductAsync(id);
    }

    [HttpGet("all")]
    public async Task<IEnumerable<ProductEntity>> GetAllProductsAsync()
    {
        return await _productService.GetAllProductsAsync();
    }

    [HttpPost("add")]
    public async Task<ActionResult> AddProductsAsync([FromBody] AddProductRequest request)
    {
        await _productService.AddProductAsync(new () {
            Category_Id = 2,
            Created_By = "Phuc Hoang",
            Name = request.Name,
            Price = request.Price,
            Description = request.Description,
            Description_Short = request.DescriptionShort,
            Discount = request.Discount,
            Availability = request.Availability,
            //Color = request.Color,
        });

        return Ok();
    }

    [HttpPut("{id}/update")]
    public async Task<ActionResult> UpdateProductsAsync(int id, [FromBody] UpdateProductRequest request)
    {
        var entity = await _productService.GetProductAsync(id);

        entity.Name = request.Name;
        entity.Price = request.Price;
        entity.Description = request.Description;
        entity.Description_Short = request.DescriptionShort;
        entity.Discount = request.Discount;
        entity.Availability = request.Availability;

        await _productService.UpdateProductAsync(entity);

        return Ok();
    }
}
