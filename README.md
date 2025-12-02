# Express + Neon DB API

This is a simple **Express.js** server connected to **Neon PostgreSQL**.  
It creates two tables: `users` and `todos` and exposes basic API endpoints to interact with them.

---

## Features

- Users table
- Todos table (with `user_id` foreign key referencing users)
- Express JSON API
- Environment variables support (`.env`)
- Postman-ready CRUD endpoints

---

## Prerequisites

- Node.js >= 18
- npm
- Neon PostgreSQL database
- `.env` file in project root with database connection string

---

## Setup

1. **Clone the repository**

```bash
git clone < https://github.com/Niloynh/express_server.git>
cd <express_server>
