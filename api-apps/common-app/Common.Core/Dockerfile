FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["api-apps/common-app/Common.Data/Common.Data.csproj", "api-apps/common-app/Common.Data/"]
COPY ["api-apps/common-app/Common.Infrastructure/Common.Infrastructure.csproj", "api-apps/common-app/Common.Infrastructure/"]
COPY ["api-apps/common-app/Common.SqliteMigrations/Common.SqliteMigrations.csproj", "api-apps/common-app/Common.SqliteMigrations/"]
COPY ["api-apps/common-app/Common.MySqlMigrations/Common.MySqlMigrations.csproj", "api-apps/common-app/Common.MySqlMigrations/"]
COPY ["api-apps/common-app/Common.Core/Common.Core.csproj", "api-apps/common-app/Common.Core/"]
RUN dotnet restore "api-apps/common-app/Common.Core/Common.Core.csproj"
COPY . .
WORKDIR "/src/api-apps/common-app/Common.Core"
RUN dotnet build "Common.Core.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Common.Core.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Common.Core.dll"]
