---
title: Use resource tags
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Use tags to add metadata to Aiven resources to categorize them or run custom logic on them. Tags can be attached to projects and services.

Typical uses include:

- Tagging for governance to deploy services with specific tags only.
- Tagging for internal cost reporting, ownership, allocation, accountability, etc.

A tag is a key/value pair, where:

- **key**: A case-sensitive string that much match
  `[A-Za-z0-9_-]` and start with a letter. The maximum
  length for a key is 64 characters.
- **value**: A string value limited to 64 UTF-8 characters.

:::note
An Aiven resource can have up to 10 tags. Within a resource, the tag keys must be unique.
:::

## Add tags to resources in Aiven Console

### Add tags to projects

You can add the following types of tags to projects:

|       Tag type        |                                Description                                |
|-----------------------|---------------------------------------------------------------------------|
| Billing reference tag | Returned in the Invoice API and displayed on PDF invoices for the project |
| Project tag           | Returned for resources in the API and displayed in the list of projects   |

To add tags to a project:

1. Log in to [Aiven Console](https://console.aiven.io/) and select your
   organization and your project from the top navigation bar.
1. On the project's page, select **Settings** from the sidebar.
1. On the **Settings** page, click **Add tag** and enter a key and its
   value in the **Billing Reference Tags** or **Project Tags** fields,
   and select the **+** icon to add more tags in the same manner.
1. Select **Save changes** to save your tags.

You can see the tags listed in the table on the **Projects** page.

### Add tags to services

1. Log in to the [Aiven Console](https://console.aiven.io/) and select
   your organization and your project from the top navigation bar.
1. On the **Services** page of your project, select the service to tag.
1. On the service page, select <ConsoleLabel name="service settings"/> from the sidebar.
1. In the **Service status** section, click
   <ConsoleLabel name="actions"/> > **Add service tags**.
1. In the **Tag this service** dialog, enter a key and its value in the
   **Service Tags** fields.
1. Click **Add tag** to add additional tags.
1. Click **Save changes** to apply the tags.

You can see the tags listed in the table on the **Projects** page.

## Add and modify resource tags with the Aiven client

### Add and modify service tags

-   Add new tags to a service:

    ```bash
    avn service tags update your-service --add-tag business_unit=sales --add-tag env=smoke_test
    ```

-   Modify or remove tags:

    ```bash
    avn service tags update your-service --add-tag env=production --remove-tag business_unit
    ```

-   List service tags:

    ```bash
    avn service tags list your-service
    KEY  VALUE
    ===  ==========
    env  production
    ```

-   Replace tags with a set of new ones, removing the old ones:

    ```bash
    avn service tags replace your-service --tag cost_center=U1345

    avn service tags list your-service
    KEY          VALUE
    ===========  =====
    cost_center  U1345
    ```

### Add and modify project tags

The commands `update`, `list` and `replace` exist for tagging projects
too, and work the same way:

-   Add tags to a project:

    ```bash
    avn project tags update --project your-project --add-tag business_unit=sales
    ```

-   Replace project tags:

    ```bash
    avn project tags replace --project your-project --tag env=smoke_test
    ```

-   List project tags:

    ```bash
    avn project tags list

    KEY  VALUE
    ===  ==========
    env  smoke_test
    ```

## Reading tags

After you've added tags, you can read them from:

- The [Aiven Console](https://console.aiven.io/).
- Aiven-client version 1.11.0 or later.
- APIs, such as the [ProjectUpdate endpoint](https://api.aiven.io/doc/#tag/Project/operation/ProjectUpdate).

## Related pages

- [Create a service](/docs/platform/howto/create_new_service)
