# AI Chat Proxy Server - node.js

This project is an AI Chat Proxy Server that handles chat and message functionalities.
The main focus of this project is the architecture. I want to compare it with other technologies and languages.

## Other Languages and Technologies

[AI Chat Proxy Server - Golang](https://github.com/paulnaber/ai-chat-service-go)
Java...

## Features

- Supports chat and message operations
- OpenAPI documentation generated from code using annotations
- Authentication with OAuth2 Provider
- Downloadable OpenAPI definition (as json)
- Easy local setup with Docker Compose

## Tech Stack

- tsoa - OpenAPI generation from code with annotation-style patterns
- Express.js - Lightweight and flexible routing
- Drizzle ORM - Database interactions with a type-safe and modern approach
- Docker Compose - Simplified local database setup, Prometheus
- Jest, SuperTest - Integration tests
- Prometheus - Metrics

### Getting Started

0. Before getting started make sure to

```
add .env file (see .env.example)
have oauth2 provider up and running
have postgres up and running
have node installed on your machine (if nvm -> run nvm use)
```

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

### How to run integration tests

1. Start the test database:

```bash
npm run docker-compose:test
```

2. Run the tests:

```bash
npm run test
```

### TODOs

- tryCatch function
- more integration tests
- better logs
- grafana
