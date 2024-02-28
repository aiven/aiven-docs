## Services with memory limits

For data services with unbounded memory allocation, a memory limit is placed on the primary service container, with the remainder reserved for overhead and disk cache:

- MySQL
- PostgreSQL®

This **service memory** is calculated as:

$$
(RAM - overhead) \times .80
$$

:::important
Reserved memory for non-service use is capped to a maximum of 4 GB. For MySQL, a 600 MB minimum is always guaranteed.
:::
