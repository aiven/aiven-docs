---
title: Create alerts with OpenSearch® API
---

OpenSearch® alerting feature sends notifications when data from one or more indices meets certain conditions that can be customized.
Use case
examples are such as monitoring for HTTP status code 503, CPU load
average above certain percentage or watch for counts of a specific
keyword in logs for a specific amount of interval, notification to be
configured to be sent via email, slack or custom webhooks and other
destination, in this example we are using slack as the destination.

In the following example, we are creating an alert programmatically by
using OpenSearch Alerting API. We are using a `sample-host-health` index
as datasource to create a simple alert to check cpu load, action will be
triggered when average of `cpu_usage_percentage` over `3` minutes is
above `75%`

OpenSearch API Alerting API URL can be copied from Aiven console:

Click the **Overview** tab > **OpenSearch** under
`Connection Information` > **Service URI** append
`_plugins/_alerting/monitors` to the **Service URI**.

Example:

`https://username:password@os-name-myproject.aivencloud.com:24947/_plugins/_alerting/monitors`

Save the JSON below into `cpu_alert.json`

```json
{
  "name": "High CPU Monitor",
  "type": "monitor",
  "monitor_type": "query_level_monitor",
  "enabled": true,
  "schedule": {
    "period": {
      "unit": "MINUTES",
      "interval": 1
    }
  },
  "inputs": [
    {
      "search": {
        "indices": ["sample-host-health"],
        "query": {
          "size": 0,
          "aggregations": {
            "metric": {
              "avg": {
                "field": "cpu_usage_percentage"
              }
            }
          },
          "query": {
            "bool": {
              "filter": [
                {
                  "range": {
                    "timestamp": {
                      "gte": "{{period_end}}||-3m",
                      "lte": "{{period_end}}",
                      "format": "epoch_millis"
                    }
                  }
                }
              ]
            }
          }
        }
      }
    }
  ],
  "triggers": [
    {
      "query_level_trigger": {
        "id": "lNbSt30BZGFGbIUYx2bb",
        "name": "high_cpu",
        "severity": "1",
        "condition": {
          "script": {
            "source": "return ctx.results[0].aggregations.metric.value == null ? false : ctx.results[0].aggregations.metric.value > 75",
            "lang": "painless"
          }
        },
        "actions": [
          {
            "id": "ldbSt30BZGFGbIUYx2bb",
            "name": "slack",
            "destination_id": "gkQgp30BRvA_n4QUwZDL",
            "message_template": {
              "source": "Monitor {{ctx.monitor.name}} just entered alert status. Please investigate the issue.\n  - Trigger: {{ctx.trigger.name}}\n  - Severity: {{ctx.trigger.severity}}\n  - Period start: {{ctx.periodStart}}\n  - Period end: {{ctx.periodEnd}}",
              "lang": "mustache"
            },
            "throttle_enabled": false,
            "subject_template": {
              "source": "High CPU Test Alert",
              "lang": "mustache"
            }
          }
        ]
      }
    }
  ],
  "ui_metadata": {
    "schedule": {
      "timezone": null,
      "frequency": "interval",
      "period": {
        "unit": "MINUTES",
        "interval": 1
      },
      "daily": 0,
      "weekly": {
        "tue": false,
        "wed": false,
        "thur": false,
        "sat": false,
        "fri": false,
        "mon": false,
        "sun": false
      },
      "monthly": {
        "type": "day",
        "day": 1
      },
      "cronExpression": "0 */1 * * *"
    },
    "search": {
      "searchType": "graph",
      "timeField": "timestamp",
      "aggregations": [
        {
          "aggregationType": "avg",
          "fieldName": "cpu_usage_percentage"
        }
      ],
      "groupBy": [],
      "bucketValue": 3,
      "bucketUnitOfTime": "m",
      "where": {
        "fieldName": [],
        "fieldRangeEnd": 0,
        "fieldRangeStart": 0,
        "fieldValue": "",
        "operator": "is"
      }
    },
    "monitor_type": "query_level_monitor"
  }
}
```

Use `curl` to create the alert

```
curl -XPOST \
https://username:password@os-name-myproject.aivencloud.com:24947/_plugins/_alerting/monitors \
-H 'Content-type: application/json' -T cpu_alert.json
```

-   The required JSON request format can be found in [OpenSearch
    Alerting API
    documentation](https://opensearch.org/docs/latest/observing-your-data/alerting/api/)
