using System.Collections;
using System.Data;
using Microsoft.Extensions.Options;
using ApiApp.Infratructure.Configs;
using Microsoft.Data.SqlClient;
using ApiApp.Infratructure.Repositories;
using ApiApp.Infratructure.Entities;

namespace ApiApp.Infratructure.Database;

public class DbContext : IDbContext
{
    private Hashtable _repositories = new();
    private IDbTransaction? _transaction;

    private DatabaseConfig _databaseConfig;

    public DbContext(IOptions<DatabaseConfig> databaseConfig)
    {
        _databaseConfig = databaseConfig.Value;
    }

    private async Task<IDbTransaction> GetTransaction()
    {
        if (_transaction is null)
        {
            var connection = await OpenConnectionAsync();
            _transaction = connection.BeginTransaction();
        }
        return _transaction;
    }
    public void Commit()
    {
        try
        {
            _transaction?.Commit();
            _transaction?.Connection?.Close();
        }
        catch
        {
            _transaction?.Rollback();
            throw;
        }
        finally
        {
            _transaction?.Dispose();
            _transaction?.Connection?.Dispose();
            Reset();
        }
    }

    public void Rollback()
    {
        try
        {
            _transaction?.Rollback();
            _transaction?.Connection?.Close();
        }
        catch
        {
            throw;
        }
        finally
        {
            _transaction?.Dispose();
            _transaction?.Connection?.Dispose();
            Reset();
        }
    }

    public async Task<IRepository<T>> GetRepository<T>() where T : BaseEntity
    {
        var transaction = await GetTransaction();
        if (_repositories == null)
            _repositories = new Hashtable();

        var repositoryType = typeof(IRepository<T>);
        if (!_repositories.ContainsKey(repositoryType))
        {
            var repositoryInstance = new Repository<T>(transaction);
            _repositories.Add(repositoryType, repositoryInstance);
        }

        return _repositories[repositoryType] as IRepository<T>;
    }

    private void Reset()
    {
        _transaction = null;
        _repositories = null;
    }

    private async Task<IDbConnection> OpenConnectionAsync(CancellationToken cancellationToken = default)
    {
        var connection = new SqlConnection(_databaseConfig.ConnectionString);
        await connection.OpenAsync(cancellationToken);

        return connection;
    }
}