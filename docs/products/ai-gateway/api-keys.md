---
title: Manage AI gateway API keys
sidebar_label: Manage API keys
early: true
---

import RequirementsPanel from "@site/src/components/RequirementsPanel";
import ConsoleLabel from "@site/src/components/ConsoleIcons"

Create and manage API keys to access AI gateway models.

Key usage is associated with the key owner. By default, the owner is the key creator.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`project:ai_gateway_keys:write`'],
    },
  ]}
/>

## Create a key

1. In your project click **AI gateway**.
1. Click **API keys**.
1. Click **Create key**.
1. Enter a name.
1. Optional: Set an expiration date and time.
1. Optional: If you are an organization or project admin, you can assign a user
    or application user as the key **Owner**.
1. Click **Create key**.
1. Copy the key and save it somewhere safe.
   You cannot view the token after you close this window.

## Revoke a key

1. In your project click AI gateway.
1. Click **API keys**.
1. For the key to revoke, click <ConsoleLabel name="actions"/> > <ConsoleLabel name="revokekey"/>.
1. Click **Revoke**.

## Rename a key

1. In your project click AI gateway.
1. Click **API keys**.
1. For the key to rename, click <ConsoleLabel name="actions"/> > <ConsoleLabel name="editkey"/>.
1. Click **Save changes**.
