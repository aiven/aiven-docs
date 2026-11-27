---
title: Manage releases for Aiven Runtime applications
sidebar_label: Manage releases
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Deploy an Aiven Runtime application from the latest commit or a specific commit.

Pushing changes to your repository doesn't trigger
deployments. You choose a commit to deploy and pin.
The pinned commit stays deployed until you change the branch or deploy another commit.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`project:services:write`', '`role:project:admin`', '`role:project:manager`'],
    }
  ]}
/>

## View deployed commits

To view a timeline of recent commits on the configured branch:

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. On the **Overview** page, go to the **Release management** section.

To view the full commit history on GitHub, click **View full history**.

## Deploy a specific commit

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. In the **Release management** section, click **Deploy commit**.
1. Select a commit and click **Deploy commit**.

</TabItem>
<TabItem value="cli" label="CLI">

To pin a specific commit, run:

```bash
avn service update APPLICATION_NAME -c application.source.commit_sha=COMMIT_SHA
```

Where:

- `APPLICATION_NAME` is the name of the Runtime application.
- `COMMIT_SHA` is the full 40-character lowercase hexadecimal commit SHA.

</TabItem>
<TabItem value="api" label="API">

To pin a commit, set `application.source.commit_sha` with the
[ServiceUpdate](https://api.aiven.io/doc/#tag/Service/operation/ServiceUpdate) endpoint:

```bash
curl -sS -X PUT \
  "https://api.aiven.io/v1/project/PROJECT_NAME/service/APPLICATION_NAME" \
  -H "Authorization: Bearer $AIVEN_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "user_config": {
      "application": {
        "source": {
          "commit_sha": "COMMIT_SHA"
        }
      }
    }
  }'
```

Where:

- `PROJECT_NAME` is the name of your Aiven project.
- `APPLICATION_NAME` is the name of the Runtime application.
- `COMMIT_SHA` is the full 40-character lowercase hexadecimal commit SHA.

</TabItem>
</Tabs>

Aiven Runtime pins the commit and redeploys the application.
