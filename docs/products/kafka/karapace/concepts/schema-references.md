---
title: Schema references in Karapace
sidebar_label: Schema references
---

import RelatedPages from "@site/src/components/RelatedPages";

Schema references let you register a schema that depends on other schemas already
stored in the Schema Registry. Use schema references to reuse shared schemas instead
of copying their definitions into every schema that uses them.

For example, if a `Country` record is used by `Address`, and `Address` is used by
`Person`, you can register each type once and reference it by subject and version.

## Supported schema formats

Karapace supports schema references for:

- Avro (Karapace 6.1.0 or later)
- Protobuf

:::note
Schema references are not supported for JSON Schema. If you register a JSON Schema
with a `references` array, Karapace returns an HTTP `422 Unprocessable Entity` status code.
:::

## How schema references work

When you register a schema that uses types defined in other subjects, include a
`references` array. Each entry lists `name`, `subject`, and `version`. For Avro,
`name` is a label. For Protobuf, `name` must match the `import` path.

Each reference points to a specific schema version. Karapace loads those schema
versions and uses the linked definitions when validating schemas or checking
compatibility.

## When to use schema references

Use schema references to:

- Reuse the same record or message shape across several subjects with one source of
  truth instead of duplicated inline definitions.
- Manage updates to a shared type in one subject instead of editing duplicated
  definitions in many schemas.

## Schema Registry API structure

When you register a schema with the Schema Registry API, include a `references` array
in the request body. The following example shows the shape of the payload (the HTTP
method and path are shown for context):

```json
POST /subjects/{subject}/versions
{
  "schemaType": "AVRO",
  "schema": "<schema JSON string>",
  "references": [
    {
      "name": "<reference name>",
      "subject": "<subject where the referenced schema is registered>",
      "version": <version number>
    }
  ]
}
```

Each object in `references` uses the following fields:

- **`name`**: Identifies the reference in the registration payload. For Avro, use a
  file-style label such as `address.avsc`; the `.avsc` suffix is a convention, not a
  requirement. For Protobuf, set `name` to the import path, such as `address.proto`,
  which must match the `import` statement exactly. Resolution behavior differs by
  format; see [Avro references](#avro-references) and
  [Protobuf references](#protobuf-references).
- **`subject`**: The subject where the referenced schema is registered in Karapace.
- **`version`**: The schema version to reference.

Register every referenced schema before you register a schema that lists it in
`references`.

## Avro references

In Avro, the `name` field is a label only. Karapace resolves each reference from the
Avro type names in your schema, together with the `subject` and `version` fields. For
example, an `Address` record that uses a `Country` type includes a `references` entry
with `subject` and `version` pointing to the registration that contains the `Country`
record.

Use
[Register schemas with references in Karapace](/docs/products/kafka/karapace/howto/register-schemas-with-references)
for complete `curl` examples that register dependent Avro schemas.

## Protobuf references

Protobuf uses the same `references` array as Avro. Unlike Avro, Karapace uses the
`name` field to resolve the reference. Set `name` to the import path from your
`.proto` file, such as `address.proto`. The value must match the `import` statement
exactly.

Use
[Register schemas with references in Karapace](/docs/products/kafka/karapace/howto/register-schemas-with-references)
for complete `curl` examples that register dependent Protobuf schemas.

## Compatibility checks with references

Compatibility checks behave the same for schemas with references as for standalone
schemas. Karapace resolves referenced schema versions before it evaluates compatibility.

Each reference pins a specific schema version. Update the `version` field in the
corresponding `references` entry when adopting a newer version of a referenced schema.

<RelatedPages/>

- [Register schemas with references in Karapace](/docs/products/kafka/karapace/howto/register-schemas-with-references)
- [Get started with Karapace](/docs/products/kafka/karapace/get-started)
- [Karapace schema registry authorization](/docs/products/kafka/karapace/concepts/schema-registry-authorization)
- [Enable Karapace schema registry and REST APIs](/docs/products/kafka/karapace/howto/enable-karapace)
