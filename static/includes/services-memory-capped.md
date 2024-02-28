## Services with memory limits

For data services with unbounded memory allocation, a memory limit is
placed on the primary service container, with the remainder reserved for
overhead and disk cache:

-   MySQL
-   PostgreSQL®

This **service memory** can be calculated as:

:::important
Reserved memory for non-service use is capped to a maximum of 4GB. For
MySQL, a 600MB minimum is always guaranteed.
:::
