# This is the ReadMe file for demo project micro frontends single spa framework

## Getting Started

### On local

#### Install, build, and run micro-frontend projects

Move to root-config folder

```
cd root-config
```

Install libraries for all projects

```
npm run install-all
```

Build all projects

```
npm run build
```

Start project

```
npm start
```

#### build, and run identity server project

Build project

```
dotnet build api-apps/identity-app/AuthServer
```

Run project
```
dotnet run api-apps/identity-app/AuthServer --environment Development --urls=http://localhost:5050
```

### On Docker

Remove all dist, node_modules folder before run docker command

```powershell
remove_folders.bat
```

Build all projects

```powershell
sudo docker compose build
```

Start all projects
```
sudo docker compose up
```

Stop all projects
```
sudo docker compose down
```

## Test on browser

```
http://localhost:9000
```