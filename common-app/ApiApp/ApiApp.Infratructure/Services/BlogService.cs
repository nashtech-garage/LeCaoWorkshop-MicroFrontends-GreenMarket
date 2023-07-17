using ApiApp.Infratructure.Database;
using ApiApp.Infratructure.Entities;
using Dapper.Contrib.Extensions;

namespace ApiApp.Infratructure.Services;

public class BlogService : IBlogService
{
    private readonly IDbContext _dbContext;
    public BlogService(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<BlogEntity> GetBlogAsync(int id)
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        return await connection.GetAsync<BlogEntity>(id);
    }

    public async Task<IEnumerable<BlogEntity>> GetAllBlogsAsync()
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        return await connection.GetAllAsync<BlogEntity>();
    }

    public async Task AddBlogAsync(BlogEntity entity)
    {
        entity.Created_Date = DateTime.UtcNow;
        entity.Modified_Date = DateTime.UtcNow;
        
        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.InsertAsync<BlogEntity>(entity); 
    }

    public async Task UpdateBlogAsync(BlogEntity entity)
    {
        entity.Modified_Date = DateTime.UtcNow;

        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.UpdateAsync<BlogEntity>(entity);
    }

    public async Task DeleteBlogAsync(BlogEntity entity)
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.DeleteAsync<BlogEntity>(entity);
    }
}
