namespace ApiApp.Infratructure.Repositories;

public interface IRepository<T>
{
    public Task<T> GetAsync(int id);
    public Task InsertAsync(T entity);
    public Task UpdateAsync(T entity);
    public Task DeleteAsync(T entity);

    public Task<IEnumerable<T>> GetAllAsync();
    public Task InsertRangeAsync(List<T> entities);
    public Task DeleteAllAsync();
    
}
