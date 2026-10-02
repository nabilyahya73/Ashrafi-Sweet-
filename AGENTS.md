# Project Instructions

## Project

This is a Next.js + TypeScript backend using Prisma and PostgreSQL.

## Architecture

Use this structure:

- controllers → handle HTTP requests/responses
- services → business logic
- repositories → database operations
- routes → API routes
- schemas → Zod validation

## Rules

- Use TypeScript.
- Use async/await.
- Validate incoming API data with Zod.
- Do not put business logic inside controllers.
- Do not access Prisma directly from controllers.
- Use existing variable names when modifying code.
- Do not install packages unless necessary.

## Database

- Use Prisma for database access.
- Never manually modify the database.
- Create Prisma migrations for schema changes.

## Testing

- Use Jest.
- Every new service should have tests.
- Run tests before considering a feature complete.

## Code Style

- Keep functions small.
- Use clear names.
- Avoid unnecessary abstractions.
