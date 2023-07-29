using Microsoft.AspNetCore.Mvc;
using Common.Data.Entities;
using Common.Infrastructure.AsyncGenericRepository;

namespace Common.Core.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BlogController : ControllerBase
    {
        private readonly IAsyncGenericRepository<BlogEntity> asyncGenericRepository = null;
        private readonly IConfiguration configuration;

        public BlogController(
            IAsyncGenericRepository<BlogEntity> asyncGenericRepository,
            IConfiguration configuration)
        {
            this.asyncGenericRepository = asyncGenericRepository;
            this.configuration = configuration;
        }

        [HttpGet()]
        public async Task<BlogEntity> GetBlogAsync(int id)
        {
            var imageServerUrl = this.configuration.GetSection("ImageServerUrl").Value;
            var result = await this.asyncGenericRepository.GetByIdAsync(id);
            result.images_url = $"{imageServerUrl}/{result.images_url}";
            return result;
        }

        [HttpGet("all")]
        public async Task<IEnumerable<BlogEntity>> GetAllBlogsAsync()
        {
            var imageServerUrl = this.configuration.GetSection("ImageServerUrl").Value;
            return (await this.asyncGenericRepository.GetAllAsync()).Select(x =>
            {
                x.images_url = $"{imageServerUrl}/{x.images_url}";
                return x;
            });
        }
    }
}