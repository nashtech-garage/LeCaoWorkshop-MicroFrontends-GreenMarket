start  cmd.exe /C "cd api-apps/identity-app/IdentityServer.Core & title IdentityServer & dotnet run --environment Development --urls=http://localhost:5050"
start  cmd.exe /C "cd api-apps/order-app/Order.Core & title OrderAPI & dotnet run --environment Development --urls=http://localhost:5080"
