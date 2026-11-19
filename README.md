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

## Reflection Questions

### 1. What was the most challenging part of building this boilerplate? How did you overcome it?

The most challenging part of building this boilerplate was understanding how the different parts of the backend work together, especially the database configuration, migrations, middleware, and error handling. At first, it was difficult to understand how requests move from routes to controllers and services before reaching the database. I overcame this by following the implementation step by step, reviewing the code, testing the endpoints, and fixing errors whenever they appeared. Through this process, I gained a better understanding of how to organize a backend project properly.

### 2. How does this boilerplate differ from your Midterm project? What specific improvements did you make?

Compared to my Midterm project, this boilerplate has a more organized and professional backend structure. Instead of placing most of the logic in a single file or having less organized code, I separated the application into different folders such as controllers, routes, services, entities, DTOs, middleware, and configuration. I also implemented TypeScript for better type safety, Joi for request validation, centralized error handling, Winston for structured logging, and database migrations and seeders. These improvements make the project easier to maintain, understand, test, and expand.

### 3. Why is centralized error handling better than try-catch in every controller?

Centralized error handling is better because it avoids repeating the same error-handling code in every controller. Instead of writing multiple try-catch blocks, errors can be passed to one error-handling middleware that manages them consistently. It also makes the code cleaner and easier to maintain. Most importantly, it helps provide consistent error responses to clients while preventing sensitive technical information from being exposed.

### 4. How does request validation with Joi improve security and code quality?

Joi improves security and code quality by checking incoming data before it reaches the main application logic. It ensures that required fields are present and that values follow the expected format and data types. For example, when creating a user, Joi can validate the email format, name, and password requirements. This helps prevent invalid or unexpected data from entering the application, reduces errors, and makes the code more reliable.

### 5. What's the difference between synchronize: true and migrations? Why are migrations essential for production?

The difference is that `synchronize: true` automatically updates the database schema based on the entities in the application, while migrations allow developers to manually define and control database changes. Synchronization may be convenient during development, but it can cause unexpected changes or data loss in an existing database. Migrations are essential in production because they provide a controlled and trackable way to update database structures. They also make it easier to apply consistent database changes across different environments.

### 6. How does structured logging (Winston) help in production debugging compared to console.log?

Winston provides more organized and detailed logs compared to using `console.log`. It supports different log levels such as error, warn, info, and debug, making it easier to identify important events and problems. It can also include timestamps and additional information and save logs to files. This is useful in production because developers can investigate errors, monitor application activities, and understand what happened without relying only on simple console messages.

### 7. If you had to add a new feature (e.g., Product CRUD), how would you use this boilerplate? What would you need to add?

If I had to add a Product CRUD feature, I would follow the existing project structure to keep the code organized and consistent. First, I would create a Product entity to define the database structure. Next, I would create a Product DTO for validating incoming data using Joi. I would also add a Product service for handling business logic, a Product controller for processing requests, and a Product route for defining the API endpoints. After that, I would create a database migration for the products table and connect the new routes to the main application. Finally, I would test the endpoints to make sure that creating, reading, updating, and deleting products work correctly.

### 8. What additional features would you add to make this boilerplate even more production-ready?

To make this boilerplate more production-ready, I would add authentication and authorization using JWT and role-based access control. I would also implement automated testing using tools such as Jest, rate limiting to protect the API from excessive