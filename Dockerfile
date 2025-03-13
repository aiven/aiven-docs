#
# Production build target
#
FROM alpine:latest

RUN apk add --no-cache nodejs npm
RUN npm install -g corepack
RUN corepack enable
RUN corepack prepare yarn@4.7.0 --activate
WORKDIR /app

COPY package.json yarn.lock ./
RUN yarn install

COPY . .

# required by "docusaurus faster"
RUN yarn add @rspack/binding-linux-arm64-musl
