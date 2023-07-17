using ApiApp.Infratructure.Entities;

namespace ApiApp.Infratructure.Services;

public interface ICouponService
{
    Task<CouponEntity> GetCouponAsync(int id);
    Task<IEnumerable<CouponEntity>> GetAllCouponsAsync();
    Task AddCouponAsync(CouponEntity entity);
    Task UpdateCouponAsync(CouponEntity entity);
    Task DeleteCouponAsync(CouponEntity entity);
}
