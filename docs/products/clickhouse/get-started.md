---
title: Get started with Aiven for ClickHouse®
sidebar_label: Get started
keywords: [quick start]
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"
import CreateService from "@site/static/includes/create-service-console.md"

Start using Aiven for ClickHouse® by creating and configuring a service, connecting to it, and loading sample data.

## Prerequisites

Depending on a dev tool to use for working with Aiven for ClickHouse:

- Access to the [Aiven Console](https://console.aiven.io)
- [ClickHouse CLI client](https://clickhouse.com/docs/en/install)
- [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
- [Aiven Operator for Kubernetes®](https://aiven.github.io/aiven-operator/installation/helm.html)
- [Docker](https://docs.docker.com/desktop/)

## Create an Aiven for ClickHouse® service

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>

<CreateService serviceType="ClickHouse®"/>

</TabItem>
<TabItem value="2" label="Terraform">

1. [Create a token](/docs/platform/howto/create_authentication_token).

1. Create the `sample.tf` file for the `aiven` provider configuration and
   the `aiven_clickhouse` resource.

    ```hcl
    variable "aiven_token" {
      type = string
    }

    variable "aiven_project_name" {
      type = string
    }

    terraform {
      required_providers {
        aiven = {
          source  = "aiven/aiven"
          version = ">=4.0.0, <5.0.0"
        }
      }
    }

    provider "aiven" {
      api_token = var.aiven_token
    }

    resource "aiven_clickhouse" "clickhouse" {
      project                 = var.aiven_project_name
      cloud_name              = "google-europe-west1"
      plan                    = "startup-16"
      service_name            = "my-clickhouse"
      maintenance_window_dow  = "friday"
      maintenance_window_time = "23:00:00"

      clickhouse_user_config {
        service_log = false
      }
    }

    output "clickhouse_service_host" {
      value = aiven_clickhouse.clickhouse.service_host
    }

    output "clickhouse_service_port" {
      value = aiven_clickhouse.clickhouse.service_port
    }

    output "clickhouse_service_username" {
      value = aiven_clickhouse.clickhouse.service_username
    }

    output "clickhouse_service_password" {
      value     = aiven_clickhouse.clickhouse.service_password
      sensitive = true
    }
    ```

1. Create the `terraform.tfvars` file for assigning actual values to your previously
   declared variables.

   ```hcl
   aiven_token    = "AIVEN_TOKEN"
   aiven_project_name = "PROJECT_NAME"
   ```

1. Run `terraform init` > `terraform plan` > `terraform apply --auto-approve`.

1. Store Terraform outputs in environment variables so that they can be used for
   [connecting](#connect-to-service):

   ```bash
   CLICKHOUSE_HOST="$(terraform output -raw clickhouse_service_host)"
   CLICKHOUSE_PORT="$(terraform output -raw clickhouse_service_port)"
   CLICKHOUSE_USER="$(terraform output -raw clickhouse_service_username)"
   CLICKHOUSE_PASSWORD="$(terraform output -raw clickhouse_service_password)"
   ```

</TabItem>
<TabItem value="3" label="Kubernetes">

Create an Aiven for ClickHouse service using the Aiven Operator for Kubernetes.

1. [Get authenticated and authorized](https://aiven.github.io/aiven-operator/authentication.html).
1. Create file `example.yaml` with the following content:

   ```yaml
   apiVersion: aiven.io/v1alpha1
   kind: Clickhouse
   metadata:
     name: my-clickhouse
   spec:
     authSecretRef:
       name: aiven-token
       key: token

     connInfoSecretTarget:
       name: my-clickhouse-connection

     userConfig:
       service_log: false

     project: my-aiven-project
     cloudName: google-europe-west1
     plan: startup-16

     maintenanceWindowDow: friday
     maintenanceWindowTime: 23:00:00
     ```

1. Create the service by applying the configuration:

   ```go
   kubectl apply -f example.yaml
   ```

1. Review the resource you created with the following command:

   ```go
   kubectl get clickhouses my-clickhouse
   ```

The output is similar to the following:

```text
Name             Project             Region                 Plan          State
my-clickhouse    my-aiven-project    google-europe-west1    startup-16    RUNNING
```

The resource can stay in the `REBUILDING` state for a couple of minutes. Once the state
changes to `RUNNING`, you are ready to access it.
</TabItem>
</Tabs>

## Configure the service

You can change your service settings by updating the service configuration.

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
1. Select the new service from the list of services on
   the <ConsoleLabel name="Services"/> page.
1. On the <ConsoleLabel name="overview"/> page, select <ConsoleLabel name="service settings"/>
   from the sidebar.
1. In the **Advanced configuration** section, make changes to the service configuration.
</TabItem>
<TabItem value="2" label="Terraform">

:::note
Your changes can force the recreation of the `aiven_clickhouse` resource.
:::

:::tip
For all the attributes available for the `aiven_clickhouse` resource, see
[the Aiven Provider for Terraform® documentation](https://registry.terraform.io/providers/aiven/aiven/latest/docs/resources/clickhouse).
:::

1. Updating the `aiven_clickhouse` resource in the `sample.tf` file:

   - Add `service_log = true` and `termination_protection = true`.
   - Update `maintenance_window_dow = "sunday"` and `maintenance_window_time = "22:00:00"`.

    ```hcl
    variable "aiven_token" {
      type = string
    }

    variable "aiven_project_name" {
      type = string
    }

    terraform {
      required_providers {
        aiven = {
          source  = "aiven/aiven"
          version = ">=4.0.0, <5.0.0"
        }
      }
    }

    provider "aiven" {
      api_token = var.aiven_token
    }

    resource "aiven_clickhouse" "clickhouse" {
      project                 = var.aiven_project_name
      cloud_name              = "google-europe-west1"
      plan                    = "startup-16"
      service_name            = "my-clickhouse"
      maintenance_window_dow  = "sunday"
      maintenance_window_time = "22:00:00"
      termination_protection  = true

      clickhouse_user_config {
        service_log = true
      }
    }

    output "clickhouse_service_host" {
      value = aiven_clickhouse.clickhouse.service_host
    }

    output "clickhouse_service_port" {
      value = aiven_clickhouse.clickhouse.service_port
    }

    output "clickhouse_service_username" {
      value = aiven_clickhouse.clickhouse.service_username
    }

    output "clickhouse_service_password" {
      value     = aiven_clickhouse.clickhouse.service_password
      sensitive = true
    }
    ```

1. Run `terraform plan` > `terraform apply --auto-approve`.

</TabItem>
<TabItem value="3" label="Kubernetes">
1. Update file `example.yaml`:

   - Add `service_log: true` and `terminationProtection: true`.
   - Update `maintenanceWindowDow: sunday` and `maintenanceWindowTime: 22:00:00`.

   ```yaml
   apiVersion: aiven.io/v1alpha1
   kind: Clickhouse
   metadata:
     name: my-clickhouse
   spec:
     authSecretRef:
       name: aiven-token
       key: token

     connInfoSecretTarget:
       name: my-clickhouse-connection

     userConfig:
       service_log: true

     project: my-aiven-project
     cloudName: google-europe-west1
     plan: startup-16

     maintenanceWindowDow: sunday
     maintenanceWindowTime: 22:00:00
     terminationProtection: true
     ```

1. Update the service by applying the configuration:

   ```go
   kubectl apply -f example.yaml
   ```

1. Review the resource you updated with the following command:

   ```go
   kubectl get clickhouses my-clickhouse
   ```

The resource can stay in the `REBUILDING` state for a couple of minutes. Once the state
changes to `RUNNING`, you are ready to access it.
</TabItem>
</Tabs>

See the available configuration options in:

- [Aiven Operator for Kubernetes®: ClickHouse](https://aiven.github.io/aiven-operator/api-reference/clickhouse.html)
- [Advanced parameters for Aiven for ClickHouse®](/docs/products/clickhouse/reference/advanced-params).

## Connect to the service{#connect-to-service}

<Tabs groupId="group1">
<TabItem value="1" label="Console" default>
1. Log in to the [Aiven Console](https://console.aiven.io/), and go to your
   organization > project > Aiven for ClickHouse service.
1. On the <ConsoleLabel name="overview"/> page of your service, click
   **Quick connect**.
1. In the **Connect** window, select a tool or language to connect to your service, follow
   the connection instructions, and click **Done**.

   ```bash
   docker run -it \
   --rm clickhouse/clickhouse-server clickhouse-client \
   --user avnadmin \
   --password admin_password \
   --host clickhouse-service-name-project-name.e.aivencloud.com \
   --port 12691 \
   --secure
   ```

</TabItem>
<TabItem value="2" label="Terraform">
Access your new service with the ClickHouse client using the environment variables
assigned to Terraform outputs:

```bash
docker run -it                    \
--rm clickhouse/clickhouse-client \
--user=$CLICKHOUSE_USER           \
--password=$CLICKHOUSE_PASSWORD   \
--host=$CLICKHOUSE_HOST           \
--port=$CLICKHOUSE_PORT           \
--secure
```

</TabItem>
<TabItem value="3" label="ClickHouse client">
[Connect to your new service with CLI](/docs/products/clickhouse/howto/connect-with-clickhouse-cli)
using the
[ClickHouse client](https://clickhouse.com/docs/en/integrations/sql-clients/cli).
</TabItem>
</Tabs>

:::tip
Discover more tools for connecting to Aiven for ClickHouse in
[Connect to Aiven for ClickHouse®](/docs/products/clickhouse/howto/list-connect-to-service).
:::

## Load a dataset

1. Download a dataset from
   [Example Datasets](https://clickhouse.com/docs/en/getting-started/example-datasets/metrica/)
   using cURL:

   ```bash
   curl https://datasets.clickhouse.com/hits/tsv/hits_v1.tsv.xz | unxz --threads=`nproc` > hits_v1.tsv
   curl https://datasets.clickhouse.com/visits/tsv/visits_v1.tsv.xz | unxz --threads=`nproc` > visits_v1.tsv
   ```

   :::note
   The `nproc` Linux command, which prints the number of processing units,
   is not available on macOS. To use the command, add an alias for
   `nproc` into your `~/.zshrc` file: `alias nproc="sysctl -n hw.logicalcpu"`.
   :::

   Once done, you should have two files: `hits_v1.tsv` and `visits_v1.tsv`.

1. Create tables `hits_v1` and `visits_v1` in the `default` database, which has been
   created automatically upon the creation of your Aiven for ClickHouse service.

    <!-- vale off -->
    <details><summary>
    Expand for the `CREATE TABLE default.hits_v1` sample
    </summary>
    ```sql
    CREATE TABLE default.hits_v1 (
      WatchID UInt64,
      JavaEnable UInt8,
      Title String,
      GoodEvent Int16,
      EventTime DateTime,
      EventDate Date,
      CounterID UInt32,
      ClientIP UInt32,
      ClientIP6 FixedString(16),
      RegionID UInt32,
      UserID UInt64,
      CounterClass Int8,
      OS UInt8,
      UserAgent UInt8,
      URL String,
      Referer String,
      URLDomain String,
      RefererDomain String,
      Refresh UInt8,
      IsRobot UInt8,
      RefererCategories Array(UInt16),
      URLCategories Array(UInt16),
      URLRegions Array(UInt32),
      RefererRegions Array(UInt32),
      ResolutionWidth UInt16,
      ResolutionHeight UInt16,
      ResolutionDepth UInt8,
      FlashMajor UInt8,
      FlashMinor UInt8,
      FlashMinor2 String,
      NetMajor UInt8,
      NetMinor UInt8,
      UserAgentMajor UInt16,
      UserAgentMinor FixedString(2),
      CookieEnable UInt8,
      JavascriptEnable UInt8,
      IsMobile UInt8,
      MobilePhone UInt8,
      MobilePhoneModel String,
      Params String,
      IPNetworkID UInt32,
      TraficSourceID Int8,
      SearchEngineID UInt16,
      SearchPhrase String,
      AdvEngineID UInt8,
      IsArtifical UInt8,
      WindowClientWidth UInt16,
      WindowClientHeight UInt16,
      ClientTimeZone Int16,
      ClientEventTime DateTime,
      SilverlightVersion1 UInt8,
      SilverlightVersion2 UInt8,
      SilverlightVersion3 UInt32,
      SilverlightVersion4 UInt16,
      PageCharset String,
      CodeVersion UInt32,
      IsLink UInt8,
      IsDownload UInt8,
      IsNotBounce UInt8,
      FUniqID UInt64,
      HID UInt32,
      IsOldCounter UInt8,
      IsEvent UInt8,
      IsParameter UInt8,
      DontCountHits UInt8,
      WithHash UInt8,
      HitColor FixedString(1),
      UTCEventTime DateTime,
      Age UInt8,
      Sex UInt8,
      Income UInt8,
      Interests UInt16,
      Robotness UInt8,
      GeneralInterests Array(UInt16),
      RemoteIP UInt32,
      RemoteIP6 FixedString(16),
      WindowName Int32,
      OpenerName Int32,
      HistoryLength Int16,
      BrowserLanguage FixedString(2),
      BrowserCountry FixedString(2),
      SocialNetwork String,
      SocialAction String,
      HTTPError UInt16,
      SendTiming Int32,
      DNSTiming Int32,
      ConnectTiming Int32,
      ResponseStartTiming Int32,
      ResponseEndTiming Int32,
      FetchTiming Int32,
      RedirectTiming Int32,
      DOMInteractiveTiming Int32,
      DOMContentLoadedTiming Int32,
      DOMCompleteTiming Int32,
      LoadEventStartTiming Int32,
      LoadEventEndTiming Int32,
      NSToDOMContentLoadedTiming Int32,
      FirstPaintTiming Int32,
      RedirectCount Int8,
      SocialSourceNetworkID UInt8,
      SocialSourcePage String,
      ParamPrice Int64,
      ParamOrderID String,
      ParamCurrency FixedString(3),
      ParamCurrencyID UInt16,
      GoalsReached Array(UInt32),
      OpenstatServiceName String,
      OpenstatCampaignID String,
      OpenstatAdID String,
      OpenstatSourceID String,
      UTMSource String,
      UTMMedium String,
      UTMCampaign String,
      UTMContent String,
      UTMTerm String,
      FromTag String,
      HasGCLID UInt8,
      RefererHash UInt64,
      URLHash UInt64,
      CLID UInt32,
      YCLID UInt64,
      ShareService String,
      ShareURL String,
      ShareTitle String,
      ParsedParams Nested(
        Key1 String,
        Key2 String,
        Key3 String,
        Key4 String,
        Key5 String,
        ValueDouble Float64
      ),
      IslandID FixedString(16),
      RequestNum UInt32,
      RequestTry UInt8
    )
    ENGINE = MergeTree()
    PARTITION BY toYYYYMM(EventDate)
    ORDER BY
      (CounterID, EventDate, intHash32(UserID));
    ```
    </details>

    <details><summary>
    Expand for the `CREATE TABLE default.visits_v1` sample
    </summary>
    ```sql
    CREATE TABLE default.visits_v1 (
      CounterID UInt32,
      StartDate Date,
      Sign Int8,
      IsNew UInt8,
      VisitID UInt64,
      UserID UInt64,
      StartTime DateTime,
      Duration UInt32,
      UTCStartTime DateTime,
      PageViews Int32,
      Hits Int32,
      IsBounce UInt8,
      Referer String,
      StartURL String,
      RefererDomain String,
      StartURLDomain String,
      EndURL String,
      LinkURL String,
      IsDownload UInt8,
      TraficSourceID Int8,
      SearchEngineID UInt16,
      SearchPhrase String,
      AdvEngineID UInt8,
      PlaceID Int32,
      RefererCategories Array(UInt16),
      URLCategories Array(UInt16),
      URLRegions Array(UInt32),
      RefererRegions Array(UInt32),
      IsYandex UInt8,
      GoalReachesDepth Int32,
      GoalReachesURL Int32,
      GoalReachesAny Int32,
      SocialSourceNetworkID UInt8,
      SocialSourcePage String,
      MobilePhoneModel String,
      ClientEventTime DateTime,
      RegionID UInt32,
      ClientIP UInt32,
      ClientIP6 FixedString(16),
      RemoteIP UInt32,
      RemoteIP6 FixedString(16),
      IPNetworkID UInt32,
      SilverlightVersion3 UInt32,
      CodeVersion UInt32,
      ResolutionWidth UInt16,
      ResolutionHeight UInt16,
      UserAgentMajor UInt16,
      UserAgentMinor UInt16,
      WindowClientWidth UInt16,
      WindowClientHeight UInt16,
      SilverlightVersion2 UInt8,
      SilverlightVersion4 UInt16,
      FlashVersion3 UInt16,
      FlashVersion4 UInt16,
      ClientTimeZone Int16,
      OS UInt8,
      UserAgent UInt8,
      ResolutionDepth UInt8,
      FlashMajor UInt8,
      FlashMinor UInt8,
      NetMajor UInt8,
      NetMinor UInt8,
      MobilePhone UInt8,
      SilverlightVersion1 UInt8,
      Age UInt8,
      Sex UInt8,
      Income UInt8,
      JavaEnable UInt8,
      CookieEnable UInt8,
      JavascriptEnable UInt8,
      IsMobile UInt8,
      BrowserLanguage UInt16,
      BrowserCountry UInt16,
      Interests UInt16,
      Robotness UInt8,
      GeneralInterests Array(UInt16),
      Params Array(String),
      Goals Nested(
        ID UInt32,
        Serial UInt32,
        EventTime DateTime,
        Price Int64,
        OrderID String,
        CurrencyID UInt32
      ),
      WatchIDs Array(UInt64),
      ParamSumPrice Int64,
      ParamCurrency FixedString(3),
      ParamCurrencyID UInt16,
      ClickLogID UInt64,
      ClickEventID Int32,
      ClickGoodEvent Int32,
      ClickEventTime DateTime,
      ClickPriorityID Int32,
      ClickPhraseID Int32,
      ClickPageID Int32,
      ClickPlaceID Int32,
      ClickTypeID Int32,
      ClickResourceID Int32,
      ClickCost UInt32,
      ClickClientIP UInt32,
      ClickDomainID UInt32,
      ClickURL String,
      ClickAttempt UInt8,
      ClickOrderID UInt32,
      ClickBannerID UInt32,
      ClickMarketCategoryID UInt32,
      ClickMarketPP UInt32,
      ClickMarketCategoryName String,
      ClickMarketPPName String,
      ClickAWAPSCampaignName String,
      ClickPageName String,
      ClickTargetType UInt16,
      ClickTargetPhraseID UInt64,
      ClickContextType UInt8,
      ClickSelectType Int8,
      ClickOptions String,
      ClickGroupBannerID Int32,
      OpenstatServiceName String,
      OpenstatCampaignID String,
      OpenstatAdID String,
      OpenstatSourceID String,
      UTMSource String,
      UTMMedium String,
      UTMCampaign String,
      UTMContent String,
      UTMTerm String,
      FromTag String,
      HasGCLID UInt8,
      FirstVisit DateTime,
      PredLastVisit Date,
      LastVisit Date,
      TotalVisits UInt32,
      TraficSource Nested(
        ID Int8,
        SearchEngineID UInt16,
        AdvEngineID UInt8,
        PlaceID UInt16,
        SocialSourceNetworkID UInt8,
        Domain String,
        SearchPhrase String,
        SocialSourcePage String
      ),
      Attendance FixedString(16),
      CLID UInt32,
      YCLID UInt64,
      NormalizedRefererHash UInt64,
      SearchPhraseHash UInt64,
      RefererDomainHash UInt64,
      NormalizedStartURLHash UInt64,
      StartURLDomainHash UInt64,
      NormalizedEndURLHash UInt64,
      TopLevelDomain UInt64,
      URLScheme UInt64,
      OpenstatServiceNameHash UInt64,
      OpenstatCampaignIDHash UInt64,
      OpenstatAdIDHash UInt64,
      OpenstatSourceIDHash UInt64,
      UTMSourceHash UInt64,
      UTMMediumHash UInt64,
      UTMCampaignHash UInt64,
      UTMContentHash UInt64,
      UTMTermHash UInt64,
      FromHash UInt64,
      WebVisorEnabled UInt8,
      WebVisorActivity UInt32,
      ParsedParams Nested(
        Key1 String,
        Key2 String,
        Key3 String,
        Key4 String,
        Key5 String,
        ValueDouble Float64
      ),
      Market Nested(
        Type UInt8,
        GoalID UInt32,
        OrderID String,
        OrderPrice Int64,
        PP UInt32,
        DirectPlaceID UInt32,
        DirectOrderID UInt32,
        DirectBannerID UInt32,
        GoodID String,
        GoodName String,
        GoodQuantity Int32,
        GoodPrice Int64
      ),
      IslandID FixedString(16)
    )
    ENGINE = CollapsingMergeTree(Sign)
    PARTITION BY toYYYYMM(StartDate)
    ORDER BY
      (CounterID, StartDate, intHash32(UserID), VisitID)
    ```
    </details>
    <!-- vale on -->

1. Load data into tables `hits_v1` and `visits_v1`.

    1.  Go to the folder where you stored the downloaded files for
        `hits_v1.tsv` and `visits_v1.tsv`.

    1.  Run the following commands:

        ```bash
        cat hits_v1.tsv | docker run        \
        --interactive                       \
        --rm clickhouse/clickhouse-server clickhouse-client  \
        --user USERNAME                     \
        --password PASSWORD                 \
        --host HOST                         \
        --port PORT                         \
        --secure                            \
        --max_insert_block_size=100000      \
        --query="INSERT INTO default.hits_v1 FORMAT TSV"
        ```

        ```bash
        cat visits_v1.tsv | docker run      \
        --interactive                       \
        --rm clickhouse/clickhouse-server clickhouse-client   \
        --user USERNAME                     \
        --password PASSWORD                 \
        --host HOST                         \
        --port PORT                         \
        --secure                            \
        --max_insert_block_size=100000      \
        --query="INSERT INTO default.visits_v1 FORMAT TSV"
        ```

## Query data

Once the data is loaded, you can run queries against the sample data you imported.

- Query the number of items in the `hits_v1` table:

  ```sql
  SELECT COUNT(*) FROM default.hits_v1
  ```

- Find the longest lasting sessions:

  ```sql
  SELECT StartURL AS URL,
      MAX(Duration) AS MaxDuration
  FROM default.visits_v1
  GROUP BY URL
  ORDER BY MaxDuration DESC
  LIMIT 10
  ```

## Next steps

- [Service architecture](/docs/products/clickhouse/concepts/service-architecture)
- [Secure an Aiven for ClickHouse® service](/docs/products/clickhouse/howto/secure-service)
- [Manage Aiven for ClickHouse® users and roles](/docs/products/clickhouse/howto/manage-users-roles)
- [Manage Aiven for ClickHouse® database and tables](/docs/products/clickhouse/howto/manage-databases-tables)
- [Integrate an Aiven for ClickHouse® service](/docs/products/clickhouse/howto/list-integrations)
