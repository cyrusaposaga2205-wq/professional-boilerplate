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



# Professional Boilerplate — JWT Authentication API

A RESTful backend boilerplate built with **Node.js**, **Express.js**, **TypeScript**, **TypeORM**, and **MySQL**, now secured with **JSON Web Token (JWT)** authentication, password hashing with **bcrypt**, request validation via **Joi**, and route-level protection middleware[cite: 1, 2, 4, 11, 13].

---

## Features

- **User Authentication:** Email/password login issuing signed JWT access tokens[cite: 4, 5, 6].
- **Stateless Route Protection:** Express middleware (`authMiddleware`) that extracts and verifies `Bearer` tokens and attaches the decoded user payload to `req.user`[cite: 9, 10].
- **Password Security:** Passwords hashed using `bcrypt` prior to storage and compared securely during login[cite: 5].
- **Environment & Input Validation:** Schema validation using `Joi` for environment variables (`JWT_SECRET`, `JWT_EXPIRES_IN`) and incoming request payloads[cite: 2, 3, 11].
- **Structured Logging & Error Handling:** Centralized error responses (`UNAUTHORIZED`, `VALIDATION_ERROR`, etc.) and request logging[cite: 13, 17, 19].

---

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Generate a Secure JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 3. Configure `.env`
Create a `.env` file in the project root:
```env
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_mysql_password
DB_DATABASE=boilerplate_db

# Frontend URL for CORS
FRONTEND_URL=http://localhost:4200

# JWT Configuration
JWT_SECRET=paste-your-generated-64-byte-hex-secret-here
JWT_EXPIRES_IN=24h
```

### 4. Start the Development Server
```bash
npm run dev
```

---

## Authentication Flow

1. **Registration (`POST /api/users`):** A user creates an account with a name, email, password, and age. The password is hashed with `bcrypt` before saving to MySQL[cite: 14].
2. **Login (`POST /api/auth/login`):** The client submits `email` and `password`. `AuthService` validates the payload, verifies the user exists and is active, checks the password with `bcrypt.compare()`, and signs a JWT containing `{ userId, email }` using `JWT_SECRET`[cite: 4, 5, 6, 12].
3. **Token Storage (Client-Side):** The client receives the JWT in the response and stores it for subsequent requests[cite: 15, 16].
4. **Authenticated Requests:** For protected routes, the client sends the token in the HTTP header as `Authorization: Bearer <token>`[cite: 10, 16].
5. **Middleware Verification:** `authMiddleware` extracts the token, verifies its signature and expiration with `jwt.verify()`, attaches `{ userId, email }` to `req.user`, and passes control to the route controller. Invalid, expired, or missing tokens return `401 Unauthorized`[cite: 6, 9, 10, 17].

---

## How to Get a Token

Send a `POST` request to `/api/auth/login` with valid credentials[cite: 15]:

```http
POST http://localhost:3000/api/auth/login
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "Password123"
}
```

**Sample Response (`200 OK`):**
```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": {
      "id": 1,
      "email": "test@example.com",
      "name": "Test User"
    }
  }
}
```

---

## How to Use the Token

Include the token in the `Authorization` header using the `Bearer` scheme on any protected endpoint[cite: 10, 16]:

```http
GET http://localhost:3000/api/users
Authorization: Bearer <your_token_here>
```

---

## API Endpoints

### Public Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Check API and server health status[cite: 13] |
| `POST` | `/api/users` | Register/create a new user account[cite: 14] |
| `POST` | `/api/auth/login` | Authenticate user credentials and return a JWT[cite: 12, 15] |

