---
title: Rename a service
---

You cannot rename a service after creation. Instead, you can create a fork
with the new name and delete the original service.

1. Stop writes on the service.
1. [Fork the service](/docs/platform/concepts/service-forking).
1. Point your clients to the new service and add any integrations or SSO configuration
   that weren't copied.
1. Test the forked service.
1. [Delete the original service](/docs/platform/concepts/service-power-cycle).
