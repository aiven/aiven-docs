---
title: Aiven API
---

Use the Aiven API to programmatically access and automate tasks in the Aiven platform.

Common use cases for the Aiven API:

-   Use with continuous integration to create services during test runs.
-   Integrate with other parts of your existing automation setup to
    complete complex tasks.
-   Deploy and tear down development or demo platforms on a schedule.

## API quickstart

-   View the [API documentation and OpenAPI
    description](https://api.aiven.io/doc/).
-   Try the [Aiven API on
    Postman](https://www.postman.com/aiven-apis/workspace/aiven/documentation/21112408-1f6306ef-982e-49f8-bdae-4d9fdadbd6cd).

## Authentication

Most endpoints require authentication.
[Create an authentication token](docs/platform/howto/create_authentication_token.md)
and send it in the header.

You can use a structure like this:

```bash
Authorization: aivenv1 TOKEN
```

Where `TOKEN` is your authentication token.

## Handling JSON responses

The Aiven API returns information in JSON format. To get
information in an easier-to-read format, you can use a tool like
[`jq`](https://stedolan.github.io/jq/).

## API examples

### List your projects

```bash
curl -H "Authorization: aivenv1 TOKEN" https://api.aiven.io/v1/project
```

Where `TOKEN` is your authentication token.

The output is similar to the following:

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
      "project_name": "aiven-sandbox",
      "state": "",
      "tags": {},
      "tech_emails": [],
      "tenant_id": "aiven",
      "trial_expiration_time": null,
      "vat_id": "",
      "zip_code": ""
    }
  ]
}
```

### List cloud regions

This endpoint does not require authorization. If you aren't
authenticated, it returns the standard set of cloud regions.

```bash
curl https://api.aiven.io/v1/clouds
```

The output is similar to the following:

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
```

You can use the `cloud_name` from this response as an input for other endpoints.

## Related pages

-   Read about
    [authentication tokens](/docs/platform/concepts/authentication-tokens).
-   See more [API examples](https://aiven.io/blog/your-first-aiven-api-call).
-   Learn about the [Aiven CLI](/docs/tools/cli).
