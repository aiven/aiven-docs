---
title: Connect to your Aiven for PostgreSQL® service
---

import DocCardList from '@theme/DocCardList';

Connect to Aiven for PostgreSQL® with a tool or programming language of your choice.

All connections to Aiven for PostgreSQL are encrypted and protected with TLS.

For a connection to be established, `sslmode` can be set as follows:

- **By default**, `sslmode` needs to be set to `require`. This ensures that TLS is used
  and data is encrypted while in-transit. This doesn't require or verify a certificate or
  a server.
- **For more security**, `sslmode` can be set to one of the following:
  - `verify-ca` - requires supplying a certificate (`ca.pem`) and verifies the certificate
    or the server.
  - `verify-full` - requires supplying a certificate (`ca.pem`), verifies the certificate
    and the CA chain, as well as validating the hostname.

Read more about [TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates).

<DocCardList />
