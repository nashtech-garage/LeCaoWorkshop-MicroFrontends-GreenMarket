using System.Data;
using Microsoft.Extensions.Options;
using ApiApp.Infratructure.Configs;
using Microsoft.Data.SqlClient;
using System.Data.SQLite;

namespace ApiApp.Infratructure.Database;

public class DbContext : IDbContext
{
    private readonly DatabaseConfig _databaseConfig;

    public DbContext(IOptions<DatabaseConfig> databaseConfig)
    {
        _databaseConfig = databaseConfig.Value;
    }

    public async Task<IDbConnection> OpenConnectionAsync(CancellationToken cancellationToken = default)
    {
        var environment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT");
        
        //Use SQLite in Development environment
        if (!string.IsNullOrEmpty(environment) && environment.Equals("Development", StringComparison.InvariantCultureIgnoreCase))
        {
            var connection = new SQLiteConnection(_databaseConfig.ConnectionString);
            
            if(connection.State == ConnectionState.Closed)
            {
                await connection.OpenAsync(cancellationToken);
            }

            return connection;
        }
        else 
        {
            var connection = new SqlConnection(_databaseConfig.ConnectionString);
            
            if(connection.State == ConnectionState.Closed)
            {
                await connection.OpenAsync(cancellationToken);
            }

            return connection;
        }
    }
}