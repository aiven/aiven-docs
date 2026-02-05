### Google credential source restrictions

Aiven validates Google Cloud external account credentials used in Kafka Connect to
prevent unauthorized file access and outbound requests.

If your credential JSON includes a `credential_source` object:

- `credential_source.file` is not allowed
- `credential_source.executable.command` is not allowed
- `credential_source.url` is allowed only when it is allow-listed in the Kafka or Kafka
  Connect service configuration (`gcp_auth_allowed_urls`).

To use `credential_source.url`, configure the Kafka Connect service with:

`gcp_auth_allowed_urls`

Set this to a list of HTTPS endpoints that the connector is allowed to use for authentication.

Example:

```json
{
  "gcp_auth_allowed_urls": [
    "https://sts.googleapis.com",
    "https://iamcredentials.googleapis.com"
  ]
}
```

If `credential_source.url` is present and `gcp_auth_allowed_urls` is not configured,
connector creation fails.
