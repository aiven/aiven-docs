---
title: Migrate schemas to Karapace
sidebar_label: Migrate schemas
description: Migrate schemas from Confluent Schema Registry or another Karapace instance to Aiven for Apache Kafka® and keep their IDs and versions.
keywords: [Schema Registry, Karapace, Confluent Schema Registry, schema migration, schema IDs, IMPORT mode, sr_migrate.py]
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";

Migrate schemas from Confluent Schema Registry or another Karapace instance to Aiven for Apache Kafka® and keep their original schema IDs and version numbers.
To keep the IDs and versions, you set the target Schema Registry to `IMPORT` mode
during the migration.

Each message serialized with Schema Registry contains a schema ID. Consumers use this
ID to get the schema they need to read the message. When you keep the same IDs,
existing consumers can keep reading existing messages after you switch registries.

You can migrate schemas in one of the following ways:

- **The script:** Use
  [`sr_migrate.py`](https://github.com/Aiven-Open/karapace/blob/main/bin/sr_migrate.py)
  to migrate many subjects or an entire registry. This is the recommended method. It
  also reproduces soft-deleted versions and reserves the highest schema ID that the
  source registry issued. See [Migrate with the script](#migrate-with-the-script).
- **The Schema Registry API:** Use `curl` to migrate a few schema versions manually.
  This method imports only live versions. It doesn't reserve the highest schema ID that
  the source registry issued, so the target can reuse that ID. See
  [Migrate with the API](#migrate-with-the-api).

## Prerequisites

- An [Aiven for Apache Kafka service](/docs/products/kafka) with
  [Schema Registry enabled](/docs/products/kafka/karapace/howto/enable-karapace)
  and [Karapace 6.2.4 or later](/docs/products/kafka/karapace/howto/set-karapace-version).
- The target Schema Registry URL and credentials from the **Schema Registry** tab of
  **Connect information** on the <ConsoleLabel name="overview"/> page of your
  service in the [Aiven Console](https://console.aiven.io). The default `avnadmin` user
  can run the migration.
- The source registry URL and credentials that can read schemas and configuration.
- Network access to the source and target registries.
- `curl`.
- Python 3, if you use the script. The script needs only the Python standard library.

Depending on your setup, you also need the following:

- If you use a user other than `avnadmin` with
  [Schema Registry authorization](/docs/products/kafka/karapace/howto/enable-schema-registry-authorization),
  add ACL entries with the `schema_registry_write` permission for `Config:` and for the
  subjects that you migrate, for example `Subject:*`.
- If you use
  [role-based authorization with OAuth 2.0/OIDC](/docs/products/kafka/karapace/howto/enable-oauth-oidc-schema-registry#enable-role-based-authorization),
  make sure that the target roles allow `GET`, `POST`, `PUT`, and `DELETE` requests.

## Prepare for the migration

1. Run the full migration on a non-production target first, such as a test Aiven
   service. Then repeat it for production.
1. Stop schema changes on the source, including registrations, deletions, and
   compatibility changes. Keep them paused until the migration is complete and your
   clients use the target registry.
1. Stop producers that register schemas automatically, or configure them to stop
   registering schemas.
1. Optional: Compare the schema IDs that your consumers read with the schema IDs in an
   export. An ID that isn't in the export can belong to a permanently deleted version.
   The script also prints a note when the source issued an ID that no exported version
   uses. To create an export, see
   [Review an export before importing](#optional-review-an-export-before-importing).

Don't register schemas on the target subjects during the migration.

An export is a snapshot of the source. If anything changes on the source after you
export, create another export. Create a separate export for the production run too.

:::important[Important]
The script can't export versions that were permanently deleted on the source.
:::

## How import mode works

A subject is a named collection of schema versions. A registry or subject runs in a mode
that controls how it handles schema registrations. A migration uses the following modes:

- **`READWRITE`:** The default mode. The registry assigns IDs and version numbers,
  reuses the existing ID for an identical schema, and runs compatibility checks.
- **`IMPORT`:** You provide the original IDs and version numbers, and the registry uses
  them. The registry rejects registrations that don't include an ID, and it doesn't run
  compatibility checks.

To keep the IDs, set the target registry or subjects to `IMPORT` mode during the
migration, and return them to `READWRITE` mode when you finish. The script handles
these mode changes for you. With the API, you change the modes yourself.

You can set `IMPORT` mode with one of the following scopes:

- **Global scope:** Sets `IMPORT` mode for the whole registry. Use it to migrate a whole
  registry into a new, empty target.
- **Subject scope:** Sets `IMPORT` mode for individual subjects. Use it to import into a
  registry that already has other subjects.

In both scopes, the registry or the subjects that you import can't have live schemas on
the target. A live schema is a schema version that hasn't been soft-deleted.
Soft-deleted versions don't block `IMPORT` mode, but they keep their ID and version
number, so they can still conflict with the schemas you import.

To set `IMPORT` mode on a registry or subject that has live schemas, see
[Import into a non-empty registry](#import-into-a-non-empty-registry).

## Migrate with the script

The `sr_migrate.py` script exports schemas from the source, imports them into your Aiven
service with their original IDs and versions, and verifies the result.

### Script workflow

The [`import` command](#import-the-schemas) runs the following nine steps. It shows a
plan and asks you to confirm each one. The step names match the names that the script
prints.

1. **Export from source** or **Load export:** With `--source`, exports the schemas from
   the source, including soft-delete status, compatibility levels, and the highest
   schema ID that the source registry issued. With `--file`, loads an existing export.
1. **Check target:** Checks for conflicting subjects, versions, and IDs. It also reports
   whether the target has live schemas that block `IMPORT` mode unless you use
   `--force`. This step doesn't change the target.
1. **Enter `IMPORT` mode:** Sets the registry or subjects to `IMPORT` mode.
1. **Register versions:** Registers each version with its original ID and version number,
   referenced schemas first.
1. **Reproduce soft deletes:** Soft-deletes the versions that are soft-deleted on the
   source.
1. **Reserve source max ID:** If the source issued an ID higher than any exported ID,
   for example for a permanently deleted version, reserves that ID in the
   `--reserve-subject` subject, so the target doesn't reuse it. The script imports a
   placeholder schema with that ID and soft-deletes it.
1. **Apply compatibility levels:** Applies source compatibility levels that differ from
   the target.
1. **Verify:** Checks that every imported version has its source schema ID.
1. **Leave `IMPORT` mode:** With global scope, sets the registry mode back to
   `READWRITE`. With subject scope, removes the subject mode overrides, so the subjects
   follow the registry mode. Then checks that nothing in scope is still in `IMPORT`
   mode.

With global scope, the script also applies the source's global compatibility level. With
subject scope, the script doesn't change the target's global compatibility level, and
subjects without their own setting use it. After the import, compare the target's global
level with the source's. For more information, see
[Verify the migration](#verify-the-migration).

### Download the script and set authentication

1. Review the
   [`sr_migrate.py` source on GitHub](https://github.com/Aiven-Open/karapace/blob/main/bin/sr_migrate.py).
1. Download the script:

   ```bash
   curl --fail --location \
     https://raw.githubusercontent.com/Aiven-Open/karapace/main/bin/sr_migrate.py \
     --output sr_migrate.py
   ```

1. Set `SRC_AUTH` for the source registry and `DST_AUTH` for the target registry. Each
   variable holds the complete value of the HTTP `Authorization` header.

   For HTTP Basic authentication:

   <!-- markdownlint-disable MD013 -->

   ```bash
   export SRC_AUTH="Basic $(printf '%s' 'SOURCE_USER:SOURCE_PASSWORD' | base64 | tr -d '\n')"
   export DST_AUTH="Basic $(printf '%s' 'SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD' | base64 | tr -d '\n')"
   ```

   <!-- markdownlint-enable MD013 -->

   Replace the following:

   - `SOURCE_USER` and `SOURCE_PASSWORD`: credentials for the source registry.
   - `SCHEMA_REGISTRY_USER` and `SCHEMA_REGISTRY_PASSWORD`: credentials for the target
     registry, from the **Schema Registry** tab of **Connect information** in the Aiven
     Console.

   For OAuth 2.0/OIDC authentication:

   ```bash
   export SRC_AUTH="Bearer SOURCE_ACCESS_TOKEN"
   export DST_AUTH="Bearer TARGET_ACCESS_TOKEN"
   ```

   Replace `SOURCE_ACCESS_TOKEN` and `TARGET_ACCESS_TOKEN` with the access tokens for
   the source and target registries.

The registries can use different authentication methods. Leave a variable unset if its
registry doesn't require authentication. If you import from an export file with
`--file`, you don't need `SRC_AUTH`.

To import directly from the source registry, go to
[Import the schemas](#import-the-schemas). The next two sections are optional.

### Optional: Review an export before importing

Review the schemas before you change the target:

1. Export the schemas from the source to a file:

   ```bash
   python3 sr_migrate.py export \
     --source SOURCE_REGISTRY_URL \
     --file export.json
   ```

   Replace `SOURCE_REGISTRY_URL` with the URL of the source registry.

1. Confirm that `export.json` contains the subjects and versions you expect, including
   referenced schemas.
1. Continue with [Import the schemas](#import-the-schemas), and import from the file.

### Optional: Export from a topic dump

If you can't reach the source registry API, create the export file from a dump of the
source `_schemas` topic.

:::warning[Warning]
Don't replicate the source `_schemas` topic directly to the target. Create an export
file and import it instead.
:::

1. Dump the topic as tab-separated key-value pairs. Include all records from the start
   of the topic, including records with null values, which mark deleted schemas. For
   example, with `kcat`:

   ```bash
   kcat -C -b SOURCE_KAFKA_SERVER -t _schemas -o beginning -e -q -Z \
     -f '%k\t%s\n' > schemas.log
   ```

   Replace `SOURCE_KAFKA_SERVER` with the bootstrap server of the Kafka cluster that
   hosts the source registry. Add the connection options that your source cluster
   needs, such as TLS or SASL settings.

1. Create the export file from the dump:

   ```bash
   python3 sr_migrate.py export-topic \
     --dump schemas.log \
     --file export.json
   ```

   If the topic has no global compatibility record, the script uses `BACKWARD`. To use
   a different level, add `--global-config COMPATIBILITY_LEVEL`. Replace
   `COMPATIBILITY_LEVEL` with a level such as `FULL`.

1. Continue with [Import the schemas](#import-the-schemas), and import from the file.

### Import the schemas

1. Run the import. The following example imports into a new, empty target:

   ```bash
   python3 sr_migrate.py import \
     --source SOURCE_REGISTRY_URL \
     --target SCHEMA_REGISTRY_URL \
     --scope global \
     --reserve-subject _migration_id_reservation
   ```

   Replace the following:

   - `SOURCE_REGISTRY_URL`: URL of the source registry.
   - `SCHEMA_REGISTRY_URL`: Schema Registry URL of your Aiven service, which is the target.

   With `--source`, the command also writes the export to `export.json` in the current
   directory. To use a different path, add `--file` with that path. If you already
   created an export file, replace `--source SOURCE_REGISTRY_URL` with
   `--file export.json`.

   The command uses the following options:

   - `--scope`: `global` for a new, empty target. Use `subject` if the target already
     has other subjects. The default is `subject`. Both scopes import every subject in
     the export. For more information, see
     [How import mode works](#how-import-mode-works).
   - `--reserve-subject`: the name of a dedicated subject that reserves the highest
     schema ID that the source registry issued. This prevents the target from reusing
     IDs that the source registry already issued. Use a name that isn't already in use.
     The script imports a placeholder schema into this subject and soft-deletes it.
     In the example, `_migration_id_reservation` stays on the target as a subject with
     one soft-deleted version.

   The script also supports these options:

   - `--force`: allows `IMPORT` mode on a target that has live schemas. For more
     information, see [Import into a non-empty registry](#import-into-a-non-empty-registry).
   - `--yes`: answers yes to every confirmation prompt except the one that offers
     `--force`. The script never assumes `--force`.

1. Review the plan and confirm each step. If the Check target step reports conflicting
   IDs or versions, including soft-deleted ones, stop. Use a new target, or fix the
   conflicting subjects on the target before you run the import again.
1. When the script finishes, it prints a summary. Confirm that the Verify and Leave
   `IMPORT` mode steps both report `done`:

   ```text
   Verify                       done     226 versions carry their source id
   Leave IMPORT mode            done     nothing in scope is in IMPORT
   ```

   Other possible results are `skipped`, `FAILED`, `stopped`, and `not run`. If the
   migration stops before it finishes, see
   [Troubleshoot migration errors](#troubleshoot-migration-errors).

## Migrate with the API

Use this procedure to migrate a small number of schema versions manually. It sets
`IMPORT` mode for one subject at a time, which is subject scope. It has the following
limits:

- It imports only live versions, so it doesn't recreate versions that are soft-deleted
  on the source.
- It doesn't reserve the highest schema ID that the source registry issued. Without the
  reservation, the target can issue an ID that the source already used. If the source
  issued IDs higher than the highest ID you import, use the script with
  `--reserve-subject`.

The `curl` examples use HTTP Basic authentication with the `-u` option. For OAuth
2.0/OIDC, replace the `-u` option and its credentials in each request with
`-H "Authorization: Bearer ACCESS_TOKEN"`. Replace `ACCESS_TOKEN` with the source
access token for requests to the source registry, and with the target access token for
requests to the target registry.

In the commands in this section, replace the following:

- `SOURCE_REGISTRY_URL`: URL of the source registry.
- `SOURCE_USER` and `SOURCE_PASSWORD`: credentials for the source registry.
- `SCHEMA_REGISTRY_URL`: Schema Registry URL of your Aiven service, which is the target.
- `SCHEMA_REGISTRY_USER` and `SCHEMA_REGISTRY_PASSWORD`: credentials for the target
  registry, from the **Schema Registry** tab of **Connect information** in the Aiven
  Console.
- `SUBJECT_NAME`: name of the subject. URL-encode it when you use it in a request path.
- `VERSION`: version number of a schema.
- `SCHEMA_ID`: schema ID from the source.
- `COMPATIBILITY_LEVEL`: a compatibility level, such as `FULL`.

### Retrieve the source schemas

1. List the subjects, and choose the ones to migrate:

   ```bash
   curl -u SOURCE_USER:SOURCE_PASSWORD \
     SOURCE_REGISTRY_URL/subjects
   ```

1. For each subject, list its versions:

   ```bash
   curl -u SOURCE_USER:SOURCE_PASSWORD \
     SOURCE_REGISTRY_URL/subjects/SUBJECT_NAME/versions
   ```

1. For each version, retrieve the schema and save the response:

   ```bash
   curl -u SOURCE_USER:SOURCE_PASSWORD \
     SOURCE_REGISTRY_URL/subjects/SUBJECT_NAME/versions/VERSION
   ```

   The response includes the `id`, `version`, and `schema` fields. It also includes the
   `schemaType` and `references` fields when the schema has them. You need these fields
   for the import. Retrieve the versions that your schemas reference as well,
   even if they're in other subjects.

1. For each subject, record any compatibility setting:

   ```bash
   curl -u SOURCE_USER:SOURCE_PASSWORD \
     SOURCE_REGISTRY_URL/config/SUBJECT_NAME
   ```

   If the subject has no setting of its own, it uses the source's global compatibility
   level. To get that level, send a `GET` request to `/config` on the source.

### Check the target

Use an empty target subject when possible. Schema IDs are global, so look for ID
conflicts even if the target subject is empty.

1. For each source ID that you saved from the source responses, look up the ID on the
   target:

   ```bash
   curl -u SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD \
     SCHEMA_REGISTRY_URL/schemas/ids/SCHEMA_ID
   ```

   A `404 Not Found` status code means the ID isn't used on the target. If the ID exists
   and its schema type, definition, and references match the source, you can import it
   again without changes. If they differ, you can't import this schema with its original
   ID.

1. If the target subject exists, list its versions, including soft-deleted ones, and
   compare them with the source versions:

   ```bash
   curl -u SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD \
     "SCHEMA_REGISTRY_URL/subjects/SUBJECT_NAME/versions?deleted=true"
   ```

   Soft-deleted versions keep their ID and version number. A soft-deleted version
   conflicts only if its ID or content differs from the version you import. If they're
   identical, importing the version again restores it on the target.

1. If the target holds the same ID or version with different content, use a new target.

### Import each subject

Import the subjects that other schemas reference first. The registry rejects a schema
if the versions that it references aren't on the target yet. For each subject, do the
following:

1. Set `IMPORT` mode for the target subject:

   ```bash
   curl -u SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD \
     -X PUT \
     -H "Content-Type: application/vnd.schemaregistry.v1+json" \
     -d '{"mode":"IMPORT"}' \
     SCHEMA_REGISTRY_URL/mode/SUBJECT_NAME
   ```

   If the request fails with error code `40901` and a message that starts with
   `Cannot import`, the subject has live schemas. See
   [Import into a non-empty registry](#import-into-a-non-empty-registry).

1. Import each version of the subject, starting with the versions that other schemas
   reference. For each version:

   1. Create the `schema-import.json` file with the source values for the ID, version,
      schema definition, and any schema type and references. For example:

      ```json
      {
        "schemaType": "AVRO",
        "schema": "{\"type\":\"string\"}",
        "id": 1001,
        "version": 5
      }
      ```

      Replace the example `schema`, `id`, and `version` values with the values from the
      source response. The `schema` value is an escaped JSON string. Copy it from the
      source response without changing it. If the source response includes
      `references`, copy that field to the file.

   1. Register the version:

      ```bash
      curl -u SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD \
        -X POST \
        -H "Content-Type: application/vnd.schemaregistry.v1+json" \
        --data @schema-import.json \
        SCHEMA_REGISTRY_URL/subjects/SUBJECT_NAME/versions
      ```

      Include both `id` and `version` to keep the source values. The registry accepts
      values from 1 to 2,147,483,647. Confirm that the ID in the response matches the
      source ID.

1. After you import all versions, set the target subject's compatibility level to the
   level that you recorded from the source:

   ```bash
   curl -u SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD \
     -X PUT \
     -H "Content-Type: application/vnd.schemaregistry.v1+json" \
     -d '{"compatibility":"COMPATIBILITY_LEVEL"}' \
     SCHEMA_REGISTRY_URL/config/SUBJECT_NAME
   ```

   If the source subject used the source's global level, choose one of the following:

   - Set that level on the target subject, using the preceding command. The effective level
     stays the same.
   - Leave the target subject without a setting, so it inherits the target's global
     level. First confirm that the target's global level matches the source's.

1. Delete the subject's mode setting, so that the subject follows the registry mode:

   ```bash
   curl -u SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD \
     -X DELETE \
     SCHEMA_REGISTRY_URL/mode/SUBJECT_NAME
   ```

   The script does the same. To pin the subject to `READWRITE` mode regardless of later
   changes to the registry mode, set an explicit mode instead:

   ```bash
   curl -u SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD \
     -X PUT \
     -H "Content-Type: application/vnd.schemaregistry.v1+json" \
     -d '{"mode":"READWRITE"}' \
     SCHEMA_REGISTRY_URL/mode/SUBJECT_NAME
   ```

## Import into a non-empty registry

By default, `IMPORT` mode requires a registry or subject with no live schemas.

:::warning[Warning]
Import into an empty registry or subject when you can. Use `force=true` only after you
confirm that the IDs and versions you import don't conflict with schemas that are
already on the target.
:::

To set `IMPORT` mode on a subject that already has live schemas, add `force=true`:

```bash
curl -u SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD \
  -X PUT \
  -H "Content-Type: application/vnd.schemaregistry.v1+json" \
  -d '{"mode":"IMPORT"}' \
  "SCHEMA_REGISTRY_URL/mode/SUBJECT_NAME?force=true"
```

Replace the following:

- `SCHEMA_REGISTRY_USER` and `SCHEMA_REGISTRY_PASSWORD`: credentials for the target
  registry, from the **Schema Registry** tab of **Connect information** in the Aiven
  Console.
- `SCHEMA_REGISTRY_URL`: Schema Registry URL of your Aiven service, which is the target.
- `SUBJECT_NAME`: name of the subject. URL-encode it when you use it in a request path.

The `force=true` parameter also works with `PUT /mode`, which sets the mode for the whole
registry. In the script, use the `--force` option. The parameter and the option skip only
the requirement for no live schemas. Schema Registry still rejects the request if an ID
or version is already bound to different content.

## Verify the migration

In the commands in this section, replace `SCHEMA_REGISTRY_URL`, `SCHEMA_REGISTRY_USER`,
`SCHEMA_REGISTRY_PASSWORD`, `SUBJECT_NAME`, and `VERSION` with the values that you used
in the migration.

### Verify a script migration

The script's Verify step checks that every imported version has its source schema ID.
To confirm that the script reproduced the soft-delete status, compare the versions,
including soft-deleted ones, with the source. Add `?deleted=true` to the versions
request:

```bash
curl -u SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD \
  "SCHEMA_REGISTRY_URL/subjects/SUBJECT_NAME/versions?deleted=true"
```

### Verify an API migration

1. Confirm that the target registry is in `READWRITE` mode:

   ```bash
   curl -u SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD \
     SCHEMA_REGISTRY_URL/mode
   ```

   For a subject migration, verify each subject:

   ```bash
   curl -u SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD \
     SCHEMA_REGISTRY_URL/mode/SUBJECT_NAME
   ```

   If the subject has no mode setting of its own, the response shows the registry mode.

1. Get each target version and compare its ID, version, schema type, definition, and
   references with the saved source response:

   ```bash
   curl -u SCHEMA_REGISTRY_USER:SCHEMA_REGISTRY_PASSWORD \
     SCHEMA_REGISTRY_URL/subjects/SUBJECT_NAME/versions/VERSION
   ```

### Run final checks

After either method, do the following:

1. Confirm that the target has every subject that you migrated, for example with
   `GET /subjects`, and that each subject's compatibility setting matches the source,
   for example with `GET /config/SUBJECT_NAME`.
1. If you migrated by subject, compare the target's global compatibility level with the
   source's. Send a `GET` request to `/config` on each registry. Subjects without their
   own setting use the global level.
1. Configure a test consumer to use the Schema Registry of your Aiven service. Confirm
   that it can deserialize existing messages, including messages that use schemas with
   references.
1. If you used `--reserve-subject`, confirm that the Reserve source max ID step reported
   the ID that it holds, or that it skipped because the source issued no higher ID.

## Switch clients to the target

After you verify the migration, switch your clients to the target registry:

1. Update your producers and consumers to use the Schema Registry URL and credentials of
   your Aiven service.
1. Restart any producers that you stopped.
1. Resume schema changes against the target registry.

:::important
Keep the source registry running until your clients work with the target. You can switch
clients back to it only until they register new schemas on the target, because those
schemas aren't on the source.
:::

Schema migration doesn't copy Kafka topics or messages. If you migrate Kafka data
separately, plan the cutover for both migrations together.

## Troubleshoot migration errors

If an import stops, the script marks the remaining steps `not run` and prints a hint.
Fix the cause and run the same import command again. The script repeats the versions
that are already imported without changing them. If you use the API, list the versions
that the registry already imported, register the remaining ones, and set the subject
back to `READWRITE` mode.

If the import stops partway, the target can stay in `IMPORT` mode. Keep ordinary
registrations paused until the import is complete. The script summary shows which
subjects are still in `IMPORT` mode. With the API, check the registry mode with
`GET SCHEMA_REGISTRY_URL/mode` and each subject with
`GET SCHEMA_REGISTRY_URL/mode/SUBJECT_NAME`.

The registry returns an `error_code` field in the response body, in addition to the HTTP
status code. The following table lists common problems:

<!-- markdownlint-disable MD013 -->

| Error | What to do |
| --- | --- |
| HTTP `401 Unauthorized` or `403 Forbidden` status code | Authentication failed, or the user lacks permission. If you don't use `avnadmin`, confirm that the user has the `schema_registry_write` ACL entries for `Config:` and the subjects that you migrate. For more information, see [Schema Registry authorization](/docs/products/kafka/karapace/howto/enable-schema-registry-authorization). If you use OIDC, verify the roles. |
| Error code `42205` with `not allowed` | The target doesn't allow mode changes. Contact the Aiven support team and include the service name and the full error response. |
| Error code `42205` during registration | The subject isn't in `IMPORT` mode, for example because the mode changed during the run. Set `IMPORT` mode again and resume. |
| Error code `40901` with a message that starts with `Cannot import` | The target has live schemas in the scope you chose. Use `--force` only after you confirm that the IDs and versions don't conflict. See [Import into a non-empty registry](#import-into-a-non-empty-registry). |
| Error code `40901` with any other message | The target already has this ID or version with different content. `--force` doesn't help. Resolve the conflict that the Check target step reports, or use a new target. |
| Error code `42207` with `already registered` | The target doesn't allow the same schema content under more than one ID. Contact the Aiven support team and include the service name and the full error response. |
| Error code `42202` or `42207` with any other message | The ID or version is outside the range 1 to 2,147,483,647. You can't import this schema with its original ID. |
| HTTP `422 Unprocessable Entity` status code | The registry rejected the schema. If it has references, confirm that the referenced schemas are in the export, and import them first. |

<!-- markdownlint-enable MD013 -->

<RelatedPages/>

- [Schema references in Karapace](/docs/products/kafka/karapace/concepts/schema-references)
- [Register schemas with references in Karapace](/docs/products/kafka/karapace/howto/register-schemas-with-references)
- [Karapace import mode in the open source documentation](https://www.karapace.io/docs/import-mode)
