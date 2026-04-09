When you set environment variables in both Containerfiles and Compose files,
Aiven merges them with the following priority:

1. Containerfile or Dockerfile environment variables are merged first, preserving
   their order.
1. Compose file environment variables override any Containerfile or Dockerfile variables
    with the same key.
1. Variables that are only in the Compose file are added at the end.

Keys managed by service integrations are excluded.
