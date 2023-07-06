
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["ApiApp/ApiApp.Infratructure/ApiApp.Infratructure.csproj", "ApiApp/ApiApp.Infratructure/"]
COPY ["ApiApp/ApiApp.API/ApiApp.API.csproj", "ApiApp/ApiApp.API/"]
RUN dotnet restore "ApiApp/ApiApp.API/ApiApp.API.csproj"
COPY . .
WORKDIR "/src/ApiApp/ApiApp.API"
RUN dotnet build "ApiApp.API.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ApiApp.API.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ApiApp.API.dll"]