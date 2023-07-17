using ApiApp.Infratructure.Entities;

namespace ApiApp.Infratructure.Services;

public interface IBlogService
{
    Task<BlogEntity> GetBlogAsync(int id);
    Task<IEnumerable<BlogEntity>> GetAllBlogsAsync();
    Task AddBlogAsync(BlogEntity entity);
    Task UpdateBlogAsync(BlogEntity entity);
    Task DeleteBlogAsync(BlogEntity entity);
}
