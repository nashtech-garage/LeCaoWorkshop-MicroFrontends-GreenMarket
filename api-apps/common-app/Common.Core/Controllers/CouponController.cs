using Microsoft.AspNetCore.Mvc;
using Common.Data.Entities;
using Common.Infrastructure.AsyncGenericRepository;

namespace Common.Core.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CouponController : ControllerBase
    {
        private readonly IAsyncGenericRepository<CouponEntity> asyncGenericRepository = null;

        public CouponController(
            IAsyncGenericRepository<CouponEntity> asyncGenericRepository)
        {
            this.asyncGenericRepository = asyncGenericRepository;
        }

        [HttpGet()]
        public async Task<CouponEntity> GetCouponAsync(string code)
        {
            return await this.asyncGenericRepository.FirstOrDefaultAsync(x => x.code == code);
        }

        [HttpGet("all")]
        public async Task<IEnumerable<CouponEntity>> GetAllCouponsAsync()
        {
            return await this.asyncGenericRepository.GetAllAsync();
        }
    }
}