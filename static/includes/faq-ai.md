**Does Aiven AI Optimizer mask/obfuscate my queries?**

Yes, Aiven AI Optimizer provides a non-intrusive solution to optimize your
database performance without compromising sensitive data access.
It achieves this by gathering information on schema structure, database statistics, and
other signals to detect potential performance problems and offer optimization
recommendations, without requiring credentials or access to the actual data in
the database.

To address the possibility of slow query logs containing sensitive data, Aiven
offers data masking capabilities that replace sensitive parameters within
queries with question marks (`?`). Data masking is enabled by default.

:::note
The masking option is not available for
the Standalone SQL query optimizer yet.
:::
