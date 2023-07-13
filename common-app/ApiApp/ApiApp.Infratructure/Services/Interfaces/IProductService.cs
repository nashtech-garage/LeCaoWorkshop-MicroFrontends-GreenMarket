using ApiApp.Infratructure.Entities;

namespace ApiApp.Infratructure.Services;

public interface IProductService
{
    Task<ProductEntity> GetProductAsync(int id);
    Task<IEnumerable<ProductEntity>> GetAllProductsAsync();
    Task AddProductAsync(ProductEntity entity);
    Task UpdateProductAsync(ProductEntity entity);
    Task DeleteProductAsync(ProductEntity entity);
}
