using ApiApp.Infratructure.Entities;
using ApiApp.Infratructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogController : ControllerBase
{
    private readonly IBlogService _blogService;

    private readonly IConfiguration _configuration;

    public BlogController(IBlogService blogService, IConfiguration configuration)
    {
        _blogService = blogService;
        _configuration = configuration;
    }

    [HttpGet()]
    public async Task<BlogEntity> GetBlogAsync(int id)
    {
        return await _blogService.GetBlogAsync(id);
    }

    [HttpGet("all")]
    public async Task<IEnumerable<BlogEntity>> GetAllBlogsAsync()
    {
        var imageServerUrl = _configuration.GetSection("ImageServerUrl").Value;
        return (await _blogService.GetAllBlogsAsync()).Select(x =>
        {
            x.Images_Url = $"{imageServerUrl}/{x.Images_Url}";
            return x;
        });
    }
}
