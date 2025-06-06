---
title: Manage Google service account credentials in Aiven for AlloyDB Omni
sidebar_label: Manage Google credentials
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Store and manage Google service account credentials in Aiven for AlloyDB Omni to use them for AI integration purposes.

Add, update, or delete your Google service account credentials in Aiven for AlloyDB Omni
using either the [Aiven Console](https://console.aiven.io) or the
[Aiven CLI client](/docs/tools/cli).

## Prerequisites

- Aiven for AlloyDB Omni service running
- [Service account created with Google Cloud](https://cloud.google.com/iam/docs/service-accounts-create)
- [Google service account key created and downloaded](https://cloud.google.com/iam/docs/keys-create-delete#creating)
- Access to one of the following tools:
  - [Aiven Console](https://console.aiven.io)
  - [Aiven CLI](/docs/tools/cli)
  - [Aiven API](/docs/tools/api)

## Manage Google credentials in Aiven

### Add a key

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>
1. Go to the [Aiven Console](https://console.aiven.io) and your Aiven for AlloyDB Omni service.
1. Go to <ConsoleLabel name="generativeai"/> > **Goolge service account key**.
1. Click **Upload file** > **Choose file**, select the JSON file including your Google
   service account key, and click **Upload**.
</TabItem>
<TabItem value="cli" label="CLI">
Run:

```bash
avn service alloydbomni google-cloud-private-key set --service SERVICE_NAME --private-key-file PRIVATE_KEY_FILE
```

where:

- `SERVICE_NAME` is the name of your service
- `PRIVATE_KEY_FILE` is the path to your key file

</TabItem>
<TabItem value="api" label="API">
Make a request to the
[AlloyDbOmniGoogleCloudPrivateKeySet](https://api.aiven.io/doc/#tag/Service:_AlloyDB_Omni/operation/AlloyDbOmniGoogleCloudPrivateKeySet)
endpoint.
</TabItem>
</Tabs>

### Update a key

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>
1. Go to the [Aiven Console](https://console.aiven.io) and your Aiven for AlloyDB Omni service.
1. Go to <ConsoleLabel name="generativeai"/> > **Goolge service account key**.
1. Click <ConsoleLabel name="actions"/> > **Replace file** > **Choose file**, select the
   JSON file including your new Google service account key, and click **Upload**.
</TabItem>
<TabItem value="cli" label="CLI">
Run:

```bash
avn service alloydbomni google-cloud-private-key set --service SERVICE_NAME --private-key-file PRIVATE_KEY_FILE
```

where:

- `SERVICE_NAME` is the name of your service
- `PRIVATE_KEY_FILE` is the path to your new key file

</TabItem>
<TabItem value="api" label="API">
Make a request to the
[AlloyDbOmniGoogleCloudPrivateKeySet](https://api.aiven.io/doc/#tag/Service:_AlloyDB_Omni/operation/AlloyDbOmniGoogleCloudPrivateKeySet)
endpoint.
</TabItem>
</Tabs>

### Delete a key

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>
1. Go to the [Aiven Console](https://console.aiven.io) and your Aiven for AlloyDB Omni service.
1. Go to <ConsoleLabel name="generativeai"/> > **Goolge service account key**.
1. Click <ConsoleLabel name="actions"/> > **Delete file** > **Delete**.
</TabItem>
<TabItem value="cli" label="CLI">
Run:

```bash
avn service alloydbomni google-cloud-private-key delete --service SERVICE_NAME
```

</TabItem>
<TabItem value="api" label="API">
Make a request to the
[AlloyDbOmniGoogleCloudPrivateKeyRemove](https://api.aiven.io/doc/#tag/Service:_AlloyDB_Omni/operation/AlloyDbOmniGoogleCloudPrivateKeyRemove)
endpoint.
</TabItem>
</Tabs>

## Get key details

Display the key ID and the client email associated with your key.

<Tabs groupId="group1">
<TabItem value="gui" label="Console" default>
1. Go to the [Aiven Console](https://console.aiven.io) and your Aiven for AlloyDB Omni service.
1. Go to <ConsoleLabel name="generativeai"/> > **Google service account key**.
</TabItem>
<TabItem value="cli" label="CLI">
Run:

```bash
avn service alloydbomni google-cloud-private-key show --service SERVICE_NAME
```

</TabItem>
<TabItem value="api" label="API">
Make a request to the
[AlloyDbOmniGoogleCloudPrivateKeyIdentify](https://api.aiven.io/doc/#tag/Service:_AlloyDB_Omni/operation/AlloyDbOmniGoogleCloudPrivateKeyIdentify)
endpoint.
</TabItem>
</Tabs>
