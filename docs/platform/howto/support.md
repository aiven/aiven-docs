---
title: Support
---

All customers using paid service plans have access to the Basic support tier. Aiven also offers [paid support tiers](https://aiven.io/support-services) with faster response times, phone support, and other services.

Custom [service level agreements](https://aiven.io/sla) are available for the Premium
support tier.

## Upgrade your support tier {#upgrade-support-tier}

If you have questions or want to downgrade your support tier, contact
your account team.

To upgrade your organization's support tier in the
[Aiven Console](https://console.aiven.io/):

1.  In the organization, click **Support**.

1.  In the **Current support tier** section, click **Upgrade to Premium**.

1.  Click **Choose tier**.

1.  Select a **Start date**.

    :::note
    If you select the current month, you will be charged a percentage of
    the total service spend for the whole month, starting from the first of the month.
    :::

1.  Select a **Billing group**.

    :::important
    The support costs for all current and future services in the
    selected organization and its organizational units will be
    added to the invoice for this billing group.
    :::

1.  Click **Upgrade tier**.

It typically takes 1-2 business days to set up the new support tier. You
can view the status of your request on the support page under **Current support tier**.

## Create a support ticket

Create a ticket for issues or problems with the platform. For other services included
in your support tier like business reviews or disaster recovery planning, contact
the [sales team](mailto:sales@aiven.io).

1.  In the [Aiven Console](https://console.aiven.io/), click **Support**.

1.  Click **Go to Aiven Support Center**.

1.  Click **Create ticket**.

1.  Enter email addresses to CC in the support ticket. They receive all new comments
    and updates.

1.  Enter a **Subject**.

1.  Select a **Severity** level.

1.  Optional: Enter the ID of the affected projects and services.

1.  Select the affected **Product** and the reason for creating the ticket.

1.  Enter a detailed **Description** of the issue.

    :::note
    Include the following information in the description to help the
    support team provide timely assistance:

    -   The affected features. For example, networking, metrics, or deployment.
    -   The steps to reproduce the problem.
    -   Any error messages.
    -   Any languages or frameworks you are using.
    :::

1.  Optional: Upload files such as screenshots, logs, or [HAR files](#create-har-files).

    :::important
    Aiven support will never ask you to provide sensitive data such as
    passwords or personal information. Remove or replace sensitive data
    in files that you attach to support tickets.
    :::

1.  Click **Create ticket**.

You can track the status of your tickets on the **My tickets** page.

[Response times](https://aiven.io/support-services) vary by case
severity and support tier. If you are not satisfied with the processing
of your ticket, add `#escalate` in the comments.

## Add participants to a support ticket

To give every organization user access to all support
tickets in your organization contact your account team.

To add Aiven users to a support ticket:

1.  On the **My tickets** page, open the ticket.
1.  Click **Add to conversation**.
1.  Add the email addresses in the **CC** field separated by a space.
    These must be the same email addresses they use to log in.
1.  Enter a comment and click **Submit**.

## Get notifications for all support tickets

[Super admin](/docs/platform/howto/make-super-admin) can get notifications for
updates on all tickets in their organization.

1.  Click **My tickets**.
1.  On the **Tickets in my organization** tab, click **Follow all tickets**.

You will get email notifications for all updates on both existing and
new tickets. You can unfollow them at any time.

## Create HAR files

The support team occasionally needs information about the network requests that
are generated in your browser. Browsers can capture a log of these network requests
in a HAR (HTTP Archive) file.

If the support team asks for a HAR file:

1.  Use your browser to create the HAR file while you go through the
    steps to reproduce the problem:
    -   Follow the
        [instructions for Internet Explorer/Edge, Firefox, and Chrome](https://toolbox.googleapps.com/apps/har_analyzer/).
    -   For Safari, make sure you can access the
        [developer tools](https://support.apple.com/en-ie/guide/safari/sfri20948/mac)
        and [export the HAR file](https://webkit.org/web-inspector/network-tab/).
1.  Replace sensitive data in the file with placeholders while retaining
    the JSON structure and format. Examples of sensitive data include:
    -   Personal identifiers such as email addresses and phone numbers
    -   Authentication tokens or passwords
    -   Sensitive URLs
    -   Sensitive cookies or headers
1.  Send the sanitized file to the support team in your reply to their
    email or in the ticket's comments.
