---
title: Connect to OpenSearch® cluster with NodeJS
---

The most convenient way to work with the cluster when using NodeJS is to rely on [OpenSearch® JavaScript client](https://github.com/opensearch-project/opensearch-js).
Follow its `README` file for installation instructions.

To connect to the cluster, you'll need `service_uri`, which you can
find either in the service overview in the [Aiven
console](https://console.aiven.io) or get through the Aiven command line
interface [service
command](/docs/tools/cli/service-cli#avn_service_ca_get).
`service_uri` contains credentials, therefore should be treated with
care.

We strongly recommend using environment variables for credential
information. A good way to do this is to use `dotenv`. [See the official docs](https://github.com/motdotla/dotenv),
create `.env` file in the project and assign `SERVICE_URI` inside of
this file.

Add the require line to the top of your file:

```
require("dotenv").config()
```

Now you can refer to the value of `service_uri` as
`process.env.SERVICE_URI` in the code.

Add the following lines of code to create a client and assign
`process.env.SERVICE_URI` to the `node` property. This will be
sufficient to connect to the cluster, because `service_uri` already
contains credentials. Additionally, when creating a client you can also
specify `ssl configuration`, `bearer token`, `CA fingerprint` and other
authentication details depending on protocols you use.

```javascript
const { Client } = require('@opensearch-project/opensearch')

module.exports.client = new Client({
  node: process.env.SERVICE_URI,
});
```

The client will perform request operations on your behalf and return the
response in a consistent manner.
