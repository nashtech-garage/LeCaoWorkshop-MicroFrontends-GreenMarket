FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["api-apps/identity-app/IdentityServer.Data/IdentityServer.Data.csproj", "api-apps/identity-app/IdentityServer.Data/"]
COPY ["api-apps/identity-app/IdentityServer.SqliteMigrations/IdentityServer.SqliteMigrations.csproj", "api-apps/identity-app/IdentityServer.SqliteMigrations/"]
COPY ["api-apps/identity-app/IdentityServer.SqlServerMigrations/IdentityServer.SqlServerMigrations.csproj", "api-apps/identity-app/IdentityServer.SqlServerMigrations/"]
COPY ["api-apps/identity-app/IdentityServer.Core/IdentityServer.Core.csproj", "api-apps/identity-app/IdentityServer.Core/"]
RUN dotnet restore "api-apps/identity-app/IdentityServer.Core/IdentityServer.Core.csproj"
COPY . .
WORKDIR "/src/api-apps/identity-app/IdentityServer.Core"
RUN dotnet build "IdentityServer.Core.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "IdentityServer.Core.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "IdentityServer.Core.dll"]
