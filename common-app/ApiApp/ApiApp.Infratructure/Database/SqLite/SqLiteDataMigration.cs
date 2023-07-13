
using System.Data.SQLite;

namespace ApiApp.Infratructure.Database;

public class SqLiteDataMigration
{
    public static void InitialSQLiteDatabase(string connectionString = "")
    {
        var path = Path.Combine(AppContext.BaseDirectory, "Data", "common-db.sql");
        string sqlText = File.ReadAllText(path);

        using var connection = new SQLiteConnection(connectionString);
        if (connection.State == System.Data.ConnectionState.Closed)
        {
            connection.OpenAsync();
        }

        //Check if database have been created.
        var sql ="SELECT name FROM sqlite_master WHERE type='table' AND name = 'products';";
        var sqliteCommand = new SQLiteCommand(sql, connection);
        var reader = sqliteCommand.ExecuteReader();
        if (reader.HasRows)
        {
            reader.Close();
            connection.Close();
            return;
        }
        reader.Close();
        
        using var command = connection.CreateCommand();
        command.CommandText = sqlText;
        command.ExecuteNonQuery();
        connection.Close();
    }
}