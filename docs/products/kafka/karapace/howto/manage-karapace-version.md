---
title: Manage the Karapace version
sidebar_label: Manage the Karapace version
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

You can pin your Aiven for Apache Kafka® service to a specific Karapace version.

By default, your service uses the latest supported Karapace version and upgrades
automatically. A pinned version stays in effect until you remove the setting.
Pin a version to test compatibility before you accept a Karapace upgrade. You can
return to automatic updates at any time.

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/get-started-kafka)
  with Karapace enabled
- The [service maintenance update](/docs/products/kafka/howto/maintenance-updates#maintenance-updates)
  that adds Karapace version pinning. If the update is not applied, Aiven returns
  an error when you try to pin a version.
- [Aiven CLI](/docs/tools/cli)
- [Aiven API](/docs/tools/api)

:::note
Karapace version selection is not available in the Aiven Console. Use the Aiven
CLI or Aiven API instead.
:::

## Set the Karapace version

To pin your service to a specific Karapace version, set the `karapace_version`
configuration option.

<Tabs groupId="tool">
<TabItem value="cli" label="Aiven CLI" default>

```shell
avn service update SERVICE_NAME --project PROJECT_NAME \
  -c karapace_version=VERSION
```

Replace the following:

- `SERVICE_NAME`: name of your Aiven for Apache Kafka® service
- `PROJECT_NAME`: name of your Aiven project
- `VERSION`: Karapace version to use, for example, `6.2.2`

</TabItem>
<TabItem value="api" label="Aiven API">

Use the [Aiven API](https://api.aiven.io/doc/) to update the service configuration:

```shell
curl --request PUT \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  --header "Authorization: Bearer API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"user_config": {"karapace_version": "VERSION"}}'
```

Replace the following:

- `PROJECT_NAME`: name of your Aiven project
- `SERVICE_NAME`: name of your Aiven for Apache Kafka® service
- `API_TOKEN`: your [Aiven API token](/docs/platform/howto/create_authentication_token)
- `VERSION`: Karapace version to use, for example, `6.2.2`

</TabItem>
</Tabs>

## Return to automatic updates

To stop pinning and return to automatic Karapace version updates, set
`karapace_version` to `null`.

<Tabs groupId="tool">
<TabItem value="cli" label="Aiven CLI" default>

```shell
avn service update SERVICE_NAME --project PROJECT_NAME \
  -c karapace_version=null
```

</TabItem>
<TabItem value="api" label="Aiven API">

```shell
curl --request PUT \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  --header "Authorization: Bearer API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"user_config": {"karapace_version": null}}'
```

</TabItem>
</Tabs>

## Verify the Karapace version

To confirm which version your service is set to use, review the service configuration.

<Tabs groupId="tool">
<TabItem value="cli" label="Aiven CLI" default>

```shell
avn service get SERVICE_NAME --project PROJECT_NAME --json
```

</TabItem>
<TabItem value="api" label="Aiven API">

```shell
curl --request GET \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  --header "Authorization: Bearer API_TOKEN"
```

</TabItem>
</Tabs>

In the response, find `karapace_version` in `user_config`. If it shows a
version number, your service is pinned to that Karapace version. If it shows
`null`, your service uses automatic Karapace version updates.

## Related pages

- [Apache Kafka maintenance updates](/docs/products/kafka/howto/maintenance-updates#maintenance-updates)
- [Aiven CLI reference: avn service update](/docs/tools/cli/service-cli#avn-cli-service-update)
- [Aiven API documentation](https://api.aiven.io/doc/)
