# Express.js + NeonDB (PostgreSQL) CRUD API

A fully functional backend built with **Node.js**, **Express.js**, **TypeScript**, and **NeonDB (serverless PostgreSQL)**.
This project includes complete CRUD operations for **Users** and **Todos**, with automated database initialization and JWT-based authentication.

## 🌟 Features

### Database
* Automatically creates required tables on startup
* Serverless PostgreSQL using [NeonDB](https://neon.tech/)
* User $\rightarrow$ Todos relational mapping
* Secure password hashing (bcrypt)

### Backend API
* Full CRUD for Users
* Full CRUD for Todos (linked by `user_id`)
* JWT Authentication
* Role-based Authorization Middleware
* Centralized Error Handling
* Request Logging Middleware
* Modular Controller–Service–Router structure
* JSON body parsing

---

## 💻 Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Runtime** | Node.js | JavaScript runtime environment. |
| **Framework** | Express.js | Fast, unopinionated, minimalist web framework for Node.js. |
| **Language** | TypeScript | Typed superset of JavaScript that compiles to plain JavaScript. |
| **Database** | PostgreSQL (NeonDB) | Serverless relational database. |
| **DB Driver** | `pg` (node-postgres) | Non-blocking PostgreSQL client for Node.js. |
| **Security** | `bcrypt` | Hashing passwords securely. |
| **Auth** | `jsonwebtoken` | Implementing JSON Web Tokens for authentication. |
| **Config** | `dotenv` | Loading environment variables from a `.env` file. |

---

## 🛠️ Setup

### 1. Clone the repository

```bash
git clone [https://github.com/Niloynh/express_server.git](https://github.com/Niloynh/express_server.git)
cd express_server
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create `.env` file

Create a `.env` file in the project root with the following keys. You must get your connection string from your Neon project dashboard.

```env
CONNECTION_STR=your_neon_postgres_connection_string
JWT_SECRET=your_secret_token
```

### 4. Run the development server

```bash
npm run dev
```

The server will start on `http://localhost:3000` (or the port defined in your configuration).

---

## 📁 Folder Structure

The project follows a modular and tiered structure (`Controller` $\rightarrow$ `Service` $\rightarrow$ `Router`).

```txt
src/
 ├─ config/           # Configuration files (e.g., database connection)
 ├─ middleware/       # Custom middleware (e.g., logging, auth, error handling)
 ├─ modules/          # Core logic, divided by feature (Auth, Users, Todo)
 │   ├─ auth/
 │   ├─ users/
 │   └─ todo/
 ├─ app.ts            # Express application setup
 └─ server.ts         # Server startup and database initialization
```

---

## 🔗 API Routes

All endpoints are prefixed with the base URL (e.g., `http://localhost:3000`).

### User Management (`/users`)

| Method | Endpoint | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `POST` | `/users` | Create a new user (Registration) | None |
| `GET` | `/users` | Get a list of all users | **Required** |
| `GET` | `/users/:id` | Get a single user by ID | **Required** |
| `PUT` | `/users/:id` | Update a user by ID | **Required** |
| `DELETE` | `/users/:id` | Delete a user by ID | **Required** |

### Todo Management (`/todos`)

| Method | Endpoint | Description | Authentication |
| :--- | :--- | :--- | :--- |
| `POST` | `/todos` | Create a new todo item | **Required** |
| `GET` | `/todos` | Get all todo items (optionally filtered by user) | **Required** |
| `GET` | `/todos/:id` | Get a single todo by ID | **Required** |
| `PUT` | `/todos/:id` | Update a todo by ID | **Required** |
| `DELETE` | `/todos/:id` | Delete a todo by ID | **Required** |

---

## 📄 License

This project is open source and available under the **MIT License**.