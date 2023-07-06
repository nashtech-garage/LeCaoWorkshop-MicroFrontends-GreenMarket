using System.Data;
using ApiApp.Infratructure.Database;
using ApiApp.Infratructure.Entities;
using Dapper.Contrib.Extensions;
using Microsoft.Data.SqlClient;

namespace ApiApp.Infratructure.Services;

public class ProductService : IProductService
{
    private IDbContext _dbContext;
    public ProductService(IDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<ProductEntity> GetProductAsync(int id)
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        return await connection.GetAsync<ProductEntity>(id);
    }

    public async Task<IEnumerable<ProductEntity>> GetAllProductsAsync()
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        return await connection.GetAllAsync<ProductEntity>();
    }

    public async Task AddProductAsync(ProductEntity entity)
    {
        entity.Created_Date = DateTime.UtcNow;
        entity.Modified_Date = DateTime.UtcNow;
        
        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.InsertAsync<ProductEntity>(entity);      
    }

    public async Task UpdateProductAsync(ProductEntity entity)
    {
        entity.Modified_Date = DateTime.UtcNow;

        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.UpdateAsync<ProductEntity>(entity);
    }

    public async Task DeleteProductAsync(ProductEntity entity)
    {
        using var connection = await _dbContext.OpenConnectionAsync();
        await connection.DeleteAsync<ProductEntity>(entity);
    }
}
