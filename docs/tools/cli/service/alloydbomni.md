---
title: avn service alloydbomni
---

List of commands for `avn service alloydbomni`

## Manage Google service account credentials

Manage a Google service account private key in Aiven for AlloyDB Omni.

### `avn service alloydbomni google-cloud-private-key set`

Add or update a Google service account private key for your Aiven for AlloyDB Omni service.

```bash
avn service alloydbomni google-cloud-private-key set \
  --service SERVICE_NAME                             \
  --private-key-file PRIVATE_KEY_FILE
```

| Parameter                | Information                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| `SERVICE_NAME`           | Name of an Aiven for AlloyDB Omni service                             |
| `PRIVATE_KEY_FILE`       | Path to a JSON file including your Google service account private key |

**Example**

```bash
avn service alloydbomni google-cloud-private-key set            \
  --service alloydbomni-test                                    \
  --private-key-file /Users/john.doe/documents/private-key.json
```

**Output**

This command outputs:

- Google service account email, for example `abc-test-secret-manager@abcd-xyz.iam.gserviceaccount.com`
- Key ID, for example `1a2b3c4d5f6g7h8i9j0k1a2b3c4d5f6g7h8i9j0k`

### `avn service alloydbomni google-cloud-private-key delete`

Delete a Google service account private key uploaded to your Aiven for AlloyDB Omni service.

```bash
avn service alloydbomni google-cloud-private-key delete \
  --service SERVICE_NAME
```

| Parameter                | Information                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| `SERVICE_NAME`           | Name of an Aiven for AlloyDB Omni service                             |

**Example**

```bash
avn service alloydbomni google-cloud-private-key delete \
  --service alloydbomni-test
```

**Output**

This command outputs:

- Google service account email, for example `abc-test-secret-manager@abcd-xyz.iam.gserviceaccount.com`
- Key ID, for example `1a2b3c4d5f6g7h8i9j0k1a2b3c4d5f6g7h8i9j0k`

### `avn service alloydbomni google-cloud-private-key show`

Display the key ID and the client email associated with your Google service account private
key.

```bash
avn service alloydbomni google-cloud-private-key show \
  --service SERVICE_NAME
```

| Parameter                | Information                                                           |
| ------------------------ | --------------------------------------------------------------------- |
| `SERVICE_NAME`           | Name of an Aiven for AlloyDB Omni service                             |

**Example**

```bash
avn service alloydbomni google-cloud-private-key show \
  --service alloydbomni-test
```

**Output**

This command outputs:

- Google service account email, for example `abc-test-secret-manager@abcd-xyz.iam.gserviceaccount.com`
- Key ID, for example `1a2b3c4d5f6g7h8i9j0k1a2b3c4d5f6g7h8i9j0k`
