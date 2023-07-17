using ApiApp.Infratructure.Database;
using ApiApp.Infratructure.Entities;
using Dapper.Contrib.Extensions;

namespace ApiApp.Infratructure.Services;

public class CategoryService : ICategoryService
{
    private readonly IDbContext _dbContext;
    public CategoryService(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<CategoryEntity> GetCategoryAsync(int id)
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        return await connection.GetAsync<CategoryEntity>(id);
    }

    public async Task<IEnumerable<CategoryEntity>> GetAllCategoriesAsync()
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        return await connection.GetAllAsync<CategoryEntity>();
    }

    public async Task AddCategoryAsync(CategoryEntity entity)
    {
        entity.Created_Date = DateTime.UtcNow;
        entity.Modified_Date = DateTime.UtcNow;
        
        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.InsertAsync<CategoryEntity>(entity); 
    }

    public async Task UpdateCategoryAsync(CategoryEntity entity)
    {
        entity.Modified_Date = DateTime.UtcNow;

        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.UpdateAsync<CategoryEntity>(entity);
    }

    public async Task DeleteCategoryAsync(CategoryEntity entity)
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.DeleteAsync<CategoryEntity>(entity);
    }
}
