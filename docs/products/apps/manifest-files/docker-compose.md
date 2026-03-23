---
title: Create Docker Compose files for Aiven Apps
sidebar_label: Create Docker Compose files
limited: true
---

Aiven Apps scans your repository for [Docker Compose files](https://docs.docker.com/compose/) to detect application services, identify supported data services, and create integrations.

It recognizes Compose files in the following formats:

<table>
  <thead>
  <tr>
    <th>File type</th>
    <th>Supported file formats</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Docker Compose files</td>
    <td><ul><li>`docker-compose.yml`</li><li>`docker-compose.yaml`</li><li>`compose.yml`</li><li>`compose.yaml`</li></ul></td>
  </tr>
  <tr>
    <td>Environment-specific and override files</td>
    <td><ul><li>`docker-compose.override.yml`</li><li>`compose.override.yaml`</li><li> `docker-compose.ENVIRONMENT.yml` For example: `docker-compose.prod.yml`</li><li> `compose.ENVIRONMENT.yaml` For example: `compose.dev.yaml`</li></ul></td>
  </tr>
  </tbody>
</table>

Aiven automatically analyzes manifest files to:

  - Detect application services to build
  - Identify supported data services
  - Create service integrations based on environment variables and dependencies
  - Provision Aiven-managed services for your data needs

## Create a Docker Compose file



### Service integrations

Aiven Apps automatically detects and creates the following data services based
on Docker image names: Aiven for PostgreSQL®, Aiven for Valkey™, and Aiven for OpenSearch®.

You define the service type and version with the `image` property. The following examples
show how to specify the image for each supported service:

**PostgreSQL**

```yaml
services:
  database:
    image: postgres:15
```

**Valkey**

```yaml
services:
  cache:
    image: valkey/valkey:7.2
```

**OpenSearch**

```yaml
services:
  search:
    image: opensearchproject/opensearch:2.11
```

Aiven integrates the services listed in the `depends_on` property:

```yaml
services:
  web-app:
    build: .
    depends_on:
      - postgres-db
      - valkey-cache
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres-db:5432/mydb

  postgres-db:
    image: postgres:15

  valkey-cache:
    image: valkey/valkey:7.2
```
### Environment variables

You can use a list or dictionary format for environment variables.

**List format example**

```yaml
services:
  app:
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres-db:5432/mydb
      - VALKEY_URL=valkey://valkey-cache:6379
      - NODE_ENV=production
```

**Dictionary format example**

```yaml
services:
  app:
    environment:
      DATABASE_URL: postgresql://user:pass@postgres-db:5432/mydb
      VALKEY_URL: valkey://valkey-cache:6379
      NODE_ENV: production
```

## Example Docker Compose files

### Simple web application with PostgreSQL

The following example uses a Docker Compose file and a Dockerfile to
configure a basic web app that is integrated with a PostgreSQL database.

The `docker-compose.yml` file defines the app and the PostgreSQL service,
along with the environment variables for integration:

```yaml
version: '3.8'

services:
  # Application service
  web-app:
    build: .
    ports:
      - "3000:3000"
    depends_on:
      - postgres-db
    environment:
      # Aiven will detect this integration and provide credentials
      - DATABASE_URL=postgresql://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres-db:5432/${POSTGRES_DB}
      - NODE_ENV=production

  # Aiven PostgreSQL service (automatically detected)
  postgres-db:
    image: postgres:15
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
```

The Dockerfile defines how to build the web application:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
```
