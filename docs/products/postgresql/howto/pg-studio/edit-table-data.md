---
title: Edit Aiven for PostgreSQL® table data in PG Studio
sidebar_label: Edit table data
description: Update values in your tables directly in the data grid, without writing SQL.
keywords: ["edit rows", "update table data", "data grid", "table editor", "Tables", "PG Studio"]
---

import ConsoleIcon from "@site/src/components/ConsoleIcons";
import RelatedPages from "@site/src/components/RelatedPages";
import RequirementsPanel from '@site/src/components/RequirementsPanel';

Fix and update values in your Aiven for PostgreSQL® tables directly in the data grid of <ConsoleIcon name="pgtables"/>, without writing SQL.

<RequirementsPanel
  items={[
    {
      label: 'Permissions',
      values: [
        <>
          <code>service:data:write</code> and <code>service:secrets:read</code>
        </>,
      ],
    },
  ]}
/>

## What you can edit

You can edit tables that have a primary key. In these tables, you can edit columns with
the following data types:

- **Text:** `text`, `varchar`, and `char`
- **Numeric:** `smallint`, `integer`, `bigint`, `real`, `double precision`, and `numeric`

Primary key columns are read-only.

## Edit values

1. In <ConsoleIcon name="pgtables"/>, open the table.
1. Double-click a cell and enter the new value. To set a nullable cell to `NULL`, click
   **Set to NULL** in the cell.
1. Click <ConsoleIcon name="save changes"/>, or press `Cmd+S` on macOS or `Ctrl+S` on
   Windows and Linux.

To discard all unsaved changes instead, click <ConsoleIcon name="discard changes"/>.

## How changes are saved

- **Written directly:** PG Studio writes saved changes directly to your database. To
  revert a change, edit the value again.
- **All or nothing:** PG Studio saves all your changes together. If one change fails, for
  example because a value violates a constraint or the row was deleted, no changes are
  saved. Fix the value and save again.
- **Current page only:** Unsaved changes apply to the page you are viewing. If you sort the
  rows, change the page, or leave the table, PG Studio asks whether to keep editing or
  discard your changes.

<RelatedPages/>

- [Get started with PG Studio](/docs/products/postgresql/howto/pg-studio/get-started)
- [Write and run queries in PG Studio](/docs/products/postgresql/howto/pg-studio/write-run-queries)
- [PG Studio overview](/docs/products/postgresql/howto/pg-studio/)
