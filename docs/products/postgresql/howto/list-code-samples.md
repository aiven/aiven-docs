---
title: Connect to Aiven for PostgreSQL®
---

import DocCardList from '@theme/DocCardList';

Connect to the Aiven for PostgreSQL® service using various programming languages or tools. All connections to PostgreSQL are encrypted and protected with TLS.

For a connection to be established, `sslmode` can be set as follows:

- **By default**, `sslmode` needs to be set to `require`. This ensures that TLS is used
  and data is encrypted while in-transit. This doesn't require or verify a certificate.
- **For more security**, `sslmode` can be set either to `verify-ca` or to `verify-full`.
  Each of these modes requires supplying a certificate (`ca.pem`) and verifies it.

Read more about [TLS/SSL certificates](/docs/platform/concepts/tls-ssl-certificates).

<DocCardList />
