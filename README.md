# AI Chat Proxy Server - node.js

This project is an AI Chat Proxy Server that handles chat and message functionalities.
The main focus of this project is the architecture. I want to compare it with other technologies and languages.

## Features

• Supports chat and message operations
• OpenAPI documentation generated from code using annotations
• Authentication with OAuth2 Provider
• Downloadable OpenAPI definition (as json)
• Easy local setup with Docker Compose

## Tech Stack

• tsoa - OpenAPI generation from code with annotation-style patterns
• Express.js - Lightweight and flexible routing
• Drizzle ORM - Database interactions with a type-safe and modern approach
• Docker Compose - Simplified local database setup

### Getting Started

1. Install dependencies:

```bash
npm install
```

2. Build tsoa:

```bash
npm run tsoa
```

3. Build app:

```bash
npm run tsc
```

3. Start app:

```bash
npm run start
```

### Swagger

http://localhost:3000/swagger-ui/
