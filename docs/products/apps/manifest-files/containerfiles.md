---
title: Create Containerfiles and Dockerfiles for Aiven Apps
sidebar_label: Create Containerfiles and Dockerfiles
limited: true
---

import EnvVarMerging from "@site/static/includes/manifest-env-var-merging.md";

Aiven Apps automatically detects and analyzes Containerfiles and Dockerfiles in your repository to configure apps.

It recognizes Containerfiles and Dockerfiles in the following formats:

- `Containerfile`
- `Dockerfile`
- `Containerfile.*`
- `Dockerfile.*`
- `*.containerfile`
- `*.dockerfile`

Aiven automatically analyzes these files to parse instructions for
things like port detection and environment variables.

## Create a Containerfile or Dockerfile

Containerfiles must start with a `FROM` instruction. This can come  after optional
parser directives, comments, and global `ARG` instructions.

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

<EnvVarMerging/>

## Other commands and best practices

Details on commands and recommendations for creating Dockerfiles are available in
Docker's documentation for
[building best practices](https://docs.docker.com/build/building/best-practices/).

## Examples

### Single application example

The following example defines a simple web application using a Containerfile:

```dockerfile
FROM node:18-alpine

WORKDIR /app
COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000             # Port
ENV NODE_ENV=production # Environment variable

CMD ["npm", "start"]
```

### Multi-stage build examples

#### Node.js application with Nginx

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

#### Java application with custom JRE

The following is from the
[anomaly detection example](https://github.com/Aiven-Labs/anomaly-detection-example)
and demonstrates a multi-stage build that compiles a Java application
and serves it with a custom JRE:

```dockerfile
# --- Set ARG values for use in the following build stages
# This value specifies the app to build
ARG APP_NAME="AnomalyDetectorApp"

# --- First stage: Get the app, work out its dependencies, create a JRE
FROM gradle:9.3.0-jdk25-noble AS builder

WORKDIR /app

# ARG values do not persist over FROM boundaries
# Explicitly reference it again to make it available
ARG APP_NAME

ENV APP_NAME="AnomalyDetectorApp"

# Copy the gradle build environment over
RUN mkdir app
COPY app ./app/

RUN mkdir gradle
COPY gradle ./gradle/

COPY settings.gradle ./

# Copy the run scripts for stage 2
COPY run.sh ./
COPY setup_auth.sh ./

# Start by building the app as a fat (uber) JAR
# This gives us a smaller executable in stage 2
RUN gradle clean ${APP_NAME}UberJar --no-daemon

ENV FAT_JAR_NAME=${APP_NAME}-uber.jar
RUN cp app/build/libs/$FAT_JAR_NAME ./

# Unpack the contents of the fat JAR
RUN mkdir temp && cd temp && jar xf ../$FAT_JAR_NAME
# Identify the dependencies to get from the external Java environment
RUN jdeps --print-module-deps \
    --ignore-missing-deps \
    --recursive \
    --multi-release 17 \
    --class-path="./temp/BOOT-INF/lib/*" \
    --module-path="./temp/BOOT-INF/lib/*" \
    ./$FAT_JAR_NAME > modules.txt

# Assemble custom JRE with only those things in it
RUN $JAVA_HOME/bin/jlink \
    --verbose \
    --add-modules $(cat modules.txt) \
    --strip-debug \
    --no-man-pages \
    --no-header-files \
    --compress=zip-6 \
    --output ./custom-jre

# ----------------------------------------------------------------------------
# --- Second stage: Run the actual image
# Use the smallest base image possible (alpine)
FROM debian:bookworm-slim

WORKDIR /app

# Install openssl (for run.sh) and RocksDB library (for Kafka Streams)
RUN apt-get update \
    && apt-get install -y librocksdb7.8

RUN apt-get autoremove -y \
    && apt-get clean -y \
    && apt-get autoclean -y \
    && rm -rf /var/lib/apt/lists/*

# Get the ARG value to make it available in this stage
ARG APP_NAME
# Set an ENV value to that value
ENV APP_NAME=$APP_NAME

# Copy the custom JRE and application artifacts from the builder stage
COPY --from=builder /app/custom-jre /usr/lib/jvm/custom-jre
COPY --from=builder /app/$APP_NAME-uber.jar ./
COPY --from=builder /app/setup_auth.sh ./
COPY --from=builder /app/run.sh ./

ENV JAVA_HOME="/usr/lib/jvm/custom-jre"
ENV PATH="$JAVA_HOME/bin:$PATH"

# Copy the entrypoint script and make it executable
COPY run.sh ./
RUN chmod +x ./run.sh
RUN chmod +x ./setup_auth.sh

# Set the custom entrypoint
CMD [ "./run.sh" ]
```
