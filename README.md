# Professional Node.js/TypeScript Boilerplate

A structured and scalable backend boilerplate built with **Node.js, TypeScript, Express.js, TypeORM, and MySQL**. This project provides a foundation for developing secure, maintainable, and scalable RESTful APIs.

It includes centralized error handling, request validation, structured logging, security middleware, database migrations, and a complete User CRUD implementation.

## 🚀 Features

- **TypeScript** – Strict type checking and modern JavaScript features.
- **Express.js** – Handles HTTP requests and API routing.
- **TypeORM** – Object-relational mapping for database operations.
- **MySQL** – Relational database management.
- **Joi Validation** – Validates incoming request data.
- **Winston Logger** – Provides structured application logging.
- **Centralized Error Handling** – Manages application errors consistently.
- **Async Handler** – Handles asynchronous controller errors.
- **Security Middleware** – Uses Helmet, CORS, and Express Rate Limit.
- **Password Hashing** – Uses bcrypt to securely hash user passwords.
- **Database Migrations** – Manages database schema changes.
- **Modular Architecture** – Separates controllers, services, entities, DTOs, and routes.

## 🛠️ Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (Version 20 or 22 LTS recommended)
- [npm](https://www.npmjs.com/)
- [MySQL Server](https://dev.mysql.com/downloads/mysql/)
- [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/)
- [Git](https://git-scm.com/)

## 📦 Installation and Setup

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd professional-boilerplate
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root directory.

Example configuration:

```env
NODE_ENV=development
PORT=3000

DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=boilerplate_db

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d
```

**Note:** These are example variable names. Make sure they match the actual variables used in your project configuration. Never commit your real `.env` file to GitHub.

### 4. Create the MySQL Database

Open MySQL and execute:

```sql
CREATE DATABASE boilerplate_db;
```

### 5. Run Database Migrations

Generate a migration when your entity schema changes:

```bash
npm run typeorm -- migration:generate src/migrations/InitialSchema -d src/config/data-source.ts
```

Run pending migrations:

```bash
npm run typeorm -- migration:run -d src/config/data-source.ts
```

Revert the latest migration if necessary:

```bash
npm run typeorm -- migration:revert -d src/config/data-source.ts
```

### 6. Start the Development Server

```bash
npm run dev
```

The server should start at:

```text
http://localhost:3000
```

Test the health endpoint:

```text
GET http://localhost:3000/health
```

## 🔐 Environment Variables

| Variable | Description |
|---|---|
| NODE_ENV | Application environment |
| PORT | Port used by the Express server |
| DB_HOST | MySQL database host |
| DB_PORT | MySQL database port |
| DB_USERNAME | MySQL username |
| DB_PASSWORD | MySQL password |
| DB_DATABASE | Database name |
| JWT_SECRET | Secret key for JWT authentication |
| JWT_EXPIRES_IN | JWT expiration duration |

Update this table to reflect the exact variables in your `.env` and configuration files.

## 📡 API Documentation

Base URL:

```text
http://localhost:3000
```

### Health Check

| Method | Endpoint | Description |
|---|---|---|
| GET | `/health` | Checks whether the API is running |

### User Management

The following is a suggested REST API structure. Confirm the actual route paths and request fields in your `userRoutes.ts` and controller files.

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users` | Create a new user |
| GET | `/api/users` | Retrieve all users |
| GET | `/api/users/:id` | Retrieve a user by ID |
| PUT | `/api/users/:id` | Update an existing user |
| DELETE | `/api/users/:id` | Delete a user |

### Example: Create a User

**Request:**

```http
POST /api/users
Content-Type: application/json
```

Example request body (adjust to your Joi schema):

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "Password123",
  "age": 21
}
```

**Expected result:** A successful response indicating that the user was created.

Passwords should be hashed before being stored in the database.

### Common HTTP Status Codes

| Status Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 409 | Conflict |
| 500 | Internal Server Error |

## 🗄️ Database Migrations and Seeders

### Migrations

Migrations allow developers to manage database structure changes without manually recreating the database.

Generate a migration:

```bash
npm run typeorm -- migration:generate src/migrations/InitialSchema -d src/config/data-source.ts
```

Run migrations:

```bash
npm run typeorm -- migration:run -d src/config/data-source.ts
```

Revert a migration:

```bash
npm run typeorm -- migration:revert -d src/config/data-source.ts
```

### Seeders

Seeders insert sample or initial data into the database.

If a seeder implementation is available in the project, document its actual execution command here:

```bash
npm run seed
```

**Important:** The command above is an example. It will only work if a `seed` script is configured in `package.json` and a seeder has been implemented.

## 📁 Project Structure

```text
professional-boilerplate/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── services/
│   ├── entities/
│   ├── dto/
│   ├── middleware/
│   ├── utils/
│   ├── routes/
│   ├── migrations/
│   └── index.ts
│
├── tests/
│   ├── unit/
│   └── integration/
│
├── logs/
├── .env
├── .gitignore
├── package.json
└── tsconfig.json
```

## 🧪 Testing

Use Postman or Insomnia to test the API endpoints.

Recommended test cases:

1. Check the API health endpoint.
2. Create a user with valid information.
3. Retrieve all registered users.
4. Retrieve a specific user by ID.
5. Update user information.
6. Delete a user.
7. Test invalid input and missing required fields.
8. Verify that passwords are hashed before database storage.

## 💡 Reflection

### 1. What did you learn from building this boilerplate?

I learned how to structure a backend application using Node.js, TypeScript, Express.js, and TypeORM. I also gained a better understanding of how controllers, services, entities, routes, and middleware work together. This activity helped me understand the importance of organizing code into separate modules to make an application easier to maintain and expand.

### 2. What challenges did you encounter?

One of the challenges I encountered was configuring the development environment and connecting the application to the MySQL database. I also experienced dependency and TypeScript compatibility issues, missing modules, and errors involving database migrations. I addressed these issues by checking error messages, installing the required dependencies, correcting configurations, and debugging the code step by step.

### 3. How did you overcome these challenges?

I overcame these challenges by carefully analyzing the terminal output, reviewing my project structure, checking package versions, and correcting the necessary imports and configurations. I also used debugging techniques and documentation to understand why certain errors occurred instead of simply changing code without understanding the problem.

### 4. Why is a boilerplate important in backend development?

A boilerplate provides developers with a reusable foundation for building backend applications. It saves development time because essential features such as database connections, error handling, validation, logging, and security middleware are already organized. It also promotes consistency, maintainability, and scalability when developing future projects.

### 5. How can you improve this project in the future?

I can improve this project by implementing authentication and authorization using JWT, adding automated unit and integration tests, improving API documentation with Swagger, implementing pagination and filtering, and adding more advanced security features. I can also improve the database seeding process and introduce continuous integration and deployment workflows.

