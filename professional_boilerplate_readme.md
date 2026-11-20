# Professional Express + TypeScript API Boilerplate (with JWT Authentication)

A production-ready RESTful API built with **Node.js**, **Express**, **TypeScript**, **TypeORM**, and **MySQL**. This project features structured environment validation, request payload validation with Joi, centralized error handling, security middleware (Helmet, CORS, rate limiting), structured logging, and stateless **JSON Web Token (JWT)** authentication to protect sensitive user resources.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Authentication Flow](#authentication-flow)
- [How to Get a Token (Login Endpoint)](#how-to-get-a-token-login-endpoint)
- [How to Use the Token (`Authorization` Header)](#how-to-use-the-token-authorization-header)
- [API Endpoints (Public vs. Protected)](#api-endpoints-public-vs-protected)
- [Reflection Questions & Answers](#reflection-questions--answers)

---

## Tech Stack

- **Runtime & Framework:** Node.js, Express
- **Language:** TypeScript
- **Database & ORM:** MySQL, TypeORM
- **Authentication & Security:** `jsonwebtoken`, `bcrypt`, Helmet, CORS, Express Rate Limit
- **Validation & Logging:** Joi, Winston / custom logger

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate a cryptographically secure JWT secret:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
   ```

3. **Configure `.env`:**
   Create a `.env` file in the root directory using the variables below:
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

4. **Start the development server:**
   ```bash
   npm run dev
   ```

---

## Authentication Flow

This API uses stateless **JWT Bearer Authentication**:

1. **Registration (`POST /api/users`):** A new user registers with their details. Their password is hashed using `bcrypt` before being stored in MySQL.
2. **Login (`POST /api/auth/login`):**
   - Joi (`loginSchema`) validates the email format and password length.
   - `AuthService.login()` looks up the user by email, verifies that `isActive` is `true`, and compares the submitted password against the stored `bcrypt` hash.
   - Upon valid credentials, the server signs a JWT containing `{ userId, email }` using `JWT_SECRET` and an expiration time (`JWT_EXPIRES_IN`), returning the token and sanitized user profile.
3. **Accessing Protected Routes:**
   - The client attaches the token in the `Authorization: Bearer <token>` header on subsequent requests.
   - `authMiddleware` extracts the token, verifies its signature and expiration via `AuthService.verifyToken()`, and attaches the decoded `{ userId, email }` payload to `req.user`.
   - If the header is missing, malformed, expired, or tampered with, the middleware throws an `UnauthorizedError` (`401 Unauthorized`).

---

## How to Get a Token (Login Endpoint)

Send a `POST` request to `/api/auth/login` with a valid user's email and password:

- **URL:** `POST http://localhost:3000/api/auth/login`
- **Headers:**
  ```http
  Content-Type: application/json
  ```
- **Request Body:**
  ```json
  {
    "email": "test@example.com",
    "password": "Password123"
  }
  ```
- **Success Response (`200 OK`):**
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

## How to Use the Token (`Authorization` Header)

Copy the `token` string returned from `/api/auth/login` and send it in the `Authorization` header using the `Bearer` scheme for any protected route:

- **Header Format:**
  ```http
  Authorization: Bearer <YOUR_JWT_TOKEN>
  ```
- **Example Request (`GET /api/auth/me`):**
  ```bash
  curl -X GET http://localhost:3000/api/auth/me \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  ```

---

## API Endpoints (Public vs. Protected)

### Public Endpoints (No Token Required)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Check API and server health status |
| `POST` | `/api/users` | Register/create a new user account |
| `POST` | `/api/auth/login` | Authenticate user credentials and receive a JWT |

### Protected Endpoints (`Authorization: Bearer <token>` Required)

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/auth/me` | Retrieve the currently authenticated user's profile |
| `GET` | `/api/users` | Retrieve a paginated list of users |
| `GET` | `/api/users/:id` | Retrieve a single user by ID |
| `PUT` | `/api/users/:id` | Update an existing user by ID |
| `DELETE` | `/api/users/:id` | Delete a user by ID |

---

## Reflection Questions & Answers

### 1. What is the difference between authentication and authorization? Give a real-world example of each.
- **Authentication** verifies *who* a user is (confirming their identity), whereas **authorization** determines *what* an authenticated user is permitted to do or access.
- **Real-world example:** At an airport, showing your government-issued passport at check-in or security to prove your identity is **authentication**. Scanning your boarding pass to enter a specific terminal gate or board a first-class cabin is **authorization**.

### 2. Why is JWT considered "stateless" and how does that benefit scalability?
- A JWT is **stateless** because all information needed to verify the user's identity and session validity (such as `userId`, `email`, and expiration timestamp) is self-contained inside the cryptographically signed token itself. The server does not need to store session records in memory or query a session table in the database on every request.
- **Scalability benefit:** Because no session state is tied to a specific server instance, incoming requests can be routed by a load balancer to *any* server in a horizontally scaled cluster. Any server holding the shared `JWT_SECRET` can independently verify the token without shared session storage bottlenecks.

### 3. What are the three parts of a JWT token and what does each part do?
A JWT consists of three Base64Url-encoded strings separated by dots (`header.payload.signature`):
1. **Header:** Specifies metadata about the token, primarily the token type (`"typ": "JWT"`) and the cryptographic signing algorithm used (e.g., `"alg": "HS256"`).
2. **Payload:** Contains the *claims*—the data being transmitted, such as custom user identifiers (`userId`, `email`) and standard claims like issued-at (`iat`) and expiration time (`exp`).
3. **Signature:** Created by signing the encoded header and payload together with the server's `JWT_SECRET`. It guarantees data integrity—if anyone modifies the header or payload, the signature check fails during `jwt.verify()`.

### 4. Why should you never put sensitive data (like passwords) in the JWT payload?
The header and payload of a standard JWT are only **Base64Url-encoded**, not encrypted. Anyone who intercepts or inspects the token (e.g., via browser DevTools or jwt.io) can immediately decode the payload and read its contents in plain text. Therefore, passwords, API keys, Social Security numbers, or other confidential data must never be included in the payload.

### 5. How does bcrypt protect user passwords? What is the purpose of the "salt" and "rounds"?
- `bcrypt` protects passwords using a one-way cryptographic hashing function designed specifically to be computationally slow, making brute-force and dictionary attacks impractical.
- **Salt:** A unique, random string generated for every password before hashing. It ensures that two users with the exact same password produce completely different hashes, defending against precomputed rainbow table attacks.
- **Rounds (Cost Factor):** Determines how many iterations ($2^{\text{rounds}}$) the key-stretching algorithm runs. Increasing the rounds exponentially increases the time required to compute a hash, allowing security to scale as hardware gets faster.

### 6. What happens if someone steals a JWT token? How can you mitigate this risk?
- Because JWTs are stateless bearer tokens, anyone who steals a valid token can impersonate the legitimate user and access protected endpoints until the token expires.
- **Mitigations:**
  - Use **short expiration times** (e.g., 15–60 minutes) to limit the window of exposure.
  - Always transmit tokens over **HTTPS** so they cannot be sniffed in transit.
  - Store tokens securely on the client (such as `HttpOnly`, `Secure`, `SameSite` cookies rather than `localStorage` to mitigate XSS theft).
  - Implement a **token blacklist/denylist** (e.g., in Redis) or refresh-token rotation to revoke compromised tokens on logout or suspicious activity.

### 7. Why is it important to use HTTPS when transmitting JWT tokens?
Over plain HTTP, network traffic—including HTTP headers like `Authorization: Bearer <token>`—is sent in cleartext. Attackers on the same network (such as public Wi-Fi) can perform Man-in-the-Middle (MitM) packet sniffing to capture the token and hijack the user's session. HTTPS encrypts the entire TLS channel, protecting credentials during login and JWTs on every subsequent request.

### 8. What is the difference between a short-lived access token and a long-lived refresh token? When would you use each?
- **Access Token:** A short-lived JWT (e.g., 15 minutes) sent with every API request in the `Authorization` header to grant access to protected resources. Its short lifespan minimizes damage if intercepted.
- **Refresh Token:** A long-lived token (e.g., 7–30 days) stored securely (often in an `HttpOnly` cookie and tracked in the database) whose sole purpose is to request a new access token once the current one expires.
- **When to use each:** Use the **access token** on regular API calls (`/api/users`, `/api/auth/me`) for fast stateless authorization, and use the **refresh token** only against a dedicated `/api/auth/refresh` endpoint to seamlessly renew sessions without forcing the user to log in repeatedly.

### 9. How does the auth middleware know which user is making the request?
1. `authMiddleware` reads the `Authorization` header (`Bearer <token>`) and passes the token to `AuthService.verifyToken(token)`.
2. `jwt.verify()` validates the token's cryptographic signature against `config.jwt.secret` and checks that it has not expired, returning the decoded payload (`{ userId, email }`).
3. The middleware attaches that decoded payload directly to the Express request object (`req.user = decoded`), allowing downstream controllers to read `req.user.userId` or `req.user.email` to identify the caller.

### 10. If you had to implement role-based authorization (e.g., admin vs. regular user), how would you modify your current setup?
1. **Database & Entity (`User.ts`):** Add a `role` column to the `User` entity (e.g., `enum: ['user', 'admin']`, defaulting to `'user'`).
2. **Token Payload (`AuthService.ts`):** Include `role: user.role` in `TokenPayload` when signing the JWT during login, and extend Express's `Request['user']` TypeScript interface to include `role`.
3. **Authorization Middleware (`src/middleware/authorize.ts`):** Create a role-checking middleware factory (e.g., `requireRole(...allowedRoles: string[])`) that runs *after* `authMiddleware` and verifies `req.user && allowedRoles.includes(req.user.role)`, throwing a `ForbiddenError` (`403 Forbidden`) if the user lacks permission.
4. **Routes (`userRoutes.ts`):** Chain `requireRole('admin')` onto admin-only endpoints (such as `DELETE /api/users/:id`).