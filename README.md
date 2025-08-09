# Task Management API - Setup and Overview

## Application Description

The Task Management API is a NestJS-based RESTful API that provides task management functionality with user authentication. The application allows users to create, read, update, and delete tasks while ensuring that users can only access their own tasks through JWT-based authentication.

Key features include:

- User registration and authentication with JWT tokens
- CRUD operations for tasks (Create, Read, Update, Delete)
- Task filtering and search capabilities
- Role-based access control (users can only access their own tasks)
- Docker-based deployment for easy setup and development

## Technology Stack

- **Framework**: NestJS (TypeScript)
- **Database**: PostgreSQL
- **ORM**: TypeORM
- **Authentication**: JWT (JSON Web Tokens)
- **Validation**: class-validator
- **Password Security**: bcryptjs
- **Deployment**: Docker & Docker Compose

## Setup Instructions

### Prerequisites

- Node.js (v18 or higher)
- Docker & Docker Compose
- pnpm package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd task-management
   ```

2. Start the application with Docker:

   ```bash
   bash docker-start.sh
   ```


### Executing Commands in the Container

To execute commands inside the running container, use the provided script:

```bash
  bash app-exec.sh
```

This will open a shell session inside the running container where you can run commands like:

- `pnpm run test` - Run unit tests
- `pnpm run test:e2e` - Run end-to-end tests
- `pnpm run test:cov` - Run tests with coverage report

### Environment Configuration

The application uses the following environment configuration:


## API Usage Flow

### Authentication Flow

1. **User Registration**:
    - Client sends POST request to `/auth/signup` with username and password
    - Password is hashed using bcrypt before storage
    - User is stored in database

2. **User Authentication**:
    - Client sends POST request to `/auth/signin` with credentials
    - Server validates credentials against database
    - JWT token is generated and returned to client

3. **Accessing Protected Resources**:
    - Client includes JWT token in Authorization header
    - AuthGuard validates token using JwtStrategy
    - User context is attached to request
    - Controller processes request with user context

### Task Management Flow

1. **Create Task**:
    - Client sends POST request to `/tasks` with task data
    - Controller validates input and calls service
    - Service uses repository to store task in database
    - Created task is returned to client

2. **Get Tasks**:
    - Client sends GET request to `/tasks` with optional filters
    - Controller calls service with filter parameters
    - Service uses repository to query database
    - Filtered tasks are returned to client

3. **Update Task Status**:
    - Client sends PATCH request to `/tasks/:id/status` with new status
    - Controller validates input and calls service
    - Service uses repository to update task in database
    - Updated task is returned to client

4. **Delete Task**:
    - Client sends DELETE request to `/tasks/:id`
    - Controller calls service to delete task
    - Service uses repository to remove task from database
    - Success message is returned to client