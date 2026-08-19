---
title: Secret redaction in Aiven API
sidebar_label: Secret redaction
---

Service user passwords, service `user_config` fields, and integration endpoint secrets are redacted in API responses by default.

If your integrations require access to secrets, include the `include_secrets=true`
query parameter in the API calls. The caller also needs to have a
[role or permission](/docs/platform/concepts/permissions) that allows them to read secrets.

The following is a summary of the permissions required for each secret type:

- **Service user passwords**: `admin`, `operator`, `developer`,
   `service:secrets:read`, or `service:users:write`
- **Service `user_config` secrets**: `admin`, `operator`, or `service:secrets:read`
- **Integration endpoint secrets**: `admin` or `project:integrations:write`

Only the `GET` endpoints listed can reveal secrets.
Write endpoints and the integration endpoint list always redact secrets.

The following endpoints include secrets:

- **Service user passwords**

  - `GET /project/{project}/service/{service_name}/user/{service_username}`

  - `GET /project/{project}/service/{service_name}`

  - `GET /project/{project}/service`

  - `POST /project/{project}/service`

  - `PUT /project/{project}/service/{service_name}`

  - `PUT /project/{project}/service/{service_name}/user/{service_username}/credentials/reset`

  - `PUT /project/{project}/service/{service_name}/user/{service_username}`

  - `PATCH /project/{project}/service/{service_name}/service_type`

- **Service user configuration**

  - `GET /project/{project}/service/{service_name}`

  - `GET /project/{project}/service`

  - `POST /project/{project}/service`

  - `PUT /project/{project}/service/{service_name}`

  - `PATCH /project/{project}/service/{service_name}/service_type`

- **Integration endpoint secrets**

  - `GET /project/{project}/integration_endpoint/{integration_endpoint_id}`

  - `GET /project/{project}/integration_endpoint`

  - `POST /project/{project}/integration_endpoint`

  - `PUT /project/{project}/integration_endpoint/{integration_endpoint_id}`
