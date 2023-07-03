using ApiApp.Infratructure.Database;
using ApiApp.Infratructure.Entities;

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
        var productRepo = await _dbContext.GetRepository<ProductEntity>();
        return await productRepo.GetAsync(id);
    }

    public async Task<IEnumerable<ProductEntity>> GetAllProductsAsync()
    {
        var productRepo = await _dbContext.GetRepository<ProductEntity>();
        return await productRepo.GetAllAsync();
    }

    public async Task AddProductAsync(ProductEntity entity)
    {
        var productRepo = await _dbContext.GetRepository<ProductEntity>();
        await productRepo.InsertAsync(entity);
    }

    public async Task DeleteProductAsync(ProductEntity entity)
    {
        var productRepo = await _dbContext.GetRepository<ProductEntity>();
        await productRepo.DeleteAsync(entity);
    }

    public async Task UpdateProductAsync(ProductEntity entity)
    {
        var productRepo = await _dbContext.GetRepository<ProductEntity>();
        await productRepo.UpdateAsync(entity);
    }
}
