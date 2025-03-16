#
# Base stage
#
FROM node:23-alpine AS base
RUN npm install -g corepack
RUN corepack enable
RUN corepack prepare yarn@4.7.0 --activate
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
# required by "docusaurus faster"
RUN yarn add @rspack/binding-linux-arm64-musl

#
# Production stage
#
FROM base AS prod
COPY --from=base /app ./
CMD [ "yarn", "run","build" ]

#
# Development stage
#
FROM base AS dev
WORKDIR /app
COPY --from=base /app ./
EXPOSE 3000
CMD [ "yarn", "run", "start", "--host", "0.0.0.0" ]
