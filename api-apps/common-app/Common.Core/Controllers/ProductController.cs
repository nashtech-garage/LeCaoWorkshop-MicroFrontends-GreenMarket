using Microsoft.AspNetCore.Mvc;
using Common.Data.Entities;
using Common.Infrastructure.AsyncGenericRepository;

namespace Common.Core.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly IAsyncGenericRepository<ProductEntity> asyncGenericRepository = null;
        private readonly IConfiguration configuration;

        public ProductController(
            IAsyncGenericRepository<ProductEntity> asyncGenericRepository,
            IConfiguration configuration)
        {
            this.asyncGenericRepository = asyncGenericRepository;
            this.configuration = configuration;
        }

        [HttpGet()]
        public async Task<ProductEntity> GetProductAsync(int id)
        {
            var imageServerUrl = this.configuration.GetSection("ImageServerUrl").Value;
            var result = await this.asyncGenericRepository.GetByIdAsync(id);
            result.main_image_url = $"{imageServerUrl}/{result.main_image_url}";
            result.images_urls = result.images_urls_string.Split(",").Select(y => $"{imageServerUrl}/{y}").ToList();
            return result;
        }

        [HttpGet("all")]
        public async Task<IEnumerable<ProductEntity>> GetAllProductsAsync()
        {
            var imageServerUrl = this.configuration.GetSection("ImageServerUrl").Value;
            return (await this.asyncGenericRepository.GetAllAsync()).Select(x =>
            {
                x.main_image_url = $"{imageServerUrl}/{x.main_image_url}";
                x.images_urls = x.images_urls_string.Split(",").Select(y => $"{imageServerUrl}/{y}").ToList();
                return x;
            });
        }
    }
}