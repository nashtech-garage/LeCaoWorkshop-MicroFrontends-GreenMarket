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
    private readonly IConfiguration _configuration;

    public ProductController(IProductService productService, ILogger<ProductController> logger, IConfiguration configuration)
    {
        _logger = logger;
        _productService = productService;
        _configuration = configuration;
    }

    [HttpGet()]
    public async Task<ProductEntity> GetProductAsync(int id)
    {
        var imageServerUrl = _configuration.GetSection("ImageServerUrl").Value;
        var result = await _productService.GetProductAsync(id);
        result.Images_Urls_Array = result.Images_Urls?.Split(",")
                    .Select(y =>
                    {
                        y = $"{imageServerUrl}/" + y.Replace("[", "")
                                                    .Replace("]", "")
                                                    .Replace("\n", "")
                                                    .Replace("\t", "")
                                                    .Replace("\"", "")
                                                    .Trim();
                        return y;
                    }).ToList();

        return result;
    }

    [HttpGet("all")]
    public async Task<IEnumerable<ProductEntity>> GetAllProductsAsync()
    {
        var imageServerUrl = _configuration.GetSection("ImageServerUrl").Value;
        return (await _productService.GetAllProductsAsync()).Select(x =>
        {
            x.Main_Image_Url = $"{imageServerUrl}/{x.Main_Image_Url}";
            x.Images_Urls_Array = new List<string>();
            if (!string.IsNullOrEmpty(x.Images_Urls))
            {
                x.Images_Urls_Array = x.Images_Urls?.Split(",")
                    .Select(y =>
                    {
                        y = $"{imageServerUrl}/" + y.Replace("[", "")
                                                   .Replace("]", "")
                                                   .Replace("\n", "")
                                                   .Replace("\t", "")
                                                   .Replace("\"", "")
                                                   .Trim();
                        return y;
                    }).ToList();
            }
            return x;
        });
    }

    // [HttpPost("add")]
    // public async Task<ActionResult> AddProductsAsync([FromBody] AddProductRequest request)
    // {
    //     await _productService.AddProductAsync(new()
    //     {
    //         Category_Id = 2,
    //         Created_By = "Phuc Hoang",
    //         Name = request.Name,
    //         Price = request.Price,
    //         Description = request.Description,
    //         Description_Short = request.DescriptionShort,
    //         Discount = request.Discount,
    //         Availability = request.Availability,
    //         //Color = request.Color,
    //     });

    //     return Ok();
    // }

    // [HttpPut("{id}/update")]
    // public async Task<ActionResult> UpdateProductsAsync(int id, [FromBody] UpdateProductRequest request)
    // {
    //     var entity = await _productService.GetProductAsync(id);

    //     entity.Name = request.Name;
    //     entity.Price = request.Price;
    //     entity.Description = request.Description;
    //     entity.Description_Short = request.DescriptionShort;
    //     entity.Discount = request.Discount;
    //     entity.Availability = request.Availability;

    //     await _productService.UpdateProductAsync(entity);

    //     return Ok();
    // }
}
