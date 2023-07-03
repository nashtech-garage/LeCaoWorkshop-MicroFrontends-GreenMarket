using System.Data;
using Dapper.Contrib.Extensions;
using ApiApp.Infratructure.Entities;

namespace ApiApp.Infratructure.Repositories;

public class Repository<T> : IRepository<T> where T : BaseEntity
{
    protected readonly IDbConnection _connection;
    protected readonly IDbTransaction _transaction;

    public Repository(IDbTransaction transaction)
    {
        _connection = transaction.Connection!;
        _transaction = transaction;
    }

    public Task<T> GetAsync(int id)
    {
        return _connection.GetAsync<T>(id, _transaction);
    }

    public Task InsertAsync(T entity)
    {
        entity.CreatedDate = DateTime.UtcNow;
        return _connection.InsertAsync(entity, _transaction);
    }

    public Task UpdateAsync(T entity)
    {
        entity.ModifiedDate = DateTime.UtcNow;
        return _connection.UpdateAsync(entity, _transaction);
    }

    public Task DeleteAsync(T entity)
    {
        return _connection.DeleteAsync(entity, _transaction);
    }

    public Task<IEnumerable<T>> GetAllAsync()
    {
        return _connection.GetAllAsync<T>(_transaction);
    }

    public Task InsertRangeAsync(List<T> entities)
    {
        return _connection.InsertAsync(entities, _transaction);
    }

    public Task DeleteAllAsync()
    {
        return _connection.DeleteAllAsync<T>(_transaction);
    }
}
