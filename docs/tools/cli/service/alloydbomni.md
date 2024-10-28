---
title: avn service alloydbomni
---

List of commands for `avn service alloydbomni`

## Manage Google service account credentials

Manage a Google service account private key in Aiven for AlloyDB Omni.

### `avn service alloydbomni google-cloud-private-key set`

Add or update a Google service account private key for your Aiven for AlloyDB Omni service.

```bash
avn service alloydbomni google-cloud-private-key set SERVICE_NAME \
  --private-key-file PRIVATE_KEY_FILE
```

| Parameter                | Information                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| `SERVICE_NAME`           | Name of an Aiven for AlloyDB Omni service                             |
| `PRIVATE_KEY_FILE`       | Path to a JSON file including your Google service account private key |

**Example**

```bash
avn service alloydbomni google-cloud-private-key set alloydbomni-test \
  --private-key-file /Users/john.doe/documents/private-key.json
```

**Output**

This command outputs a Google service account email and a key ID, for example:

```txt
CLIENT_EMAIL                                                  PRIVATE_KEY_ID
============================================================  ========================================
test-svc-account@test-project-123456.iam.gserviceaccount.com  1a2b3c4d5e6f7g8h9i0j1a2b3c4d5e6f7g8h9i0j
```

### `avn service alloydbomni google-cloud-private-key delete`

Delete a Google service account private key uploaded to your Aiven for AlloyDB Omni service.

```bash
avn service alloydbomni google-cloud-private-key delete SERVICE_NAME
```

| Parameter                | Information                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| `SERVICE_NAME`           | Name of an Aiven for AlloyDB Omni service                             |

**Example**

```bash
avn service alloydbomni google-cloud-private-key delete alloydbomni-test
```

**Output**

This command outputs:

```txt
Service account key has been removed
```

### `avn service alloydbomni google-cloud-private-key show`

Display the key ID and the client email associated with your Google service account private
key.

```bash
avn service alloydbomni google-cloud-private-key show SERVICE_NAME
```

| Parameter                | Information                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| `SERVICE_NAME`           | Name of an Aiven for AlloyDB Omni service                             |

**Example**

```bash
avn service alloydbomni google-cloud-private-key show alloydbomni-test
```

**Output**

This command outputs a Google service account email and a key ID, for example:

```txt
CLIENT_EMAIL                                                  PRIVATE_KEY_ID
============================================================  ========================================
test-svc-account@test-project-123456.iam.gserviceaccount.com  1a2b3c4d5e6f7g8h9i0j1a2b3c4d5e6f7g8h9i0j
```
