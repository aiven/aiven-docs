---
title: Manage domains
---

import ConsoleLabel from "@site/src/components/non-swizzled/ConsoleIcons"

Adding a verified domain in Aiven adds an extra layer of security to managing your organization's users. When you verify a domain, your organization users automatically become
[managed users](/docs/platform/concepts/managed-users).


There are two ways you can verify a domain:

-   by adding a DNS TXT record to the domain (recommended)
-   by uploading an HTML file to your website

## Add a domain using a DNS TXT record

1. In the organization, click **Admin**.

1. Click **Domains**.

1. Click **Add domain**.

1. Enter a **Domain name**.

1. In the **Verification method**, select **Add a DNS TXT record to
   your domain host**.

1. Click **Add domain**.

1. In the **Verification method** column, click **DNS TXT record**.

1. Copy the TXT record value.

1. In another browser tab or window, log in to your domain hosting
   provider.

1. Go to the DNS settings.

1. In the DNS settings for your domain provider, create a TXT record
   with the following:

   | Field name   | Value                                                                              |
   | ------------ | ---------------------------------------------------------------------------------- |
   | Name         | `_aiven-challenge.{your domain}`                                                   |
   | Record value | The TXT record value you copied in the format `token=<random_string>,expiry=never` |
   | Type         | `TXT`                                                                              |

1. In the Aiven Console, click <ConsoleLabel name="actions"/> > **Verify**.

It can take up to 72 hours for your DNS records to update the domain to
be verified. If the domain is still not verified after that time, you
can retry it by repeating the last step.

## Add a domain using an HTML file

1. In the organization, click **Admin**.
1. Click **Domains**.
1. Click **Add domain**.
1. Enter a **Domain name**.
1. In the **Verification method**, select **Upload an HTML file to your website**.
1. Click **Add domain**.
1. In the **Verification method** column, click **HTML file upload**.
1. Download the HTML file.
1. Upload the HTML file to your website in the path
    `/.well-known/aiven`.
1. In the Aiven Console, open the <ConsoleLabel name="actions"/> > **Verify**.

## Remove a domain

:::important
Removing a domain is an irreversible action.
:::

1. In the organization, click **Admin**.
1. Click **Domains**.
1. Find the domain and click <ConsoleLabel name="actions"/> > **Remove**.
