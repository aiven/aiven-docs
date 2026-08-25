---
title: Create Compose files for Aiven Runtime
sidebar_label: Create Compose files
limited: true
---

import RelatedPages from "@site/src/components/RelatedPages";
import EnvVarMerging from "@site/static/includes/manifest-env-var-merging.md";

Aiven Runtime scans your repository for Compose files, such as [Docker Compose files](https://docs.docker.com/compose/), to detect applications, identify supported data services, and create integrations.
Compose files must be in YAML format and follow the [Compose specification](https://compose-spec.io).

Aiven recognizes Compose files with the following file naming conventions:

<table>
  <thead>
  <tr>
    <th>File type</th>
    <th>Supported file naming formats</th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>Compose files</td>
    <td><ul><li>`docker-compose.yml`</li><li>`docker-compose.yaml`</li><li>`compose.yml`</li><li>`compose.yaml`</li><li>`compose.aiven.yaml`</li><li>`compose.existing-db.yaml`</li></ul></td>
  </tr>
  <tr>
    <td>Environment-specific and override files</td>
    <td><ul><li>`docker-compose.override.yml`</li><li>`compose.override.yaml`</li><li> `docker-compose.ENVIRONMENT.yml` For example: `docker-compose.prod.yml`</li><li> `compose.ENVIRONMENT.yaml` For example: `compose.dev.yaml`</li></ul></td>
  </tr>
  </tbody>
</table>

Aiven automatically analyzes Compose files to detect the applications to build and
the Aiven services to create.

## Create a Compose file

Use the following guidelines to create your Compose files for Aiven Runtime.
More information on formatting Compose files is available in the
[Compose specification](https://github.com/compose-spec/compose-spec/blob/main/spec.md)
and in the [Docker Compose file reference](https://docs.docker.com/reference/compose-file).

### Service integrations

Aiven Runtime automatically detects and creates the following data services based
on Docker image names: Aiven for Apache Kafka®, Aiven for PostgreSQL®, Aiven for Valkey™,
and Aiven for OpenSearch®.

You define the service type and version with the `image` property.

Aiven integrates the services listed in the `depends_on` property:

```yaml
services:
  web-app:
    build: .
    depends_on:
      - postgres-db
      - valkey-cache
    environment:
      - DATABASE_URL=postgresql://DB_USER:DB_PASSWORD@postgres-db:5432/DB_NAME

  postgres-db:
    image: postgres:15

  valkey-cache:
    image: valkey/valkey:7.2
```

:::note
Service names must:

- Consist only of lowercase letters a-z, numbers 0-9, and `-`
- Begin with a lowercase letter
- Be between 1 and 64 characters in length
:::

Aiven Runtime only recognizes specific, standard images for each service type.

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

Runtime supports the following PostgreSQL images:

- `postgres`
- `postgresql`
- `bitnami/postgresql`

The following is an example for the official PostgreSQL image
specifying version 15:

```yaml
services:
  database:
    image: postgres:15
```

#### Valkey

Runtime supports the following Valkey images:

- `valkey`
- `valkey/valkey`
- `bitnami/valkey`
- `redis`
- `bitnami/redis`

The following is an example for the official Valkey image specifying version 7.2:

```yaml
services:
  cache:
    image: valkey/valkey:7.2
```

#### OpenSearch

Aiven Runtime only supports the official
`opensearchproject/opensearch` image. It can include
registry prefixes such as `docker.io/opensearchproject/opensearch`
and `ghcr.io/opensearchproject/opensearch`.

```yaml
services:
  search:
    image: opensearchproject/opensearch:2.11
```

#### Custom builds and unsupported images

Aiven Runtime doesn't support custom builds, non-standard images,
and some image distributions.

If you need to use custom images locally, you can use a separate Compose file
for Aiven Runtime named `compose.aiven.yaml`. For example, the following
includes a custom PostgreSQL build and a non-standard Redis image:

```yaml
# compose.yaml
services:
  db:
    build: ./postgres-with-my-extensions  # Custom build
  cache:
    image: my-redis-fork:7.0              # Non-standard image
  api:
    build: ./app
```

To deploy this setup on Aiven Runtime without editing your main Compose file,
create a `compose.aiven.yaml` file with the following:

```yaml
services:
  db:
    image: postgres:15  # Standard image Aiven recognizes
  cache:
    image: valkey:7.2   # Standard image Aiven recognizes
  api:
    build: ./app
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
configure a basic web application that is integrated with a PostgreSQL database.

The `docker-compose.yml` file defines the application and the PostgreSQL service,
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

### Web application with Kafka

The following example uses a Compose file to configure a web application
and integrate it with a Kafka broker using SASL authentication.

The file defines the application and the Kafka service, along with the environment variables
for integration:

```yaml
version: '3.8'

services:
  # Application service
  web-app:
    build: .
    ports:
      - "8000:8000"
    depends_on:
      - kafka-broker
    environment:
      # Aiven will detect this integration and provide credentials
      - KAFKA_BOOTSTRAP_SERVERS=${KAFKA_BOOTSTRAP_SERVERS:-kafka-broker:9092}
      - KAFKA_SECURITY_PROTOCOL=${KAFKA_SECURITY_PROTOCOL:-SASL_PLAINTEXT}
      - KAFKA_SASL_MECHANISM=${KAFKA_SASL_MECHANISM:-PLAIN}
      - KAFKA_SASL_USERNAME=${KAFKA_SASL_USERNAME:-appuser}
      - KAFKA_SASL_PASSWORD=${KAFKA_SASL_PASSWORD:-appsecret}

  # Aiven Kafka broker service (automatically detected)
  kafka-broker:
    image: apache/kafka:3.9
    hostname: kafka-broker
    ports:
      - "9092:9092"
    environment:
      KAFKA_NODE_ID: 1
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: "CONTROLLER:PLAINTEXT,SASL_PLAINTEXT:SASL_PLAINTEXT"
      KAFKA_ADVERTISED_LISTENERS: "SASL_PLAINTEXT://kafka-broker:9092"
      KAFKA_PROCESS_ROLES: "broker,controller"
      KAFKA_CONTROLLER_QUORUM_VOTERS: "1@kafka-broker:29093"
      KAFKA_LISTENERS: "CONTROLLER://:29093,SASL_PLAINTEXT://:9092"
      KAFKA_INTER_BROKER_LISTENER_NAME: "SASL_PLAINTEXT"
      KAFKA_CONTROLLER_LISTENER_NAMES: "CONTROLLER"
      CLUSTER_ID: "4L6g3nShT-eMCtK--X86sw"
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_TRANSACTION_STATE_LOG_MIN_ISR: 1
      KAFKA_TRANSACTION_STATE_LOG_REPLICATION_FACTOR: 1
      KAFKA_LOG_DIRS: "/tmp/kraft-combined-logs"
      KAFKA_SASL_ENABLED_MECHANISMS: "PLAIN"
      KAFKA_SASL_MECHANISM_INTER_BROKER_PROTOCOL: "PLAIN"
      KAFKA_INTER_BROKER_PROTOCOL_VERSION: "3.5"
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
