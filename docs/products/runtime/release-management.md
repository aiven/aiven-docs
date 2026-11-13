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
deployments. You control what is deployed in one of the following ways:

- **Deploy a specific commit**: Pin a commit to the application and deploy it.
  The pinned commit stays deployed until you change the branch or deploy the latest commit.
- **Deploy the latest commit**: Rebuild the application from the latest commit
  on the configured branch.

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
          "repository_url": "REPOSITORY_URL",
          "branch": "BRANCH_NAME",
          "commit_sha": "COMMIT_SHA"
        }
      }
    }
  }'
```

Where:

- `PROJECT_NAME` is the name of your Aiven project.
- `APPLICATION_NAME` is the name of the Runtime application.
- `REPOSITORY_URL` is the URL of the connected repository.
- `BRANCH_NAME` is the branch that contains the commit.
- `COMMIT_SHA` is the full 40-character lowercase hexadecimal commit SHA.

</TabItem>
</Tabs>

Aiven Runtime pins the commit and redeploys the application.

## Deploy the latest commit

Deploying the latest commit rebuilds the application from the latest commit on
the configured branch and clears the pinned commit.

<Tabs groupId="group1">
<TabItem value="console" label="Console" default>

1. In your project, click <ConsoleLabel name="runtime"/>.
1. Open your application.
1. Click **Redeploy application**.

</TabItem>
<TabItem value="api" label="API">

To redeploy the application, call the application redeploy endpoint:

```bash
curl -sS -X POST \
  "https://api.aiven.io/v1/project/PROJECT_NAME/service/APPLICATION_NAME/application/redeploy" \
  -H "Authorization: Bearer $AIVEN_TOKEN"
```

Where:

- `PROJECT_NAME` is the name of your Aiven project.
- `APPLICATION_NAME` is the name of the Runtime application.

The endpoint returns `204 No Content` on success.

</TabItem>
</Tabs>
