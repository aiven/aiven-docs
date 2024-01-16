---
title: avn billing-group
---

This article has the full list of commands for managing billing groups
assigned to organizations using `avn billing-group`. An account is the
same as an
[organization](/docs/platform/concepts/projects_accounts_access).

## `avn billing-group assign-projects`

Adds projects to a billing group.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`id`</td>
      <td>The ID of your billing group</td>
    </tr>
    <tr>
      <td>`projects`</td>
      <td>Names of the projects to assign, separated by spaces</td>
    </tr>
  </tbody>
</table>


**Example:** Add the project `new-project` to the existing billing group
with id `55b0e547-58f9-48de-8808-807d385d1f95`

``` shell
avn biling-group assign-projects 55b0e547-58f9-48de-8808-807d385d1f95 new-project
```

## `avn billing-group create` and `avn billing-group update`

Creates a new billing group with `create` or amends a billing group with
`update`.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`name` (required for `create`)</td>
      <td>Note: This is a positional argument, not a switch</td>
    </tr>
    <tr>
      <td>`ID` (required for `update`)</td>
      <td>Note: This is a positional argument, not a switch</td>
    </tr>
    <tr>
      <td>`--account-id`</td>
      <td>The ID of the organization or unit to create the billing group in</td>
    </tr>
    <tr>
      <td>`--card-id`</td>
      <td>The card ID (see `avn card`)</td>
    </tr>
    <tr>
      <td>`--vat-id`</td>
      <td>VAT ID for this billing group</td>
    </tr>
    <tr>
      <td>`--billing-currency`</td>
      <td>The currency to bill in: `AUD`, `CAD`, `CHF`, `DKK`, `EUR`, `GBP`, `JPY`, `NOK`, `NZD`, `SEK`, `SGD`, or `USD`</td>
    </tr>
    <tr>
      <td>`--billing-extra-text`</td>
      <td>Information to include in an invoice (for example, a cost center number)</td>
    </tr>
    <tr>
      <td>`--billing-email`</td>
      <td>Email for the billing contact</td>
    </tr>
    <tr>
      <td>`--company`</td>
      <td>Company name</td>
    </tr>
    <tr>
      <td>`--address-line`</td>
      <td>First line of address</td>
    </tr>
    <tr>
      <td>`--country-code`</td>
      <td>[Code](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2#Officially_assigned_code_elements) for the billing country</td>
    </tr>
    <tr>
      <td>`--city`</td>
      <td>City</td>
    </tr>
    <tr>
      <td>`--state`</td>
      <td>State / Province</td>
    </tr>
    <tr>
      <td>`--zip-code`</td>
      <td>ZIP / Post Code</td>
    </tr>
  </tbody>
</table>


**Example:** Create a billing group named `qa-dept` in the organization
that has the account ID `c59dde4j9` and give it the following
properties:

-   currency: `EUR`
-   e-mail address: `billing@testers.dev`
-   company name: `testers`
-   address: `1 No Way`
-   country code: `SE`
-   city: `Stockholm`

``` shell
avn billing-group create qa-dept        \
  --account-id c59dde4j9                \
  --billing-currency EUR                \
  --billing-email billing@testers.dev   \
  --company testers                     \
  --address-line "1 No Way"             \
  --country-code SE                     \
  --city Stockholm
```

**Example:** Rename your `qa-dept` billing group with ID
`55b0e547-58f9-48de-8808-807d385d1f95` to `qa-department`.

``` shell
avn billing-group update               \
  55b0e547-58f9-48de-8808-807d385d1f95 \
  --name qa-department 
```

## `avn billing-group credits-claim`

Claims a credit code within your biling-group.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`id`</td>
      <td>The billing group ID</td>
    </tr>
    <tr>
      <td>`code`</td>
      <td>Credit Code</td>
    </tr>
  </tbody>
</table>


**Example:** Claim the credit code `sneaky-crab` in the billing group
with ID `55b0e547-58f9-48de-8808-807d385d1f95`:

``` shell
avn billing-group credits-claim 55b0e547-58f9-48de-8808-807d385d1f95 sneaky-crab
```

## `avn billing-group credits-list`

Lists all the credits redeemed in your billing-group

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`id`</td>
      <td>The ID of your billing group</td>
    </tr>
  </tbody>
</table>


**Example:** List credits claimed in the billing group with ID
`55b0e547-58f9-48de-8808-807d385d1f95`

``` shell
avn billing-group credits-list 55b0e547-58f9-48de-8808-807d385d1f95
```

An example of `avn billing-group credits-list` output:

``` text
CODE      REMAINING_VALUE
========  ===============
S18A11Y  0.00
```

## `avn billing-group delete`

Deletes a billing group.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`id`</td>
      <td>The billing group ID</td>
    </tr>
  </tbody>
</table>


**Example:** Delete the billing group with ID
`55b0e547-58f9-48de-8808-807d385d1f95`:

``` shell
avn billing-group delete 55b0e547-58f9-48de-8808-807d385d1f95
```

## `avn billing-group events`

Lists the activity for a given billing group.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`id`</td>
      <td>The billing group ID</td>
    </tr>
  </tbody>
</table>


**Example:** List activity for the billing group with ID
`55b0e547-58f9-48de-8808-807d385d1f95`:

``` shell
avn billing-group events 55b0e547-58f9-48de-8808-807d385d1f95
```

An example of `avn billing-group events` output:

``` text
CREATE_TIME           ACTOR             EVENT_DESC
====================  ================  ===================================================================================================================
2021-10-14T21:09:02Z  Aiven Automation  Set VAT ID state to invalid
2021-10-14T14:31:15Z  me@you.com        "Set billing email address to \"[\"\"me@you.io\"\"]\""
2021-10-14T14:30:46Z  me@you.com        Set VAT ID state to unconfirmed
2021-10-14T13:08:45Z  Aiven Automation  Set VAT ID state to invalid
2021-10-14T08:15:09Z  me@you.com        "Added US$\"400\" credits to the billing group"
2021-10-14T08:15:00Z  me@you.com        Added project inzone-a-project to billing group
2021-10-14T08:15:00Z  me@you.com        Added project inzone-b-project to billing group
2021-10-14T08:15:00Z  me@you.com        Added project inzone-c-project to billing group
2021-10-14T08:15:00Z  me@you.com        Added project kona-a-project to billing group
2021-10-14T08:15:00Z  me@you.com        Added project kona-b-project to billing group
2021-10-14T08:15:00Z  me@you.com        Added project kona-c-project to billing group
2021-10-14T08:15:00Z  me@you.com        "Added user u2865a92fe3d (\"me@you.com\") to billing group \"u856238c-8213-6592-975e-cfc3662c1084\" with type"
2021-10-14T08:15:00Z  me@you.com        "Created billing group \"test-group\""
```

## `avn billing-group get`

Gets the details for a given billing group.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`id`</td>
      <td>The billing group ID</td>
    </tr>
  </tbody>
</table>


**Example:** Get details for the billing group with ID
`55b0e547-58f9-48de-8808-807d385d1f95`:

``` shell
avn billing-group get 55b0e547-58f9-48de-8808-807d385d1f95
```

An example of `avn billing-group get` output:

``` text
BILLING_GROUP_ID                      BILLING_GROUP_NAME  ACCOUNT_NAME
====================================  ==================  ============
u856238c-8213-6592-975e-cfc3662c1084  test-group        null
```

## `avn billing-group invoice-lines`

Retrieve the lines for a given invoice

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`id`</td>
      <td>The ID of your billing group</td>
    </tr>
    <tr>
      <td>`invoice`\`</td>
      <td>The number of the invoice</td>
    </tr>
  </tbody>
</table>


**Example:** Retrieve lines from the invoice `94885-2` for the billing
group with ID `55b0e547-58f9-48de-8808-807d385d1f95`:

``` shell
avn billing-group invoice-lines 55b0e547-58f9-48de-8808-807d385d1f95 94885-2
```

## `avn billing-group invoice-list`

Lists all invoices for a billing group:

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`id`</td>
      <td>The ID of your billing group</td>
    </tr>
  </tbody>
</table>


**Example:** List all invoices for the billing group with ID
`55b0e547-58f9-48de-8808-807d385d1f95`:

``` shell
avn billing-group invoice-list 55b0e547-58f9-48de-8808-807d385d1f95
```

An example of `avn billing-group invoice-list` output:

``` text
INVOICE_NUMBER  PERIOD_BEGIN          PERIOD_END            STATE     TOTAL_INC_VAT  TOTAL_VAT_ZERO
==============  ====================  ====================  ========  =============  ==============
xxxxx-88        2022-09-01T00:00:00Z  2022-09-30T23:59:59Z  estimate  0.00           0.00
```

## `avn billing-group list`

Lists all of your billing-groups.

**Example:** List all billing-groups:

``` shell
avn billing-group list
```

An example of `avn billing-group list` output:

``` text
BILLING_GROUP_ID                      BILLING_GROUP_NAME                               ACCOUNT_NAME
====================================  ===============================================  ======================
2a4981e1-f988-4cb8-b1a8-xxxxxxxxxxxx  Default billing group for abcdddddd              Account 123
3c575695-4384-4b34-b58c-yyyyyyyyyyyy  Default billing group for project test-demo      Account 223
51ad078a-4eef-468d-964b-zzzzzzzzzzzz  Default billing group for xxxxxxxxxxx            Account 123
```
