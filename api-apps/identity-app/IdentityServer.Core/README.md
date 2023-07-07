# Generate migration files

## Migrations folder for Sqlite (run on local)

Run dotnet cli to generate files

```
dotnet ef migrations add InitialSqliteMigration -c ApplicationDbContext -o SqliteMigrations
```

```
dotnet ef migrations add InitialSqliteIdentityServerConfigurationDbMigration -c ConfigurationDbContext -o SqliteMigrations/IdentityServer/ConfigurationDb
```

```
dotnet ef migrations add InitialSqliteIdentityServerPersistedGrantDbMigration -c PersistedGrantDbContext -o SqliteMigrations/IdentityServer/PersistedGrantDb
```

Copy all files to project IdentityServer.SqliteMigrations

## Migrations folder for SqlServer (run on Docker)

Run dotnet cli to generate files

```
dotnet ef migrations add InitialSqlServerMigration -c ApplicationDbContext -o SqlServerMigrations
```

```
dotnet ef migrations add InitialSqlServerIdentityServerConfigurationDbMigration -c ConfigurationDbContext -o SqlServerMigrations/IdentityServer/ConfigurationDb
```

```
dotnet ef migrations add InitialSqlServerIdentityServerPersistedGrantDbMigration -c PersistedGrantDbContext -o SqlServerMigrations/IdentityServer/PersistedGrantDb
```

Copy all files to project IdentityServer.SqlServerMigrations