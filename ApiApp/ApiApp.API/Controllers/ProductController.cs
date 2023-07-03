using ApiApp.Infratructure.Entities;
using ApiApp.Infratructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace api_apps.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ProductController : ControllerBase
{
    private readonly ILogger<ProductController> _logger;
    private IProductService _productService;

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

    [HttpGet("/all")]
    public async Task<IEnumerable<ProductEntity>> GetAllProductsAsync()
    {
        return await _productService.GetAllProductsAsync();
    }

    [HttpPost()]
    public async Task<ActionResult> AddProductsAsync()
    {
        await _productService.AddProductAsync(new ProductEntity());
        return Ok();
    }

    [HttpPut("{id}/update")]
    public async Task<ActionResult> UpdateProductsAsync(int id)
    {
        await _productService.UpdateProductAsync(new ProductEntity());
        return Ok();
    }
}
