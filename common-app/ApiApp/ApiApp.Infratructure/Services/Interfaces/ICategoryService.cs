using ApiApp.Infratructure.Entities;

namespace ApiApp.Infratructure.Services;

public interface ICategoryService
{
    Task<CategoryEntity> GetCategoryAsync(int id);
    Task<IEnumerable<CategoryEntity>> GetAllCategoriesAsync();
    Task AddCategoryAsync(CategoryEntity entity);
    Task UpdateCategoryAsync(CategoryEntity entity);
    Task DeleteCategoryAsync(CategoryEntity entity);
}
