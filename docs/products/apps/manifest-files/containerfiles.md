---
title: Create Containerfiles and Dockerfiles for Aiven Apps
sidebar_label: Create Containerfiles and Dockerfiles
limited: true
---

Aiven Apps automatically detects and analyzes Containerfiles and Dockerfiles in your repository to configure apps.

It recognizes Containerfiles and Dockerfiles in the following formats:

- `Containerfile`
- `Dockerfile`
- `Containerfile.*`
- `Dockerfile.*`
- `*.containerfile`
- `*.dockerfile`

Aiven automatically analyzes Containerfiles and Dockerfiles to:

  - Parse `EXPOSE` instructions for port detection
  - Extract `ENV` instructions for environment variables
  - Generate single application service configurations
  - Validate file structure

## Create a Containerfile or Dockerfile

Containerfiles must start with a `FROM` instruction. This can come  after optional parser directives, comments,
  and global `ARG` instructions.

## Port Detection

Port numbers are extracted from the `EXPOSE` instruction. The following example
exposes ports 8000 and 9090:

```dockerfile
# Dockerfile
FROM node:18-alpine
EXPOSE 8080
EXPOSE 9090/tcp
```

## Environment Variables

You can define environment variables using the `ENV` instruction.
The following example defines two environment variables, `NODE_ENV` and `DEBUG`:

```dockerfile
# Dockerfile
FROM python:3.11-slim
ENV NODE_ENV=production
ENV DEBUG=true
```
## Containerfile examples

### Single application example

The following example defines a simple web application using a Containerfile:

```dockerfile
# Dockerfile - Basic web application
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000            # Port detection
ENV NODE_ENV=production # Environment variable detection

CMD ["npm", "start"]
```

### Multi-stage build example

The following example demonstrates a multi-stage build that compiles a Node.js application
 and serves it with Nginx, exposing both HTTP and HTTPS ports:

```dockerfile

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80              # HTTP port
EXPOSE 443             # HTTPS port
ENV NGINX_PORT=80
```
