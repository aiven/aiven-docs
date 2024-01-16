---
title: avn cloud
---

Here you\'ll find the full list of commands for `avn cloud`.

## List cloud region details

Commands for listing cloud regions to be used when creating or moving
instances with `avn` commands.

### `avn cloud list`

Lists cloud regions with related geographical region, latitude and
longitude.

<table>
  <thead>
    <tr><th>Parameter</th><th>Information</th></tr>
  </thead>
  <tbody>
    <tr>
      <td>`--project`</td>
      <td>The project to fetch details for</td>
    </tr>
  </tbody>
</table>


**Example:** Show the clouds available to the currently selected
project.

``` 
avn cloud list
```

**Example:** Show the clouds available to a named project.

``` 
avn cloud list --project my-project
```

A reference of the cloud regions is available in the
[dedicated document](/docs/platform/reference/list_of_clouds).
