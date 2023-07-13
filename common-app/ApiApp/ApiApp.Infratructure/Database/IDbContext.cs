
using System.Data;
namespace ApiApp.Infratructure.Database;

public interface IDbContext
{
    Task<IDbConnection> OpenConnectionAsync(CancellationToken cancellationToken = default);
}
