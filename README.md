# Express.js + NeonDB (PostgreSQL) CRUD API

A fully functional backend built with **Node.js**, **Express.js**, **TypeScript**, and **NeonDB (serverless PostgreSQL)**.  
This project includes complete CRUD operations for **Users** and **Todos**, with automated database initialization and JWT-based authentication.

---

## Features

### Database
- Automatically creates required tables on startup
- Serverless PostgreSQL using NeonDB
- User → Todos relational mapping
- Secure password hashing (bcrypt)

### Backend API
- Full CRUD for Users
- Full CRUD for Todos (linked by `user_id`)
- JWT Authentication
- Role-based Authorization Middleware
- Centralized Error Handling
- Request Logging Middleware
- Modular Controller–Service–Router structure
- JSON body parsing

---

## Tech Stack

- Node.js  
- Express.js  
- TypeScript  
- PostgreSQL (NeonDB)  
- pg (node-postgres)  
- bcrypt  
- jsonwebtoken  
- dotenv  

---

## Setup

### Clone the repository

```bash
git clone https://github.com/Niloynh/express_server.git
cd express_server
Install dependencies
bash
Copy code
npm install
Create .env file
Create a .env file in the project root with the following keys:

env
Copy code
CONNECTION_STR=your_neon_postgres_connection_string
JWT_SECRET=your_secret_token
Run the development server
bash
Copy code
npm run dev
Folder Structure
txt
Copy code
src
 ├─ config/
 ├─ middleware/
 ├─ modules/
 │   ├─ auth/
 │   ├─ users/
 │   └─ todo/
 ├─ app.ts
 └─ server.ts
API Routes
Method	Endpoint	Description
POST	/users	Create user
GET	/users	Get all users
GET	/users/:id	Get single user
PUT	/users/:id	Update user
DELETE	/users/:id	Delete user
POST	/users/todos	Create todo
GET	/users/todos	Get all todos
GET	/users/todos/:id	Get todo by ID
PUT	/users/todos/:id	Update todo
DELETE	/users/todos/:id	Delete todo


License
This project is open source and available under the MIT License.