### Protected Endpoints (Requires `Authorization: Bearer <token>`)
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/auth/me` | Retrieve the currently authenticated user's profile[cite: 8, 12, 17] |
| `GET` | `/api/users` | Retrieve a paginated list of all users[cite: 16] |
| `GET` | `/api/users/:id` | Retrieve a specific user by ID |
| `PUT` | `/api/users/:id` | Update a specific user by ID |
| `DELETE` | `/api/users/:id` | Delete a specific user by ID |

---

## Reflection Questions

### 1. What is the difference between authentication and authorization? Give a real-world example of each.
- **Authentication** verifies *who* a user is (confirming identity).
  - *Example:* Logging into a university portal with your student ID and password, or showing a government ID at airport security.
- **Authorization** determines *what* an authenticated user is allowed to access or do (verifying permissions).
  - *Example:* After logging in, a student can view their own grades, whereas an instructor can edit grades for their assigned courses—or a boarding pass permitting entry only to a specific flight gate.

### 2. Why is JWT considered "stateless" and how does that benefit scalability?
A JWT is **stateless** because all identity and session metadata (such as `userId`, `email`, issued-at timestamp, and expiration) are encoded directly inside the signed token itself rather than stored in server memory or a database session table[cite: 4, 6, 15, 24]. Because any backend instance with the shared `JWT_SECRET` can independently verify the token, incoming requests do not need sticky sessions or centralized session lookups[cite: 6, 24]. This makes horizontal scaling across multiple servers or containers straightforward and low-latency.

### 3. What are the three parts of a JWT token and what does each part do?
A JWT consists of three Base64Url-encoded strings separated by dots (`header.payload.signature`)[cite: 15, 24]:
1. **Header:** Specifies the token type (`JWT`) and the cryptographic signing algorithm used (e.g., `HS256`).
2. **Payload:** Contains the claims—data about the user and token metadata (such as `userId`, `email`, `iat` issued-at, and `exp` expiration)[cite: 4, 6, 15].
3. **Signature:** Created by signing the encoded header and payload with the server's secret key (`JWT_SECRET`). It guarantees token integrity so the server can detect if anyone tampered with the payload[cite: 6].

### 4. Why should you never put sensitive data (like passwords) in the JWT payload?
The header and payload of a standard JWT are only **Base64Url-encoded**, not encrypted[cite: 24]. Anyone who intercepts or inspects the token (via browser storage, logs, or tools like `jwt.io`) can immediately decode and read the payload in plain text[cite: 23, 24]. Storing passwords, API keys, or personal secrets in the payload exposes that data directly.

### 5. How does bcrypt protect user passwords? What is the purpose of the "salt" and "rounds"?
`bcrypt` is a one-way adaptive cryptographic password-hashing function designed to be computationally slow to resist brute-force attacks:
- **Salt:** A unique, random string generated per password before hashing. It ensures two users with the exact same password produce completely different hashes, defeating precomputed rainbow-table attacks.
- **Rounds (Cost Factor):** Controls how many iterations ($2^{\text{rounds}}$) the key-stretching algorithm runs. Increasing rounds makes each hash calculation slower, allowing security to scale alongside faster hardware.

### 6. What happens if someone steals a JWT token? How can you mitigate this risk?
Because JWTs are self-contained and valid until expiration, an attacker who steals a token can impersonate that user and access protected routes until the token expires[cite: 6, 22, 24]. Mitigations include:
- Setting **short expiration times** (`JWT_EXPIRES_IN`, e.g., 15 minutes to 24 hours)[cite: 2, 22].
- Always transmitting tokens over **HTTPS**[cite: 22].
- Storing tokens in **`HttpOnly`, `Secure`, `SameSite` cookies** rather than `localStorage` to protect against XSS theft.
- Maintaining a **token blacklist/denylist** (e.g., in Redis) for immediate revocation on logout or suspected compromise[cite: 23].

### 7. Why is it important to use HTTPS when transmitting JWT tokens?
Over plain HTTP, traffic is sent in clear text, allowing anyone on the same network (such as public Wi-Fi) to capture the `Authorization: Bearer <token>` header via a Man-in-the-Middle (MitM) attack[cite: 16, 22]. HTTPS encrypts the entire HTTP request and headers in transit with TLS, preventing eavesdroppers from intercepting the token.

### 8. What is the difference between a short-lived access token and a long-lived refresh token? When would you use each?
- **Short-lived Access Token (e.g., 15 minutes):** Sent with every API request in the `Authorization` header to grant access to protected resources[cite: 16]. Its short lifespan limits the window of damage if intercepted.
- **Long-lived Refresh Token (e.g., 7–30 days):** Stored securely (typically in an `HttpOnly` cookie and tracked in the database) and sent *only* to a dedicated refresh endpoint to obtain a new access token once the current one expires[cite: 23]. This balances strong security with a seamless user experience without forcing frequent re-logins[cite: 23].

### 9. How does the auth middleware know which user is making the request?
`authMiddleware` reads the `Authorization` header, extracts the token after `Bearer `, and passes it to `AuthService.verifyToken()`, which calls `jwt.verify(token, config.jwt.secret)`[cite: 6, 10]. Once the signature and expiration are validated, `jwt.verify()` returns the decoded payload (`{ userId, email }`), which the middleware attaches to `req.user` so downstream controllers know the authenticated user's identity[cite: 4, 6, 10].

### 10. If you had to implement role-based authorization (e.g., admin vs. regular user), how would you modify your current setup?
1. **Database & Entity (`User`):** Add a `role` column (e.g., `'user' | 'admin'`, defaulting to `'user'`) to the `User` entity and database schema.
2. **Token & Request Types:** Include `role` in `TokenPayload` when signing the JWT in `AuthService.login()` (and update the Express `Request.user` interface in `src/middleware/auth.ts`)[cite: 4, 6, 9].
3. **Authorization Middleware:** Create a `requireRole(...allowedRoles: string[])` middleware that runs *after* `authMiddleware`, checks `req.user?.role`, and throws a `403 Forbidden` error if the user's role is not permitted.
4. **Route Protection:** Chain `requireRole('admin')` onto admin-only endpoints (such as `DELETE /api/users/:id`).