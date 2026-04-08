---
title: Create manifest files for Aiven Apps
sidebar_label: Create manifest files
limited: true
---

Aiven Apps uses container manifests to understand how to build and deploy your applications. You can define applications using two types of container manifests that work together to create complete solutions.

- **[Compose files](/docs/products/apps/manifest-files/compose-files)** define
  multi-service solutions that can reference and orchestrate multiple Containerfiles
  along with data services.
- **[Containerfiles and Dockerfiles](/docs/products/apps/manifest-files/containerfiles)**
   define how to build a single application.

Aiven scans your repository for manifest files using standard naming conventions
and parses instructions and configuration details like ports and environment variables.
For integrating applications with Aiven data services, Aiven uses the information in
Compose files to create and connect the services.
