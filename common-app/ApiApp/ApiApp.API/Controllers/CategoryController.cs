using ApiApp.Infratructure.Entities;
using ApiApp.Infratructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CategoryController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoryController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet()]
    public async Task<CategoryEntity> GetCategoryAsync(int id)
    {
        return await _categoryService.GetCategoryAsync(id);
    }

    [HttpGet("all")]
    public async Task<IEnumerable<CategoryEntity>> GetAllCategoriesAsync()
    {
        return await _categoryService.GetAllCategoriesAsync();
    }
}
