using ApiApp.Infratructure.Database;
using ApiApp.Infratructure.Entities;
using Dapper.Contrib.Extensions;

namespace ApiApp.Infratructure.Services;

public class CouponService : ICouponService
{
    private readonly IDbContext _dbContext;
    public CouponService(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<CouponEntity> GetCouponAsync(int id)
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        return await connection.GetAsync<CouponEntity>(id);
    }

    public async Task<IEnumerable<CouponEntity>> GetAllCouponsAsync()
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        return await connection.GetAllAsync<CouponEntity>();
    }

    public async Task AddCouponAsync(CouponEntity entity)
    {
        entity.Created_Date = DateTime.UtcNow;
        entity.Modified_Date = DateTime.UtcNow;
        
        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.InsertAsync<CouponEntity>(entity); 
    }

    public async Task UpdateCouponAsync(CouponEntity entity)
    {
        entity.Modified_Date = DateTime.UtcNow;

        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.UpdateAsync<CouponEntity>(entity);
    }

    public async Task DeleteCouponAsync(CouponEntity entity)
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.DeleteAsync<CouponEntity>(entity);
    }
}
