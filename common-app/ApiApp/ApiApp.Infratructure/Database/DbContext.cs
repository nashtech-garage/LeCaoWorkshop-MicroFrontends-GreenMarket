using System.Data;
using Microsoft.Extensions.Options;
using ApiApp.Infratructure.Configs;
using Microsoft.Data.SqlClient;

namespace ApiApp.Infratructure.Database;

public class DbContext : IDbContext
{
    private DatabaseConfig _databaseConfig;

    public DbContext(IOptions<DatabaseConfig> databaseConfig)
    {
        _databaseConfig = databaseConfig.Value;
    }

    public async Task<IDbConnection> OpenConnectionAsync(CancellationToken cancellationToken = default)
    {
        var connection = new SqlConnection(_databaseConfig.ConnectionString);
        await connection.OpenAsync(cancellationToken);

        return connection;
    }
}