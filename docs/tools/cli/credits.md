---
title: avn credits
---

Here you\'ll find the full list of commands for `avn credits`.

## Aiven credits

All commands for managing Aiven credits.

### `avn credits claim`

Add an Aiven credit code to a project.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`code`</td>
      <td>Credit code to claim</td>
    </tr>
    <tr>
      <td>`--project`</td>
      <td>The project to claim the credits for</td>
    </tr>
  </tbody>
</table>


**Example:** Add a credit code to the currently selected project.

``` 
avn credits claim "credit-code-123"
```

**Example:** Add a credit code to a named project.

``` 
avn credits claim "credit-code-123"  --project my-project
```

### `avn credits list`

List the credit codes associated with a project.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`--project`</td>
      <td>The project to list the credits for</td>
    </tr>
  </tbody>
</table>


**Example:** List all credit codes associated with the currently
selected project.

``` 
avn credits list
```

**Example:** List all credit codes associated with a named project.

``` 
avn credits list --project my-project
```
