# better-auth-server

**View Chinese Documentation**: [README.md](README.md)

[![DeepWiki Index](https://deepwiki.com/badge.svg)](https://deepwiki.com/jacket-sikaha/better-auth-server)

<div align="center">
  <p>
    <b>better-auth-server</b>
  </p>
  <p>
    🚀 Universal Authentication Service based on better-auth
  </p>
</div>

## 📋 Project Overview

better-auth-server is a universal authentication service built with Next.js and better-auth library, providing comprehensive user authentication solutions and token distribution capabilities. It can be easily integrated into any application system that requires authentication.

### Key Features

- 🔐 **Complete Authentication System** - Supports email/password login, registration, password reset, and more
- 🎯 **Token Distribution** - Generates and manages JWT tokens for inter-service authorization
- 📦 **Containerized Deployment** - Supports Docker and Docker Compose one-click deployment
- 🎨 **Modern UI** - Beautiful interface based on Ant Design
- 📊 **Admin Panel** - Provides user management and system monitoring features
- 🔌 **REST API** - Standardized authentication API interfaces

## 🚀 Main Features

### Authentication Features

✅ **User Registration**

- Email verification
- Password strength checking

✅ **User Login**

- Email/password login
- Remember me functionality

✅ **Password Management**

- Password reset

✅ **Token Management**

- JWT token generation
- Token invalidation management

✅ **Configuration Management**

- Authentication policy configuration
- Token expiration time setting

## 🛠️ Technology Stack

| Technology/Framework | Version | Purpose                |
| -------------------- | ------- | ---------------------- |
| Next.js              | ^16.0.0 | React Framework        |
| React                | ^19.1.0 | UI Library             |
| Ant Design           | ^6.0.0  | UI Component Library   |
| TypeScript           | ^5      | Type System            |
| Tailwind CSS         | ^4      | Styling Framework      |
| better-auth          | ^1.5.0  | Authentication Library |
| Prisma               | ^7.6.0  | ORM Framework          |
| SQLite               | -       | Database               |

## 📦 Installation & Deployment

### Docker Deployment (Recommended)

```bash
docker-compose up -d
```

### Docker Compose Configuration Example

```yaml
version: "3.8"

services:
  better-auth-server:
    image: docker.io/sikaha/better-auth-server:latest
    container_name: better-auth-server
    ports:
      - "3000:3000"
    environment:
      - AUTH_SECRET=your-secret # Replace with actual authentication secret
      - DATABASE_URL=sqlite:///db/dev.db
    volumes:
      - ./db:/app/db
    restart: unless-stopped
    networks:
      - auth-network

networks:
  auth-network:
    driver: bridge
```

### Local Development

```bash
# Install dependencies
pnpm install

# Generate authentication secret
pnpm auth

# Initialize database
pnpm prisma:init

# Generate Prisma Client
pnpm prisma:generate

# Generate authentication system schema
pnpm auth:generate

# Update local generated/prisma/models files
pnpm prisma:generate

# Sync schema to database
pnpm prisma:migrate

# Start development server
pnpm dev

# Build production version
pnpm build

# Start production server
pnpm start
```

## 🔧 Environment Variables

| Environment Variable | Description             | Default Value |
| -------------------- | ----------------------- | ------------- |
| AUTH_SECRET          | Authentication secret   | -             |
| DATABASE_URL         | Database connection URL | -             |
| PORT                 | Application port        | 3000          |
| SMTP_HOST            | SMTP server address     | -             |
| SMTP_PORT            | SMTP server port        | 587           |
| SMTP_USER            | SMTP username           | -             |
| SMTP_PASS            | SMTP password           | -             |
| SMTP_FROM            | Sender email address    | -             |

## 📡 API Interfaces

### Authentication Interfaces

#### Register

```
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Login

```
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get Token

```
POST /api/auth/token
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Refresh Token

```
POST /api/auth/refresh
Content-Type: application/json

{
  "refreshToken": "your-refresh-token"
}
```

#### Verify Token

```
POST /api/auth/verify
Content-Type: application/json

{
  "token": "your-jwt-token"
}
```

## 📱 Interface Features

### Login Page

- Email/password login
- Forgot password functionality
- Responsive design

### Registration Page

- User registration form
- Password strength indicator
- Email verification

### Control Panel

- User information display
- Token management

## 🤝 Contribution

Contributions to better-auth-server are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or suggestions, please submit issues in the GitHub repository.
