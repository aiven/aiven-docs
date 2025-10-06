:::important[Custom domain restrictions in VPCs]
When you set a custom domain for a service deployed in a VPC, the service certificate is only created for the `public-*` hostname and the custom domain. Certificate verification will fail for the `private-*` hostname and the dynamic service name.

To avoid certificate verification issues, ensure your applications connect using either the `public-*` hostname or the custom domain when accessing VPC-deployed services.
:::
