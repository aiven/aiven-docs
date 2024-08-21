---
title: Aiven API
---

import RIP from "@site/static/includes/run-in-postman.md";
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Use the Aiven API to programmatically access and automate tasks in the Aiven platform.

Common use cases for the Aiven API:

- Use with continuous integration to create services during test runs.
- Integrate with other parts of your existing automation setup to
  complete complex tasks.
- Deploy and tear down development or demo platforms on a schedule.
- Scale your disks based on specific events.

## Get started with Aiven API

Use the [Postman workspace](https://www.postman.com/aiven-apis/workspace/aiven/overview)
to try the Aiven API.

1. [Create a token](/docs/platform/howto/create_authentication_token).
1. Fork the Postman **collection** and **environment**.

   <RIP/>

1. Insert the token in the `authToken` in the Postman environment.
1. See the [API documentation](https://api.aiven.io/doc/).
1. Send your requests via Postman.

## API examples

### List your projects

<Tabs>
<TabItem value="req" label="Request" default>

```bash
curl -H "Authorization: aivenv1 TOKEN" https://api.aiven.io/v1/project
```

Where `TOKEN` is your token.

</TabItem>
<TabItem value="response" label="Response">

```json
{
  "project_membership": {
    "my-best-demo": "admin",
    "aiven-sandbox": "admin"
  },
  "project_memberships": {
    "my-best-demo": [
      "admin"
    ],
    "aiven-sandbox": [
      "admin"
    ]
  },
  "projects": [
    {
      "account_id": "a225dad8d3c4",
      "account_name": "Aiven Accounts",
      "address_lines": [],
      "available_credits": "0.00",
      "billing_address": "",
      "billing_currency": "USD",
      "billing_emails": [],
      "billing_extra_text": null,
      "billing_group_id": "588a8e63-fda7-4ff7-9bff-577debfee604",
      "billing_group_name": "Billing",
      "card_info": null,
      "city": "",
      "company": "",
      "country": "",
      "country_code": "",
      "default_cloud": "google-europe-north1",
      "end_of_life_extension": {},
      "estimated_balance": "4.11",
      "estimated_balance_local": "4.11",
      "payment_method": "no_payment_expected",
      "project_name": "my-best-demo",
      "state": "",
      "tags": {},
      "tech_emails": [],
      "tenant_id": "aiven",
      "trial_expiration_time": null,
      "vat_id": "",
      "zip_code": ""
    },
    {
     //...
    }
  ]
}
```

</TabItem>
</Tabs>

### List cloud regions

<Tabs>
<TabItem value="req" label="Request" default>


```bash
curl https://api.aiven.io/v1/clouds
```

This endpoint does not require authorization. If you aren't
authenticated, it returns the standard set of cloud regions.

</TabItem>
<TabItem value="response" label="Response">

```json
{
  "clouds": [
    {
      "cloud_description": "Africa, South Africa - Amazon Web Services: Cape Town",
      "cloud_name": "aws-af-south-1",
      "geo_latitude": -33.92,
      "geo_longitude": 18.42,
      "geo_region": "africa"
    },
    {
      "cloud_description": "Africa, South Africa - Azure: South Africa North",
      "cloud_name": "azure-south-africa-north",
      "geo_latitude": -26.198,
      "geo_longitude": 28.03,
      "geo_region": "africa"
    },
}
```

</TabItem>
</Tabs>

## Related pages

- [Personal tokens](/docs/platform/concepts/authentication-tokens)
- [Aiven Provider for Terraform](https://registry.terraform.io/providers/aiven/aiven/latest/docs)
- [API reference docs](https://api.aiven.io/doc/)
