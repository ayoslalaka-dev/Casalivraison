#!/bin/sh
# backend/docker-entrypoint.sh

echo "Waiting for PostgreSQL to be ready..."
while ! nc -z db 5432; do
  sleep 0.1
done
echo "PostgreSQL is ready!"

echo "Running migrations..."
npx sequelize-cli db:migrate

echo "Running seeders..."
npx sequelize-cli db:seed:all

echo "Starting server..."
npm start
