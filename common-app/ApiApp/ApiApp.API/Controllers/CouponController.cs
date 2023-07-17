using ApiApp.Infratructure.Entities;
using ApiApp.Infratructure.Services;
using Microsoft.AspNetCore.Mvc;

namespace ApiApp.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CouponController : ControllerBase
{
    private readonly ICouponService _couponService;

    public CouponController(ICouponService couponService)
    {
        _couponService = couponService;
    }

    [HttpGet()]
    public async Task<CouponEntity> GetCouponAsync(int id)
    {
        return await _couponService.GetCouponAsync(id);
    }

    [HttpGet("all")]
    public async Task<IEnumerable<CouponEntity>> GetAllCouponsAsync()
    {
        return await _couponService.GetAllCouponsAsync();
    }
}
