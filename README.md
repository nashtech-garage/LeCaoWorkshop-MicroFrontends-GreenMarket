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

#### Build, and run identity and order API projects

Run projects

```powershell
run_api_projects.bat
```

### On Docker

Remove all dist, node_modules folder before run docker command

```powershell
remove_folders.bat
```

Build all projects

```
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

## Default user and password for login

```
Username: admin@gmail.com
Password: Iloveyou@123
```
