# ChronoVault

<p align="center">
  <em>Send Messages to the Future — A Digital Time Capsule Experience</em>
</p>

<div align="center">
  <img alt="last-commit" src="https://img.shields.io/github/last-commit/SMRMahinpour/ChronoVault?style=flat&logo=git&color=0080ff">
  <img alt="repo-top-language" src="https://img.shields.io/github/languages/top/SMRMahinpour/ChronoVault?style=flat&color=0080ff">
  <img alt="license" src="https://img.shields.io/github/license/SMRMahinpour/ChronoVault?style=flat&color=0080ff">
  <img alt="docker" src="https://img.shields.io/badge/docker-ready-blue?style=flat&logo=docker">
</div>

---

## Overview

**ChronoVault** is a full-stack **React + Laravel SPA** that allows users to send messages that are revealed at a specific time — like a modern digital time capsule.

It combines:

- ⚛️ A modern React SPA frontend  
- 🐘 A Laravel 12 API backend  
- 🗄 PostgreSQL database  
- 🐳 Fully containerized Docker environment  
- 🎲 Custom 3D cube countdown experience

ChronoVault demonstrates a production-ready architecture with clean separation between frontend and backend using an API-first approach.

---

## Features

- 📩 Send messages to yourself or other users  
- ⏳ Schedule messages to be revealed at a specific time (`showAt`)  
- 🎲 Immersive 3D cube countdown animation before reveal  
- 🔐 Authentication-ready API architecture  
- 🐳 Fully containerized with Docker  
- 🧱 Scalable SPA + Backend separation

---

## Tech Stack

### Backend
- Laravel 12  
- PHP 8.4 (FPM)  
- PostgreSQL 16  
- Nginx

### Frontend
- React SPA  
- TypeScript  
- Vite  
- Custom 3D Cube Countdown Engine

### DevOps
- Docker  
- Docker Compose

---

## Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone https://github.com/yourusername/ChronoVault.git
cd ChronoVault
```

---

### 2️⃣ Configure Environment Variables

Create a `.env` file inside the `backEnd` directory (or copy from `.env.example`) and update:

```env
APP_NAME=ChronoVault
APP_ENV=local
APP_KEY=base64:GENERATE_YOUR_KEY
APP_DEBUG=true
APP_URL=http://localhost

DB_CONNECTION=pgsql
DB_HOST=db
DB_PORT=5432
DB_DATABASE=ChronoVault
DB_USERNAME=postgres
DB_PASSWORD=yourpassword

SESSION_DRIVER=database
SESSION_LIFETIME=120
QUEUE_CONNECTION=database
```

---

### 3️⃣ Start Docker Containers

```bash
docker compose up -d
```

Check running containers:

```bash
docker ps
```

---

### 4️⃣ Run Migrations

```bash
docker compose exec app bash
php artisan migrate
```

---

## Frontend Setup

Go to the frontend folder:

```bash
cd frontEnd
```

Install dependencies:

```bash
npm install
```

Start development server:

```bash
npm run dev
```

Make sure your API base URL points to the backend:

```bash
http://localhost:8000/api
```

---

## Docker Commands

Stop containers:

```bash
docker compose down
```

Rebuild containers after Dockerfile changes:

```bash
docker compose up -d --build
```

---

## API Overview

### Create Message
```
POST /api/messages
```

### List Messages
```
GET /api/messages
```

Messages are revealed based on the `showAt` timestamp.

---

## 3D Countdown Experience

ChronoVault includes a custom-built **3D cube countdown system** built with React and TypeScript.

Features:
- Real 3D cube digits  
- Smooth rotational animation  
- Time-based transitions  
- Modular component structure  
- Built for performance and scalability

This system transforms the waiting experience into an interactive visual moment before message reveal.

---

## Project Structure

```
ChronoVault/
│
├── backEnd/        → Laravel API
├── frontEnd/       → React SPA
├── docker-compose.yml
└── README.md
```

---

## Contributing

1. Fork the repository  
2. Create a branch

```bash
git checkout -b feature/your-feature
```

3. Commit changes

```bash
git commit -m "Add new feature"
```

4. Push branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

## Install Countdown3D (Optional for Frontend)

Install via npm:

```bash
npm install countdown3d
```

Or via yarn:

```bash
yarn add countdown3d
```

---

## License

This project is licensed under the **MIT License**.

© SMR.Mahinpour & ChronoVault Contributors

