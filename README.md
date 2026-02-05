# 🚀 Task Management Backend

A robust **Task Management Backend API** built using **Node.js**, **TypeScript**, **Express**, and **TypeORM**.  
It provides secure authentication, full CRUD task management, and auto-generated **Swagger API documentation**.

---

## 🛠 Tech Stack

- **Runtime:** Node.js
- **Language:** TypeScript
- **Framework:** Express.js (v5)
- **Database:** PostgreSQL (TypeORM)
- **Validation:** Joi
- **Authentication & Security:** JWT, Bcrypt, Helmet
- **Documentation:** Swagger UI + swagger-autogen
- **Logging:** Winston
- **Mailing:** Nodemailer
- **Code Quality:** ESLint, Prettier, Husky, lint-staged

---

## 📂 Project Structure

src/
├── modules/
│ ├── auth/
│ ├── tasks/
├── middlewares/
├── configs/
├── utils/
├── swagger.ts
├── index.ts
dist/

**Architecture:**  
Routes → Controllers → Services → Repositories (TypeORM)

---

## 📥 Getting Started

### 1️⃣ Prerequisites

- Node.js **v18+**
- PostgreSQL
- npm or yarn

---

### 2️⃣ Installation

```bash
git clone https://github.com/AlamCs32/task-management.git
cd task-management
npm install
```

### 4️⃣ Running the Application

| Command                    | Description                      |
| -------------------------- | -------------------------------- |
| `npm run start:dev`        | Start server in development mode |
| `npm run build`            | Compile TypeScript to `/dist`    |
| `npm run start`            | Run production build             |
| `npm run generate:swagger` | Generate Swagger documentation   |

📑 API Documentation

Once the server is running, open:

👉 http://localhost:3000/api-docs

Swagger documentation is auto-generated using swagger-autogen.

🔐 Authentication Module (/api/auth)
Endpoint Method Description
/signup POST Register a new user
/login POST Authenticate user
/change-password PATCH Change password (Auth required)
/forget-password POST Send password reset email
/reset-password PATCH Reset password
/refresh-token GET Refresh access token
/logout GET Logout user

📝 Task Module (/api/tasks)

🔒 All endpoints require a Bearer Token

Endpoint Method Description
/ GET Fetch all tasks (search, pagination, filters)
/:taskId GET Fetch task details
/ POST Create a new task
/:taskId PUT Update a task
/:taskId DELETE Delete a task

🧹 Code Quality

ESLint for linting

Prettier for formatting

Husky + lint-staged for pre-commit hooks

Conventional commit messages

npm run lint
npm run format

NPM Scripts

"scripts": {
"start": "node -r module-alias/register -r dotenv/config dist/index.js",
"build": "tsc",
"start:dev": "tsx watch --env-file .env src/index.ts",
"generate:swagger": "tsx src/swagger.ts",
"lint": "eslint \"src/**/\*.{ts,js}\"",
"format": "prettier --write \"src/**/\*.{ts,js,json}\""
}

🔒 Security Features

Password hashing with bcrypt

JWT-based authentication

Secure HTTP headers using Helmet

Input validation using Joi

Protected routes with authentication middleware

👨‍💻 Author

Mehfooz Shaikh
GitHub: https://github.com/AlamCs32
