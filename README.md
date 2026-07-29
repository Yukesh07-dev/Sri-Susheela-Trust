# Sri Susheela Trust - Official Portal & Admin Management System

A web platform and administration portal built for **Sri Susheela Trust**.

## 📁 Repository Structure

```text
Sri-Susheela-Trust/
├── client/       # Public Frontend Website (React + TypeScript + Vite)
├── admin/        # Admin Management Portal (React + TypeScript + Vite)
├── server/       # Backend REST API Service (Node.js + Express)
├── package.json  # Root Orchestration & NPM Workspaces
├── .gitignore    # Global Git Ignore configuration
└── .env.example  # Environment configurations template
```

## 🚀 Quick Start Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (v9 or higher)

### Installation

Install dependencies across all projects (`client`, `admin`, `server`):

```bash
npm run install:all
```

### Development Scripts

Run the individual applications in development mode:

- **Public Client Portal** (Runs on http://localhost:5173):
  ```bash
  npm run dev:client
  ```

- **Admin Management Portal** (Runs on http://localhost:5174):
  ```bash
  npm run dev:admin
  ```

- **Backend API Server** (Runs on http://localhost:5000):
  ```bash
  npm run dev:server
  ```

### Production Build

Build all packages for production deployment:

```bash
npm run build:all
```

## 🛡️ Admin & Backend Configuration

- Set up environment variables by copying `.env.example` to `.env` in `server/`:
  ```bash
  cp .env.example server/.env
  ```

## 📄 License
This repository is private property of Sri Susheela Trust.
