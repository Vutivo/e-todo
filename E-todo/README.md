# Project Name

A full-stack web application built with React, Express, and Docker.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- [Docker](https://www.docker.com/get-started) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Environment Configuration

Create a `.env` file in the root directory of the project:

```bash
touch .env
```

Open the `.env` file and add the following environment variables with your configuration:

```env
DB_HOST="your_database_host"
DB_USER="your_database_user"
DB_PASSWORD="your_database_password"
DB_NAME="your_database_name"
DB_PORT="3306"
SECRET="your_secret_key_here"
```

**Configuration Details:**

- `DB_HOST`: The hostname of your MySQL database (e.g., `localhost` or `db` for Docker service name)
- `DB_USER`: Your database username
- `DB_PASSWORD`: Your database password
- `DB_NAME`: The name of your database
- `DB_PORT`: MySQL port (default is 3306)
- `SECRET`: Secret key for JWT tokens or session encryption

 ⚠️ **Important:** Never commit the `.env` file to version control. Make sure `.env` is listed in your `.gitignore` file.

### 3. Install and Run with Docker

Build and start the containers:

```bash
docker-compose up --build
```

Or run in detached mode (background):

```bash
docker-compose up -d --build
```

### 4. Access the Application

Once the containers are running:

- **Frontend (React)**: http://localhost:8080
- **Backend (Express API)**: http://localhost:3000

## 🛠️ Docker Commands

### Start the application

```bash
docker-compose up
```

### Stop the application

```bash
docker-compose down
```

### View running containers

```bash
docker ps
```

### View logs

```bash
docker-compose logs -f
```

### Rebuild containers

```bash
docker-compose up --build
```

### Remove all containers and volumes

```bash
docker-compose down -v
```

## 📁 Project Structure

```
project-root/
├── frontend/              # React frontend
├── backend/              # Express backend
├── datas/                 # Mysql database
├── docker-compose.yml   # Docker configuration
├── .env                 # Environment variables (not committed)
├── .gitignore
└── README.md
```

## 🐛 Troubleshooting

### Port Already in Use

If you get a port conflict error, either stop the service using that port or modify the ports in `docker-compose.yml`.

### Database Connection Issues

Make sure your `DB_HOST` in the `.env` file matches your database service name in `docker-compose.yml`.

### Containers Not Starting

Check the logs:
```bash
docker-compose logs
```

## 👥 Contributors

Team DURIAN