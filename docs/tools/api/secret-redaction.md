---
title: Secret redaction in Aiven API
sidebar_label: Secret redaction
---

Service user passwords, secret service `user_config` fields, and integration endpoint secrets are redacted in API responses by default.

Redacted values are shown as `<redacted>`. For integrations that send config back to Aiven,
leaving this placeholder prevents accidental overwriting of the secret.

To read secrets on a `GET` request:

- Send `include_secrets=true` as a query parameter.
- Use a [role or permission](/docs/platform/concepts/permissions) that can read
  that secret type.

For service secrets, calls without the required permissions receive a `403 Forbidden`
response. For integration endpoint secrets, calls return redacted values.

The following endpoints can return secrets in plaintext:

- `GET /project/PROJECT/service/SERVICE_NAME/user/SERVICE_USERNAME`

- `GET /project/PROJECT/service/SERVICE_NAME`

- `GET /project/PROJECT/service`

- `GET /project/PROJECT/integration_endpoint/INTEGRATION_ENDPOINT_ID`

Only `GET` endpoints can reveal secrets.
Most write endpoints redact secrets. One exception is
the `POST /project/PROJECT/service/SERVICE_NAME/user` endpoint,
which returns newly generated credentials in plaintext.
