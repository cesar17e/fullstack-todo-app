# Full-Stack Todo App
_A complete full-stack application built with React, Node.js, Express, SQLite, and JWT authentication._

This project demonstrates my ability to architect and implement a full-stack web application from scratch — including secure authentication, protected API routes, stateful React UI, and SQL-backed data persistence (in-memory for local development).

> **Note:** This application runs locally via dev tools.  
> It is intentionally not deployed yet.

---

## Features

### Authentication
- Register new accounts  
- Login with email + password  
- Passwords hashed using **bcryptjs**  
- JWT used for secure route protection  
- Token stored in `localStorage` for persistence  

### Todo Management
Authenticated users can:
- Create todos  
- Read all their todos  
- Mark todos as **complete**  
- Delete todos  

### Backend Logic
- Full REST API built with **Express**  
- Protected routes via authentication middleware  
- In-memory **SQLite** database created at runtime  
- Pure SQL table creation + queries  
- Serves React build (`client/dist/`) in production mode  

### Frontend UI (React)
- Login + Register UI  
- Interactive dashboard  
- Dynamic filtering (All / Open / Complete)  
- Token-aware routing using React Router  
- Clean, modern styling  

---

## Tech Stack

### Frontend
- React (Vite)
- React Router
- CSS + custom UI styling

### Backend
- Node.js  
- Express  
- SQLite (in-memory DB)  
- JWT for authentication  
- bcryptjs for password hashing  

---

## 📁 Folder Structure

```text
Fullstack-todo-app/
│
├── client/                     # React frontend (Vite)
│   ├── src/                    # Components, pages, hooks, styles
│   ├── public/                 # Static assets
│   └── dist/                   # Production build (ignored by Git)
│
├── server/                     # Node.js + Express backend
│   ├── src/
│   │   ├── routes/             # authRoutes.js, todoRoutes.js
│   │   ├── middleware/         # authMiddleware.js
│   │   ├── server.js           # Express entry point
│   │   └── db.js               # In-memory SQLite setup
│   ├── package.json
│   └── .env                    # JWT secret, PORT (ignored by Git)
│
├── README.md                   # Project documentation
└── .gitignore                  # Ignores env, node_modules, dist, etc.
         
```

---

### How to Run Locally

### 1: Install Client Dependencies

- cd client
- npm install
- npm run build # generates the "dist" folder used by the server


### 2: Install Server Dependencies
- cd ../server
- npm install
- npm run dev

### 3️: Open the App  
Visit: **http://localhost:5177**

---

##  API Endpoints

### Authentication Endpoints  
- **POST /auth/register** — Create a new user  
- **POST /auth/login** — Log in and receive a JWT token  

---

## Todo Endpoints (Protected)

> All Todo routes require the header:  
> **Authorization: <your-jwt-token>**

- **GET /todos** — Fetch all todos for the logged-in user  
- **POST /todos** — Create a new todo  
- **PUT /todos/:id** — Mark a todo as completed or update it  
- **DELETE /todos/:id** — Delete a todo by ID  

## 📌 Purpose of This Project
This application demonstrates practical experience with:

- Full-stack architecture  
- REST API design  
- Authentication & authorization  
- SQL database handling  
- State management in React  
- Integrating frontend + backend in a unified production server  

The goal is to provide a clean, real-world example of a full-stack workflow.
