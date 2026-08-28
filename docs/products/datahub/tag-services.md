---
title: Tag Aiven for DataHub services
sidebar_label: Tag services
limited: true
---

import ConsoleLabel from "@site/src/components/ConsoleIcons";
import RequirementsPanel from "@site/src/components/RequirementsPanel";

Use tags to add metadata to Aiven services to categorize them or run custom logic on them.

A tag is a key/value pair:

- **Key**: A case-sensitive string that starts with a letter and consists
  of letters, numbers, dashes, and underscores.
  The maximum length for a key is 64 characters.
- **Value**: A string limited to 64 UTF-8 characters.

Within a service, the tag keys must be unique.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: ['Manage services', 'Manage service configuration', 'Operator', 'Project admin'],
    },
  ]}
/>

## Tag a DataHub service

1. In the service, click <ConsoleLabel name="service settings"/>.
1. In the **Service status** section, click
   <ConsoleLabel name="actions"/> > **Add service tags**.
1. Enter a key and value for each tag.
1. Click **Save changes**.
