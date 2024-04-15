---
title: About M3DB namespaces and aggregation
---

M3DB has a concept of namespaces, which can be compared to tables in a
traditional database setup.

-   there is always one unaggregated namespace
-   optionally, you may configure additional aggregated namespaces.

Both the retention (how long the data is kept for) and the resolution
(how detailed the data is) are measured in **short time format**. This
is a number followed by a letter:

| Notation | Meaning |
| -------- | ------- |
| s        | seconds |
| m        | minutes |
| h        | hours   |
| d        | days    |

So for example to set the retention to 2 weeks, use `14d`.

## Unaggregated namespace

Incoming data points are written to the unaggregated namespace. It's
the default table, if you like.

## Aggregated namespace

An aggregated namespace has some data, usually downsampled to a lower
resolution, and retained for a different period of time. You can see a
screenshot of the configuration options below:

![Namespace configuration screenshot, showing the namespace name, retention and resolution fields](/images/content/products/m3db/configure-namespace.png)
