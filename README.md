# User Management Application

A modern user management application built with Angular 20, NgRx state management, and Angular Material UI. Developed using Nx workspace for enhanced tooling and build performance, with json-server providing mock REST API.

## Features

- User authentication with login page
- Full CRUD operations for user management
- NgRx state management (actions, reducers, effects, selectors)
- Responsive design with Angular Material
- Form validation and error handling
- Unit tests for services, store, and components
- Standalone Components architecture


## Tech Stack

- **Frontend:** Angular 20 (Standalone Components), NgRx, Angular Material
- **Backend:** json-server (Mock REST API)
- **Development:** Nx (build system & tooling)
- **Testing:** Jest
- **Styling:** SCSS

## Prerequisites

- Node.js v22.x
- npm v10.x or higher
- Angular CLI v20.x
- Nx CLI

## Project Setup

### 1. Clone the repository

```bash
git clone https://github.com/Jasmeet957/user-management.git
cd user-management
```

### 2. Install dependencies

```bash
npm install
```

This will install all required packages including Angular 20, NgRx, Angular Material, and json-server.

## Running the Application

### Option 1: Run both frontend and backend together (Recommended)

```bash
npm start
```

This starts both the Angular app (http://localhost:4200) and json-server (http://localhost:3000) simultaneously.

### Option 2: Run separately

**Start backend:**
```bash
npm run server
```

**Start frontend (in a new terminal):**
```bash
npm run client
```

### Access the application

1. Open browser to http://localhost:4200
2. Login with credentials:
   - Username: `admin`
   - Password: `admin123`

## Running Tests

### Run all tests

```bash
npm test
```

### Run tests with coverage

```bash
nx test --code-coverage
```

### Run tests in watch mode

```bash
nx test --watch
```

## Project Structure

```
user-management-app/
│
├── src/
│   └── app/
│       ├── core/              # Services, guards, models
│       │   ├── guards/
│       │   ├── models/
│       │   └── services/
│       ├── environments/      # Environment configuration
│       ├── features/          # Feature components (standalone)
│       │   ├── auth/
│       │   │   └── login/
│       │   └── users/
│       │       ├── user-list/
│       │       └── user-form/
│       ├── shared/            # Shared components
│       ├── store/             # NgRx state management
│       │   ├── auth/
│       │   └── users/
│       ├── app.component.ts   # Root component
│       ├── app.config.ts      # App configuration
│       └── app.routes.ts      # Routes
├── db.json                    # json-server database
└── README.md
```

## Architecture & Design Decisions

### Standalone Components Architecture

The application uses Angular's modern standalone components instead of NgModules. This provides:

- **Simpler structure:** No need to manage NgModules
- **Explicit dependencies:** All imports clearly visible in components
- **Better tree-shaking:** Improved bundle size optimization
- **Easier testing:** Components tested without module setup
- **Lazy loading:** Component-level code splitting

### NgRx State Management

NgRx is used for centralized state management with:

- **Actions:** Define all possible state changes
- **Reducers:** Pure functions that handle state updates
- **Effects:** Manage side effects (HTTP calls, navigation)
- **Selectors:** Query and derive state efficiently
- **Entity Adapter:** Normalized state for user collections

### Functional Guards

Route protection uses functional guards (`CanActivateFn`) with the modern `inject()` function for dependency injection, replacing class-based guards.

### Reactive Forms

All forms use Angular Reactive Forms for:
- Better type safety
- Easier testing
- Complex validation support
- Immutable data flow

### Service Layer

Business logic is separated into services:
- **AuthService:** Authentication logic and session management
- **UserService:** HTTP operations for user CRUD

### Lazy Loading

Feature components are lazy-loaded for optimal performance:
```typescript
{
  path: 'users',
  loadComponent: () => import('./features/users/user-list.component')
}
```

### Error Handling

Centralized error handling in NgRx Effects with user-friendly error messages displayed via Material snackbars.

### Responsive Design

Mobile-first responsive design using CSS Grid, Flexbox, and Angular Material's responsive utilities.

## API Endpoints

Base URL: `http://localhost:3000`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/users` | Get all users |
| GET | `/users/:id` | Get user by ID |
| POST | `/users` | Create new user |
| PUT | `/users/:id` | Update user |
| DELETE | `/users/:id` | Delete user |

### User Model

```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "jobRole": "tech"
}
```

**Job Roles:** `tech`, `id`, `gd`, `qa`

## Available Scripts

- `npm start` - Run both frontend and backend
- `npm run client` - Run Angular app only
- `npm run server` - Run json-server only
- `npm run build` - Build for production
- `npm test` - Run unit tests

## Development Guidelines

### Generate new standalone component
```bash
nx g @nx/angular:component features/component-name --style=scss --type=component
```

### Generate new service
```bash
nx g @nx/angular:service core/services/service-name --type=service
```

### Generate new functional guard
```bash
nx g @nx/angular:guard core/guards/guard-name
```

## Troubleshooting

### Port already in use
If ports 3000 or 4200 are in use:
```bash
# Change json-server port
json-server --watch db.json --port 3001

# Change Angular port
nx serve user-management --port 4201
```