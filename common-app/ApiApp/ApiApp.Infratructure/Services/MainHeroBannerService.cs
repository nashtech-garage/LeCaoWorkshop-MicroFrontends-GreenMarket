using ApiApp.Infratructure.Database;
using ApiApp.Infratructure.Entities;
using Dapper.Contrib.Extensions;

namespace ApiApp.Infratructure.Services;

public class MainHeroBannerService : IMainHeroBannerService
{
    private readonly IDbContext _dbContext;
    public MainHeroBannerService(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<MainHeroBannerEntity> GetMainHeroBannerAsync(int id)
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        return await connection.GetAsync<MainHeroBannerEntity>(id);
    }

    public async Task<IEnumerable<MainHeroBannerEntity>> GetAllMainHeroBannersAsync()
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        return await connection.GetAllAsync<MainHeroBannerEntity>();
    }

    public async Task AddMainHeroBannerAsync(MainHeroBannerEntity entity)
    {
        entity.Created_Date = DateTime.UtcNow;
        entity.Modified_Date = DateTime.UtcNow;
        
        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.InsertAsync<MainHeroBannerEntity>(entity); 
    }

    public async Task UpdateMainHeroBannerAsync(MainHeroBannerEntity entity)
    {
        entity.Modified_Date = DateTime.UtcNow;

        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.UpdateAsync<MainHeroBannerEntity>(entity);
    }

    public async Task DeleteMainHeroBannerAsync(MainHeroBannerEntity entity)
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.DeleteAsync<MainHeroBannerEntity>(entity);
    }
}
