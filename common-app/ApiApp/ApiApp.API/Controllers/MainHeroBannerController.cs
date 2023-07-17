using ApiApp.Infratructure.Entities;
using ApiApp.Infratructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MainHeroBannerController : ControllerBase
{
    private readonly IMainHeroBannerService _mainHeroBannerService;

    public MainHeroBannerController(IMainHeroBannerService mainHeroBannerService)
    {
        _mainHeroBannerService = mainHeroBannerService;
    }

    [HttpGet()]
    public async Task<MainHeroBannerEntity> GetMainHeroBannerAsync(int id)
    {
        return await _mainHeroBannerService.GetMainHeroBannerAsync(id);
    }

    [HttpGet("all")]
    public async Task<IEnumerable<MainHeroBannerEntity>> GetAllMainHeroBannersAsync()
    {
        return await _mainHeroBannerService.GetAllMainHeroBannersAsync();
    }
}
