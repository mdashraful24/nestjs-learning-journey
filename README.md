# NestJS Learning Journey

A small NestJS ticket-management API built while learning the fundamentals of NestJS, including modules, controllers, services, DTOs, validation, and dependency injection.

## What this project includes

- A `TicketsModule` with an HTTP controller and service
- In-memory ticket storage
- Create, list, and retrieve ticket endpoints
- Optional filtering by ticket status and priority
- Request validation with `class-validator`
- Global `/api` route prefix
- Rejection of unknown request fields

> **Current limitation:** tickets are stored in memory. All created tickets are lost when the application restarts, and this project does not use a database yet.

## Prerequisites

- Node.js
- npm

## Getting started

Install dependencies:

```bash
npm install
```

Start the application in development mode:

```bash
npm run start:dev
```

The API is available at:

```text
http://localhost:3000/api
```

## Available scripts

| Command | Description |
| --- | --- |
| `npm run start` | Start the application |
| `npm run start:dev` | Start the application in watch mode |
| `npm run start:debug` | Start in watch mode with the Node.js debugger |
| `npm run build` | Compile the application |
| `npm run start:prod` | Run the compiled application from `dist` |
| `npm run format` | Format TypeScript source and test files with Prettier |

## API reference

All routes use the `/api` prefix.

### List tickets

```http
GET /api/tickets
```

Optional query parameters:

- `status`: `open` or `closed`
- `priority`: `low`, `medium`, or `high`

Example:

```bash
curl "http://localhost:3000/api/tickets?status=open&priority=high"
```

Example response:

```json
[
  {
    "id": 1,
    "subject": "Cannot login to account",
    "description": "User cannot log in to the application.",
    "priority": "high",
    "status": "open",
    "createdAt": "2026-10-11T10:00:00.000Z"
  }
]
```

### Get a ticket

```http
GET /api/tickets/:id
```

Example:

```bash
curl http://localhost:3000/api/tickets/1
```

The `id` must be an integer. A missing ticket returns `404 Not Found`.

### Create a ticket

```http
POST /api/tickets
Content-Type: application/json
```

Request body:

```json
{
  "subject": "Unable to update profile",
  "description": "The profile form returns an error when it is submitted.",
  "priority": "medium"
}
```

Example:

```bash
curl -X POST http://localhost:3000/api/tickets ^
  -H "Content-Type: application/json" ^
  -d "{\"subject\":\"Unable to update profile\",\"description\":\"The profile form returns an error when it is submitted.\",\"priority\":\"medium\"}"
```

The `subject` and `description` fields must be non-empty strings. The `priority` field must be `low`, `medium`, or `high`. The API assigns the ticket ID, sets its status to `open`, and generates `createdAt`.

Unknown request fields are rejected by the global validation pipe.

## Project structure

```text
src/
├── app.module.ts
├── main.ts
└── tickets/
    ├── ticket.interface.ts
    ├── tickets.controller.ts
    ├── tickets.module.ts
    ├── tickets.service.ts
    └── dto/
        ├── create-ticket.dto.ts
        └── filter-tickets-query.dto.ts
```

## Learning topics

This project is intended as a progression through common NestJS concepts:

1. Bootstrapping an application with `NestFactory`
2. Organizing features with modules
3. Handling requests with controllers
4. Encapsulating application logic in services
5. Validating request bodies and query parameters with DTOs
6. Using pipes such as `ParseIntPipe` and `ValidationPipe`
7. Returning HTTP errors with NestJS exceptions

## Useful resources

- [NestJS documentation](https://docs.nestjs.com)
- [NestJS controllers](https://docs.nestjs.com/controllers)
- [NestJS providers](https://docs.nestjs.com/providers)
- [NestJS validation](https://docs.nestjs.com/techniques/validation)

## License

This project is private and currently has no published license.
