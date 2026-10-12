---
title: API keys
early: true
---

import RequirementsPanel from "@site/src/components/RequirementsPanel";
import ConsoleLabel from "@site/src/components/ConsoleIcons"



<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['`project:ai_gateway_keys:write`'],
    },
  ]}
/>

## Create a key

1. In your project click **AI Gateway**.
1. Click **API keys**.
1. Click **Create key**.
1. Enter a name.
1. Optional: Set an expiration date and time.
1. Click **Create key**.
1. Copy the key and save it somewhere safe.
   You cannot view the token after you close this window.

## Revoke a key

1. In your project click AI Gateway.
1. Click **API keys**.
1. For the key to revoke, click <ConsoleLabel name="actions"/> > <ConsoleLabel name="revokekey"/>.
1. Click **Revoke**.

## Rename a key

1. In your project click AI Gateway.
1. Click **API keys**.
1. For the key to rename, click <ConsoleLabel name="actions"/> > <ConsoleLabel name="editkey"/>.
1. Click **Save changes**.
