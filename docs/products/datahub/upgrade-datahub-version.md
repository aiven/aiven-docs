---
title: Upgrade Aiven for DataHub
sidebar_label: Upgrade DataHub
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";
import RelatedPages from "@site/src/components/RelatedPages";

Upgrade your Aiven for DataHub service to a new version.

Aiven for DataHub services are not automatically upgraded to the latest major version
and minor patches are not automatically applied. You can, however,
manually upgrade your service to a newer major version.

You may need to change your DataHub configuration when upgrading to
the following versions:

- **Version 1.9**: If you enabled AI descriptions or classifications on version 1.8,
  [change the extra pip libraries values](#update-ai-description-and-classification-configuration).

## Upgrade a DataHub service

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`project:services:write`', '`role:project:admin`'],
    },
  ]}
/>

1. In your DataHub service, go to the **Maintenance** section.
1. Click <ConsoleLabel name="actions"/> > **Upgrade version**.
1. Select a version to upgrade to, and click **Upgrade**.

## Update AI description and classification configuration

If you use the [AI-generated descriptions or classifications](/docs/products/datahub/enable-ai-description-and-classification)
in version 1.8, you need to update the configuration after upgrading to Version 1.9.

DataHub version 1.9 does not accept  `-r /opt/aiven/ingestion-libraries/...`
as extra pip libraries values. To update the values:

1. In the DataHub UI, click **Data Sources**.
1. On the **Sources** tab, find the source and click **Edit**.
1. Click **Next**.
1. On the last step, click **Advanced**.
1. In **Extra Pip Libraries**, change the values to the following:
   - For AI descriptions: `["${AIVEN_DATAHUB_DESCRIBER}"]`
   - For AI classifications: `["${AIVEN_DATAHUB_CLASSIFIER}"]`
   - For both descriptions and classifications:
     `["${AIVEN_DATAHUB_DESCRIBER}", "${AIVEN_DATAHUB_CLASSIFIER}"]`
1. Click **Save & Run**.
