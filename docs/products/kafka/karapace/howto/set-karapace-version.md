---
title: Set the Karapace version
sidebar_label: Set the Karapace version
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/ConsoleIcons";

You can set which Karapace version your Aiven for Apache Kafka® service runs.

Set a specific version to test compatibility or to control upgrades. If you do
not set a version, the service uses the latest Karapace version available
through maintenance updates. After you set `karapace_version`, the service
keeps that version until you change the setting or set it to `null`.

## Prerequisites

- An [Aiven for Apache Kafka® service](/docs/products/kafka/get-started/get-started-kafka)
  with Karapace enabled
- A [maintenance update](/docs/products/kafka/howto/maintenance-updates#maintenance-updates)
  that includes Karapace version selection

## Set a Karapace version

Set `karapace_version` to one of the Karapace versions currently available for
selection. Aiven makes the two most recent Karapace versions available for
selection. To upgrade or roll back, change the setting to another version that
is currently available.

Older Karapace versions can remain supported for services already running them.
They might no longer be available for version selection.

<Tabs groupId="tool">
<TabItem value="console" label="Console" default>

1. Log in to the [Aiven Console](https://console.aiven.io/).
1. Select your project and your Aiven for Apache Kafka service.
1. Click <ConsoleLabel name="service settings"/>.
1. Click **Advanced configuration** > **Configure**.
1. Click <ConsoleLabel name="Add config options"/>.
1. Set **`karapace_version`** to a version currently available for selection, for
   example, `6.2.2`.
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
- `VERSION`: Karapace version currently available for selection, for example, `6.2.2`

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
- `VERSION`: Karapace version currently available for selection, for example, `6.2.2`

</TabItem>
</Tabs>

### Troubleshoot a failed change

If Aiven returns an error when you set the version, apply a
[maintenance update](/docs/products/kafka/howto/maintenance-updates#maintenance-updates).
The update enables Karapace version selection or makes the selected version
available on the service. Then set the version again.

## Stop using a specific version

Set `karapace_version` to `null` to stop using a specific version. The service
then uses the latest Karapace version available through maintenance updates.

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

## Check the Karapace version

Check `karapace_version` to see whether the service is set to a specific
version.

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

In the Aiven Console, if **`karapace_version`** shows a version number, the
service is set to that version. If the option is not listed or has no value,
the service is not set to a specific version.

In the CLI output or API response, check `karapace_version` in `user_config`.
If it contains a version number, the service is set to that version. If the
value is `null` or the field is not present, the service is not set to a
specific version.

## Related pages

- [Apache Kafka maintenance updates](/docs/products/kafka/howto/maintenance-updates#maintenance-updates)
- [Aiven CLI reference: avn service update](/docs/tools/cli/service-cli#avn-cli-service-update)
- [Aiven REST API reference](https://api.aiven.io/doc/)
