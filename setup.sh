#!/bin/bash

# Set environment variables for the PostgreSQL container
POSTGRES_USER=postgres
POSTGRES_PASSWORD=dulcedeleche
POSTGRES_DB=notes_db
POSTGRES_PORT=5435
CONTAINER_NAME=postgres_container

# Start PostgreSQL container using docker-compose
echo "Starting PostgreSQL container..."
docker-compose up -d database

# Wait for PostgreSQL to initialize
echo "Waiting for PostgreSQL to initialize..."
sleep 10

# Navigate to backend directory and install dependencies
echo "Setting up backend (NestJS)..."
cd backend

# Install NestJS dependencies
npm install

# Set up environment variables for backend
cat > .env <<EOL
DATABASE_URL="postgresql://postgres:dulcedeleche@localhost:5435/notes_db?schema=public"
EOL

# Run Prisma migrations
echo "Running Prisma migrations..."
npx prisma migrate deploy

# Generate Prisma client
echo "Generating Prisma client..."
npx prisma generate

# Seed database using external SQL script
echo "Seeding database with initial data from seed.sql..."
docker exec -i $CONTAINER_NAME psql -U $POSTGRES_USER -d $POSTGRES_DB < ../seed.sql

echo "Database seeded successfully!"

# Build and start the NestJS backend
npm run build
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
