using ApiApp.Infratructure.Entities;
using ApiApp.Infratructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MainHeroBannerController : ControllerBase
{
    private readonly IMainHeroBannerService _mainHeroBannerService;

    private readonly IConfiguration _configuration;

    public MainHeroBannerController(IMainHeroBannerService mainHeroBannerService, IConfiguration configuration)
    {
        _mainHeroBannerService = mainHeroBannerService;
        _configuration = configuration;
    }

    [HttpGet()]
    public async Task<MainHeroBannerEntity> GetMainHeroBannerAsync(int id)
    {
        return await _mainHeroBannerService.GetMainHeroBannerAsync(id);
    }

    [HttpGet("all")]
    public async Task<IEnumerable<MainHeroBannerEntity>> GetAllMainHeroBannersAsync()
    {
        var imageServerUrl = _configuration.GetSection("ImageServerUrl").Value;
        return (await _mainHeroBannerService.GetAllMainHeroBannersAsync()).Select(x =>
        {
            x.Image_Link = $"{imageServerUrl}/{x.Image_Link}";
            return x;
        });
    }
}
