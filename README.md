# Ensolvers Notes App Challenge

This is a full-stack application consisting of a React frontend and a NestJS backend, with PostgreSQL as the database. The project also includes Docker for containerization.

## Prerequisites

Before running the project, ensure you have the following tools installed:

- **Node.js** version 22.14.0
- **npm** version 11.2.0
- **Docker** (to run the PostgreSQL container)

## Installation

### 1. Clone the Repository

First, clone the repository to your local machine and change to it:

```bash
git clone https://github.com/hirelens-challenges/Lopez-a99a02.git
cd Lopez-a99a02
```

### 2. Running the Project

Make the setup script executable and run it to set up the PostgreSQL database, backend, and frontend:

```bash
chmod +x setup.sh
./setup.sh
```

## What the setup script does:

Starts the PostgreSQL container using Docker.

Installs backend dependencies (NestJS).

Runs Prisma migrations and seeds the database.

Installs frontend dependencies (React).

Builds and start both the backend and frontend.
