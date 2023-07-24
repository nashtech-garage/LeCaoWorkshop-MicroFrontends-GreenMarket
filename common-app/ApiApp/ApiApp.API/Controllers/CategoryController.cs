using ApiApp.Infratructure.Entities;
using ApiApp.Infratructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;
    private readonly IConfiguration _configuration;

    public CategoryController(ICategoryService categoryService, IConfiguration configuration)
    {
        _categoryService = categoryService;
        _configuration = configuration;
    }

    [HttpGet()]
    public async Task<CategoryEntity> GetCategoryAsync(int id)
    {
        return await _categoryService.GetCategoryAsync(id);
    }

    [HttpGet("all")]
    public async Task<IEnumerable<CategoryEntity>> GetAllCategoriesAsync()
    {
        var imageServerUrl = _configuration.GetSection("ImageServerUrl").Value;
        return (await _categoryService.GetAllCategoriesAsync()).Select(x =>
        {
            x.Image_Url = $"{imageServerUrl}/{x.Image_Url}";
            return x;
        });
    }
}
