using Microsoft.AspNetCore.Mvc;
using Common.Data.Entities;
using Common.Infrastructure.GenericRepository;
using Microsoft.AspNetCore.Authorization;
using Common.Infrastructure.AsyncGenericRepository;

namespace Common.Core.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        private readonly IGenericRepository<CategoryEntity> genericRepository = null;
        private readonly IAsyncGenericRepository<CategoryEntity> asyncGenericRepository = null;
        private readonly IConfiguration configuration;

        public CategoryController(
            IGenericRepository<CategoryEntity> genericRepository,
            IAsyncGenericRepository<CategoryEntity> asyncGenericRepository,
            IConfiguration configuration)
        {
            this.genericRepository = genericRepository;
            this.asyncGenericRepository = asyncGenericRepository;
            this.configuration = configuration;
        }

        [HttpGet()]
        public async Task<CategoryEntity> GetCategoryAsync(int id)
        {
            CategoryEntity category = await this.asyncGenericRepository.GetByIdAsync(id);
            category.image_url = $"{this.configuration.GetSection("ImageServerUrl").Value}/{category.image_url}";
            return category;
        }

        [HttpGet]
        [Route("all")]
        [AllowAnonymous]
        [ProducesResponseType(typeof(List<CategoryEntity>), 200)]
        public async Task<IEnumerable<CategoryEntity>> GetAllAsync()
        {
            var imageServerUrl = this.configuration.GetSection("ImageServerUrl").Value;
            return (await this.asyncGenericRepository.GetAllAsync()).Select(x =>
            {
                x.image_url = $"{imageServerUrl}/{x.image_url}";
                return x;
            });
        }

        // [HttpGet()]
        // [ProducesResponseType(typeof(List<CategoryEntity>), 200)]
        // public CategoryEntity GetCategory(int id)
        // {
        //     return this.genericRepository.GetById(id);
        // }

        // [HttpGet]
        // [Route("all")]
        // [AllowAnonymous]
        // [ProducesResponseType(typeof(List<CategoryEntity>), 200)]
        // public ActionResult GetAll()
        // {
        //     return Ok(this.genericRepository.GetAll());
        // }
    }
}