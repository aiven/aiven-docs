---
title: Create Compose files for Aiven Apps
sidebar_label: Create Compose files
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";
import EnvVarMerging from "@site/static/includes/manifest-env-var-merging.md";

Aiven Apps scans your repository for Compose files, such as [Docker Compose files](https://docs.docker.com/compose/), to detect applications, identify supported data services, and create integrations.
Compose files must be in YAML format and follow the [Compose specification](https://compose-spec.io).

Aiven recognizes Compose files with the following file naming conventions:

<table>
  <thead>
  <tr>
    <th>File type</th>
    <th>Supported file formats</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Compose files</td>
    <td><ul><li>`docker-compose.yml`</li><li>`docker-compose.yaml`</li><li>`compose.yml`</li><li>`compose.yaml`</li></ul></td>
  </tr>
  <tr>
    <td>Environment-specific and override files</td>
    <td><ul><li>`docker-compose.override.yml`</li><li>`compose.override.yaml`</li><li> `docker-compose.ENVIRONMENT.yml` For example: `docker-compose.prod.yml`</li><li> `compose.ENVIRONMENT.yaml` For example: `compose.dev.yaml`</li></ul></td>
  </tr>
  </tbody>
</table>

Aiven automatically analyzes Compose files to detect the apps to build and
the Aiven services to create.

## Create a Compose file

Use the following guidelines to create your Compose files for Aiven Apps.
More information on formatting Compose files is available in the
[Compose specification](https://github.com/compose-spec/compose-spec/blob/main/spec.md)
and in the [Docker Compose file reference](https://docs.docker.com/reference/compose-file).

### Service integrations

Aiven Apps automatically detects and creates the following data services based
on Docker image names: Aiven for Apache Kafka®, Aiven for PostgreSQL®, Aiven for Valkey™,
and Aiven for OpenSearch®.

You define the service type and version with the `image` property.
Service names must:

- Consist only of lowercase letters a-z, numbers 0-9, and `-`
- Begin with a lowercase letter
- Be between 1 and 64 characters in length

The following examples show how to specify the image for each supported service.

#### Kafka

The supported images for Kafka are:

- `apache/kafka`: Official Apache Kafka
- `confluentinc/cp-kafka`: Confluent Platform
- `bitnami/kafka`: Bitnami packaging

The following is an example for the official Apache Kafka image:

```yaml
services:
  message-broker:
    image: apache/kafka:3.9
```

The following is an example for the Confluent Platform Kafka image:

```yaml
  kafka-confluent:
    image: confluentinc/cp-kafka:latest
```

#### PostgreSQL

```yaml
services:
  database:
    image: postgres:15
```

#### Valkey

```yaml
services:
  cache:
    image: valkey/valkey:7.2
```

#### OpenSearch

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

<EnvVarMerging/>

#### List format example

```yaml
services:
  app:
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres-db:5432/mydb
      - VALKEY_URL=valkey://valkey-cache:6379
      - NODE_ENV=production
```

#### Dictionary format example

```yaml
services:
  app:
    environment:
      DATABASE_URL: postgresql://user:pass@postgres-db:5432/mydb
      VALKEY_URL: valkey://valkey-cache:6379
      NODE_ENV: production
```

## Example Compose files

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

### Multi-service application

The following example Compose file defines a more complex application with
a React frontend, a backend API, a background worker, and integrations
with PostgreSQL, Valkey, and OpenSearch services.

```yaml
services:
  # React frontend
  frontend:
    build:
      context: ./frontend
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    environment:
      - REACT_APP_API_URL=http://localhost:8000

  # Backend API
  backend-api:
    build:
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - "8000:8000"
    depends_on:
      - postgres-main
      - valkey-sessions
      - search-engine
    environment:
      # Primary database connection
      - DATABASE_URL=postgresql://app:password@postgres-main:5432/maindb
      # Session storage
      - VALKEY_URL=valkey://valkey-sessions:6379
      # Search functionality
      - OPENSEARCH_URI=https://admin:password@search-engine:9200
      - JWT_SECRET=your-jwt-secret
      - NODE_ENV=production

  # Background job processor
  worker:
    build:
      context: ./backend
      dockerfile: Dockerfile.worker
    depends_on:
      - postgres-main
      - valkey-sessions
    environment:
      - DATABASE_URL=postgresql://app:password@postgres-main:5432/maindb
      - VALKEY_URL=valkey://valkey-sessions:6379
      - WORKER_MODE=true

  # Aiven PostgreSQL - Main database
  postgres-main:
    image: postgres:15
    environment:
      POSTGRES_DB: maindb
      POSTGRES_USER: app
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data

  # Aiven for Valkey - Session store and job queue
  valkey-sessions:
    image: valkey/valkey:7.2

  # Aiven for OpenSearch - Full-text search
  search-engine:
    image: opensearchproject/opensearch:2.11
    environment:
      discovery.type: single-node
      plugins.security.disabled: true
      "OPENSEARCH_JAVA_OPTS=-Xms512m -Xmx512m"
    volumes:
      - opensearch_data:/usr/share/opensearch/data

volumes:
  postgres_data:
  opensearch_data:
```

<RelatedPages/>

- [Docker Compose Quickstart](https://docs.docker.com/compose/gettingstarted)
- [Manage secrets securely in Docker Compose](https://docs.docker.com/compose/how-tos/use-secrets/)
