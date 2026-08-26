---
title: Manage the Karapace version
sidebar_label: Manage the Karapace version
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

You can pin your Aiven for Apache Kafka® service to a specific Karapace version.

Pin a version to test compatibility or to control which Karapace version the
service runs. If you do not pin a version, the service uses the most recent
Karapace version Aiven provides through maintenance updates. A pinned version
stays in use until you change `karapace_version` or set it to `null`.

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/get-started-kafka)
  with Karapace enabled
- A [maintenance update](/docs/products/kafka/howto/maintenance-updates#maintenance-updates)
  that includes Karapace version pinning

## Set the version

Set `karapace_version` to the version you want the service to run. Use the same
setting to pin a version, upgrade, or roll back.

<Tabs groupId="tool">
<TabItem value="console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. Select your project and your Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="service settings"/>.
1. Click **Advanced configuration** > **Configure**.
1. Click <ConsoleLabel name="Add config options"/>.
1. Set **`karapace_version`** to a supported version, for example, `6.2.2`.
1. Click **Save configuration**.

</TabItem>
<TabItem value="cli" label="CLI">

Run the following command:

```shell
avn service update SERVICE_NAME --project PROJECT_NAME \
  -c karapace_version=VERSION
```

Replace the following:

- `SERVICE_NAME`: name of your Aiven for Apache Kafka service
- `PROJECT_NAME`: name of your Aiven project
- `VERSION`: Karapace version to use, for example, `6.2.2`

</TabItem>
<TabItem value="api" label="API">

Send the following `PUT` request:

```shell
curl --request PUT \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  --header "Authorization: Bearer API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"user_config": {"karapace_version": "VERSION"}}'
```

Replace the following:

- `PROJECT_NAME`: name of your Aiven project
- `SERVICE_NAME`: name of your Aiven for Apache Kafka service
- `API_TOKEN`: your [Aiven API token](/docs/platform/howto/create_authentication_token)
- `VERSION`: Karapace version to use, for example, `6.2.2`

</TabItem>
</Tabs>

### Troubleshoot a failed change

If Aiven returns an error when you set the version, apply a
[maintenance update](/docs/products/kafka/howto/maintenance-updates#maintenance-updates).
The update enables Karapace version pinning or installs the selected version on
the service nodes. You can also replace a node to install the required version.
Then set the version again.

## Remove the version pin

Set `karapace_version` to `null` to stop pinning a version. The service then
uses the most recent Karapace version Aiven provides through maintenance updates.

The Aiven Console cannot set `karapace_version` to `null`. Use the Aiven CLI or
Aiven API.

<Tabs groupId="tool">
<TabItem value="cli" label="CLI" default>

Run the following command:

```shell
avn service update SERVICE_NAME --project PROJECT_NAME \
  -c karapace_version=null
```

Replace the following:

- `SERVICE_NAME`: name of your Aiven for Apache Kafka service
- `PROJECT_NAME`: name of your Aiven project

</TabItem>
<TabItem value="api" label="API">

Send the following `PUT` request:

```shell
curl --request PUT \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  --header "Authorization: Bearer API_TOKEN" \
  --header "Content-Type: application/json" \
  --data '{"user_config": {"karapace_version": null}}'
```

Replace the following:

- `PROJECT_NAME`: name of your Aiven project
- `SERVICE_NAME`: name of your Aiven for Apache Kafka service
- `API_TOKEN`: your [Aiven API token](/docs/platform/howto/create_authentication_token)

</TabItem>
</Tabs>

## Verify the pinned version

Check `karapace_version` to see whether the service is pinned.

<Tabs groupId="tool">
<TabItem value="console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. Select your project and your Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="service settings"/>.
1. Click **Advanced configuration**.
1. Check the **`karapace_version`** value.

</TabItem>
<TabItem value="cli" label="CLI">

Run the following command:

```shell
avn service get SERVICE_NAME --project PROJECT_NAME --json
```

Replace the following:

- `SERVICE_NAME`: name of your Aiven for Apache Kafka service
- `PROJECT_NAME`: name of your Aiven project

</TabItem>
<TabItem value="api" label="API">

Send the following `GET` request:

```shell
curl --request GET \
  --url "https://api.aiven.io/v1/project/PROJECT_NAME/service/SERVICE_NAME" \
  --header "Authorization: Bearer API_TOKEN"
```

Replace the following:

- `PROJECT_NAME`: name of your Aiven project
- `SERVICE_NAME`: name of your Aiven for Apache Kafka service
- `API_TOKEN`: your [Aiven API token](/docs/platform/howto/create_authentication_token)

</TabItem>
</Tabs>

In the Aiven Console, a version number means the service is pinned to that
version. If **`karapace_version`** is not listed or has no value, the service is
not pinned.

In the CLI output or API response, check `karapace_version` in `user_config`.
A version number means the service is pinned. If the value is `null` or the
field is not present, the service is not pinned.

## Related pages

- [Apache Kafka maintenance updates](/docs/products/kafka/howto/maintenance-updates#maintenance-updates)
- [Aiven CLI reference: avn service update](/docs/tools/cli/service-cli#avn-cli-service-update)
- [Aiven REST API reference](https://api.aiven.io/doc/)
