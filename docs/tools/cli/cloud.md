---
title: avn cloud
---

The `avn cloud` command allows you to list the clouds available in a given project.

## List cloud region details

Commands for listing cloud regions to be used when creating or moving
instances with `avn` commands.

### `avn cloud list`

Lists cloud regions with related geographical region, latitude and
longitude.

| Parameter   | Information                      |
| ----------- | -------------------------------- |
| `--project` | The project to fetch details for |

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
