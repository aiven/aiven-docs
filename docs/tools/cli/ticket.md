---
title: avn ticket
---

Here you\'ll find the full list of commands for `avn ticket`.

## Create and manage support tickets

Commands for managing Aiven support tickets.

:::warning
To be able to create support tickets your project should be covered by a
support contract.
:::

### `avn ticket create`

Creates a new ticket.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`--project`</td>
      <td>The project for which to create a ticket</td>
    </tr>
    <tr>
      <td>`--service`</td>
      <td>The service name for which to create a ticket</td>
    </tr>
    <tr>
      <td>`--severity`</td>
      <td>The ticket severity; possible values are `low`,`high`,`critical`, more information about severity and support levels are available in [the dedicated page](https://aiven.io/support-services).</td>
    </tr>
    <tr>
      <td>`--title`</td>
      <td>Short description of the issue</td>
    </tr>
    <tr>
      <td>`--description`</td>
      <td>Detailed description of the issue</td>
    </tr>
  </tbody>
</table>


**Example:** Create a new ticket with severity `low` for the service
`pg-demo` in the project `proj-test`.

``` 
avn ticket create --service pg-demo               \
    --project proj-test                           \
    --severity low                                \
    --title "Error during enabling XYZ extension" \
    --description "When enabling XYZ extension I get the error ERROR123: ZZZ"
```

### `avn ticket list`

Retrieves the list of support tickets together with the associated
details like ticket ID, status, create and update time.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`--project`</td>
      <td>The project for which to create a ticket</td>
    </tr>
    <tr>
      <td>`--state`</td>
      <td>The ticket state; possible values are `closed` or `open`</td>
    </tr>
  </tbody>
</table>


**Example:** Retrieve all the tickets in `open` state for the
`proj-test` project

``` 
avn ticket list         \
    --project proj-test \
    --state open
```

An example of `avn ticket list` output:

``` text
TICKET_ID  SEVERITY  STATE  TITLE                                 PROJECT_NAME   SERVICE_NAME           CREATE_TIME           DESCRIPTION                                         UPDATE_TIME           USER_EMAIL         USER_REAL_NAME
=========  ========  =====  ====================================  =============  ============  ====================  ============================================================ ====================  =================  ==============
T-4EXXX    high      open   Error during enabling XYZ extension   proj-test      pg-demo       2021-11-01T07:59:52Z  "When enabling XYZ extension I get the error ERROR123: ZZZ"  2021-11-03T22:30:28Z  joe@example.com    Joe Doe
T-4EXX1    critical  open   Error during service create           proj-test      kafka-tst     2021-11-04T18:14:16Z  "Create service shows ERROR 123"                             2021-11-05T22:10:30Z  maria@example.com  Maria Test
T-4EXX2    low       open   Billing problem                       proj-test      redis-prod    2021-11-05T10:29:26Z  "Bills are sent twice"                                       2021-11-05T22:10:24Z  carl@example.com   Carl White
```
