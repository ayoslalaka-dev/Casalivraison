# La Grande Soirée Gnawa - App & API

This repository contains the full stack application for "La Grande Soirée Gnawa", featuring a React Native (Expo) frontend and an Express.js backend.

## Project Structure

- **frontend/**: React Native application (Expo Router).
- **backend/**: Express.js API with Sequelize & PostgreSQL.

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL

### Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure environment variables in `.env` (create if needed, based on example).
4. Run the server:
   ```bash
   npm run dev
   ```
   Server runs on `http://localhost:3000`.

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npx expo start
   ```
   This will open the Expo development workflow. You can scan the QR code with your phone or press 'i' for iOS simulator, 'a' for Android emulator.

## Features
- Event Information Listing
- Artist Details
- Booking Management
