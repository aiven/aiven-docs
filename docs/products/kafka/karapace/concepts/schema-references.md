---
title: Schema references in Karapace
sidebar_label: Schema references
---

import RelatedPages from "@site/src/components/RelatedPages";

Schema references let you register a schema that depends on other schemas already stored in the Schema Registry.
Use them to reuse shared schemas instead of copying definitions into every schema.

For example, if a `Country` record is used by `Address`, and `Address` is used by
`Person`, register each type once and reference it by subject and version.
In the Schema Registry, a subject is the named schema stream (for example, `address`).

## When to use schema references

Use schema references to:

- Keep one source of truth for a shared record or message shape across subjects
- Update a shared type in one place instead of editing many duplicated schemas

## Supported schema formats

Karapace supports schema references for:

- Avro (Karapace 6.1.0 or later)
- Protobuf

:::note
Schema references are not supported for JSON Schema.
If you register a JSON Schema with a `references` array, Karapace returns
HTTP `422 Unprocessable Entity`.
:::

## How schema references work

When a schema uses types from other subjects, include a `references` array in the
registration request.
Each entry lists `name`, `subject`, and `version`.

Each reference points to a specific schema version.
Karapace loads those versions when it validates schemas or checks compatibility.

Register every referenced schema before you register a schema that lists it in
`references`.

## Schema Registry API structure

You register schemas with references over the Schema Registry HTTP API.
Include a `references` array in the request body.
The following example shows the payload shape:

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

Fields in each `references` object:

| Field | Purpose |
|-------|---------|
| `name` | Label or import path used in the registration payload. Behavior differs by format. |
| `subject` | Subject where the referenced schema is registered. |
| `version` | Schema version to reference. |

For format-specific `name` rules, see [Avro references](#avro-references) and
[Protobuf references](#protobuf-references).

For complete `curl` examples, see
[Register schemas with references](/docs/products/kafka/karapace/howto/register-schemas-with-references).

## Avro references

In Avro, `name` is a label only.
A file-style value such as `address.avsc` is a convention, not a requirement.

Karapace resolves each reference from the Avro type names in your schema, together
with `subject` and `version`.
For example, an `Address` record that uses a `Country` type needs a `references`
entry whose `subject` and `version` point to the `Country` registration.

For `curl` examples, see
[Register schemas with references](/docs/products/kafka/karapace/howto/register-schemas-with-references#example-avro-records-with-references).

## Protobuf references

Protobuf uses the same `references` array as Avro.
Unlike Avro, Karapace uses `name` to resolve the reference.

Set `name` to the import path from your `.proto` file, such as `address.proto`.
The value must match the `import` statement exactly.

For `curl` examples, see
[Register schemas with references](/docs/products/kafka/karapace/howto/register-schemas-with-references#example-protobuf-messages-with-imports).

## Compatibility checks with references

Compatibility checks work the same for schemas with references as for standalone
schemas.
Karapace resolves referenced schema versions before it evaluates compatibility.

Each reference pins a specific schema version.
Update `version` in the matching `references` entry when you adopt a newer version
of a referenced schema.

<RelatedPages/>

- [Register schemas with references](/docs/products/kafka/karapace/howto/register-schemas-with-references)
- [Enable schema registry and REST proxy](/docs/products/kafka/karapace/howto/enable-karapace)
- [Karapace](/docs/products/kafka/karapace)
