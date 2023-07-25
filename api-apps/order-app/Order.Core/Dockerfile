FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["api-apps/order-app/Order.Data/Order.Data.csproj", "api-apps/order-app/Order.Data/"]
COPY ["api-apps/order-app/Order.SqliteMigrations/Order.SqliteMigrations.csproj", "api-apps/order-app/Order.SqliteMigrations/"]
COPY ["api-apps/order-app/Order.MySqlMigrations/Order.MySqlMigrations.csproj", "api-apps/order-app/Order.MySqlMigrations/"]
COPY ["api-apps/order-app/Order.Core/Order.Core.csproj", "api-apps/order-app/Order.Core/"]
RUN dotnet restore "api-apps/order-app/Order.Core/Order.Core.csproj"
COPY . .
WORKDIR "/src/api-apps/order-app/Order.Core"
RUN dotnet build "Order.Core.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Order.Core.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Order.Core.dll"]
