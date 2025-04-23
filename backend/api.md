# Authentication API Documentation

## Base URL
```
http://localhost:<your_port>/api/auth
```
Replace `<your_port>` with your server's port number (default is 3000).

---

## Endpoints

### 1. Register User

- **URL:** `/register`
- **Method:** POST
- **Description:** Register a new user. New users require admin approval before they can log in.
- **Request Body:**
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - Success (201):
    ```json
    {
      "message": "User registered successfully. Await admin approval",
      "success": false
    }
    ```
  - Failure (409 - User exists):
    ```json
    {
      "message": "User already exists",
      "success": false
    }
    ```

---

### 2. Login User

- **URL:** `/login`
- **Method:** POST
- **Description:** Login a user and receive a JWT token if credentials are valid and user is approved.
- **Request Body:**
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response:**
  - Success (200):
    ```json
    {
      "message": "Login Successful",
      "success": true,
      "jwtToken": "string"
    }
    ```
  - Failure (400 - Invalid credentials):
    ```json
    {
      "message": "Invalid email or password",
      "success": false
    }
    ```
  - Failure (403 - Not approved):
    ```json
    {
      "message": "Account not approved by admin",
      "success": false
    }
    ```

---

### 3. Get Pending Users (Admin Only)

- **URL:** `/pending`
- **Method:** GET
- **Description:** Retrieve a list of users pending admin approval.
- **Headers:**
  - Authorization: Bearer `<admin_jwt_token>`
- **Response:**
  - Success (200):
    ```json
    [
      {
        "_id": "string",
        "username": "string",
        "email": "string",
        "role": "string",
        "isApproved": false,
        "createdAt": "date",
        "updatedAt": "date"
      },
      ...
    ]
    ```
  - Failure (401 or 403): Unauthorized or forbidden if token is missing or user is not admin.

---

### 4. Approve User (Admin Only)

- **URL:** `/approve/:id`
- **Method:** PUT
- **Description:** Approve a user by their ID.
- **Headers:**
  - Authorization: Bearer `<admin_jwt_token>`
- **URL Parameters:**
  - `id` - The user ID to approve.
- **Response:**
  - Success (200):
    ```json
    {
      "message": "User approved successfully",
      "success": true
    }
    ```
  - Failure (404 - User not found):
    ```json
    {
      "message": "User not found"
    }
    ```

---

## Notes

- All admin routes require a valid JWT token with admin role in the Authorization header.
- JWT tokens are obtained from the login endpoint.
- Use the `Authorization` header in the format: `Bearer <jwt_token>` for protected routes.
