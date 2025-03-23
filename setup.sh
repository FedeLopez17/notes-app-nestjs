#!/bin/bash

# Set environment variables for the PostgreSQL container
POSTGRES_USER=postgres
POSTGRES_PASSWORD=dulcedeleche
POSTGRES_DB=notes_db
POSTGRES_PORT=5435

# Start PostgreSQL container using docker-compose
echo "Starting PostgreSQL container..."
docker-compose up -d database

# Wait for PostgreSQL to initialize
echo "Waiting for PostgreSQL to initialize..."
sleep 10 # Adjust as necessary for your system

# Navigate to backend directory and install dependencies
echo "Setting up backend (NestJS)..."
cd backend

# Install NestJS dependencies (ensure you have Node.js installed)
npm install

# Set up environment variables for backend (if needed)
# You can create a .env file if not already created

# Build NestJS application
npm run build

# Start the NestJS backend
echo "Starting NestJS backend..."
npm run start:dev &

# Navigate to frontend directory and install dependencies
echo "Setting up frontend (React)..."
cd ../frontend

# Install React dependencies
npm install

# Build React application
npm run build

# Start React frontend
echo "Starting React frontend..."
npm start &

# Final message
echo "Setup complete! PostgreSQL, Backend, and Frontend are running."
