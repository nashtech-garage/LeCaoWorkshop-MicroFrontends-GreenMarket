
using ApiApp.Infratructure.Entities;
using ApiApp.Infratructure.Repositories;

namespace ApiApp.Infratructure.Database;

public interface IDbContext
{
    void Commit();
    void Rollback();
    Task<IRepository<T>> GetRepository<T>() where T : BaseEntity;
}
