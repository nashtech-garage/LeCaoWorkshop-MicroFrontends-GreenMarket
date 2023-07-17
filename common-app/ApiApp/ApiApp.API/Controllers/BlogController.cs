using ApiApp.Infratructure.Entities;
using ApiApp.Infratructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly IBlogService _blogService;

    public BlogController(IBlogService blogService)
    {
        _blogService = blogService;
    }

    [HttpGet()]
    public async Task<BlogEntity> GetBlogAsync(int id)
    {
        return await _blogService.GetBlogAsync(id);
    }

    [HttpGet("all")]
    public async Task<IEnumerable<BlogEntity>> GetAllBlogsAsync()
    {
        return await _blogService.GetAllBlogsAsync();
    }
}
