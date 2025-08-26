---
title: Build from a Dockerfile
limited: true
---

Aiven Applications builds Docker container images from the Dockerfile in your repository. You use the Dockerfile to define the build process for things like choosing base images and setting environment variables.

:::note
Aiven Applications is in the
[limited availability](/docs/platform/concepts/beta_services#limited-availability-) stage.
:::

## Create a Dockerfile

Create the Dockerfile in the root directory.
Details on the commands and recommendations for creating Dockerfiles are available in
Docker's documentation for
[building best practices](https://docs.docker.com/build/building/best-practices/).

## Examples

The following are sample files for different languages and frameworks that you
can use to define the build process for your application.

### NestJS with TypeScript

```docker
# Initiate a container to build the application in.
FROM node:14-alpine as builder
ENV NODE_ENV=build
WORKDIR /usr/src/app

# Copy the package.json into the container.
COPY package*.json ./

# Install the dependencies required to build the application.
RUN npm install

# Copy the application source into the container.
COPY . .

# Build the application.
RUN npm run build

# Uninstall the dependencies not required to run the built application.
RUN npm prune --production

# Initiate a new container to run the application in.
FROM node:14-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/app

# Copy everything required to run the built application into the new container.
COPY --from=builder /usr/src/app/package*.json ./
COPY --from=builder /usr/src/app/node_modules/ ./node_modules/
COPY --from=builder /usr/src/app/dist/ ./dist/

# Expose the web server's port.
EXPOSE 3000

# Run the application.
CMD ["node", "dist/main"]
```

### Astro

```docker
FROM node:lts-alpine

WORKDIR /app
COPY . .

RUN npm ci
RUN npm run build

ARG PORT
EXPOSE ${PORT:-4321}

CMD npm run start
```
