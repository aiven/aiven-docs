---
title: Supported Valkey™ modules
sidebar_label: Modules
---

import RelatedPages from "@site/src/components/RelatedPages";

Aiven for Valkey™ includes pre-enabled modules that extend core Valkey™ functionality with additional data types and commands.

## Valkey™ Bloom

Valkey™ Bloom adds a probabilistic Bloom filter data type to Valkey. A Bloom filter is a
space-efficient data structure that tests set membership: it can tell you that an element
is _possibly in a set_ or _definitely not in a set_, using a fraction of the memory needed
to store the elements themselves.

Valkey™ Bloom is available on Aiven for Valkey services running Valkey 9 and later.

### Configuration

- Valkey™ Bloom is enabled by default.
- No configuration is required.
- Valkey™ Bloom cannot be disabled.

### Capabilities

Valkey™ Bloom allows you to:

- Create Bloom filters with a custom capacity and false positive rate
- Add single or multiple elements to a filter
- Check whether one or more elements might exist in a filter
- Scale filters automatically as more elements are added
- Persist filters alongside the rest of your data

Bloom filters suit high-traffic workloads where you need to prevent cache penetration,
deduplicate streams, or filter out known items at low memory cost. You interact with them
through the `BF.*` command family, such as `BF.ADD`, `BF.EXISTS`, `BF.MADD`, `BF.MEXISTS`,
and `BF.RESERVE`.

For complete documentation on Valkey™ Bloom commands and usage, see the
[Valkey Bloom documentation](https://valkey.io/topics/bloomfilters/).

## Valkey™ JSON

Valkey™ JSON provides native JSON document storage and manipulation capabilities within Valkey.

### Configuration

- Valkey™ JSON is enabled by default.
- No configuration is required.
- Valkey™ JSON cannot be disabled.

### Capabilities

Valkey™ JSON allows you to:

- Store JSON documents as values
- Query JSON documents using JSONPath
- Make atomic updates to JSON elements
- Index and search JSON data

For complete documentation on Valkey™ JSON commands and usage, see the
[Valkey™ JSON documentation](https://valkey.io/topics/valkey-json/).

<RelatedPages/>

- [Valkey data types](https://valkey.io/topics/data-types/)
- [Valkey commands reference](https://valkey.io/commands/)
