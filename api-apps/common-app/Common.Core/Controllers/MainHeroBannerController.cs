using Microsoft.AspNetCore.Mvc;
using Common.Data.Entities;
using Common.Infrastructure.AsyncGenericRepository;

namespace Common.Core.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class MainHeroBannerController : ControllerBase
    {
        private readonly IAsyncGenericRepository<MainHeroBannerEntity> asyncGenericRepository = null;
        private readonly IConfiguration configuration;

        public MainHeroBannerController(
            IAsyncGenericRepository<MainHeroBannerEntity> asyncGenericRepository,
            IConfiguration configuration)
        {
            this.asyncGenericRepository = asyncGenericRepository;
            this.configuration = configuration;
        }

        [HttpGet()]
        public async Task<MainHeroBannerEntity> GetMainHeroBannerAsync(string title)
        {
            var imageServerUrl = this.configuration.GetSection("ImageServerUrl").Value;
            var result = await this.asyncGenericRepository.FirstOrDefaultAsync(x => x.Title == title);
            result.ImageLink = $"{imageServerUrl}/{result.ImageLink}";
            return result;
        }

        [HttpGet("all")]
        public async Task<IEnumerable<MainHeroBannerEntity>> GetAllMainHeroBannersAsync()
        {
            var imageServerUrl = this.configuration.GetSection("ImageServerUrl").Value;
            return (await this.asyncGenericRepository.GetAllAsync()).Select(x =>
            {
                x.ImageLink = $"{imageServerUrl}/{x.ImageLink}";
                return x;
            });
        }
    }
}