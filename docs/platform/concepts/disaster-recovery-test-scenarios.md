---
title: Disaster recovery testing scenarios
---

[Disaster Recovery](https://en.wikipedia.org/wiki/Disaster_recovery) (DR) is the ability of software and/or services to handle extreme scenarios. For example, the failure of the software itself or a datacenter outage.

Aiven provides this service to any Enterprise Support customers and can run
these scenarios at your request up to 4 times per year.

## Disaster Recovery scenario

This is a preset scenario where an Aiven specialist will simulate an
issue with your service and `sabotage` one (or more) of your Virtual
Machines. For example, with an Aiven for PostgreSQL® service, we can
`sabotage` the Primary instance and test the failover functionality or
we can sabotage both nodes to test recovery time for a complete outage.

## Requirements

1. At least 7 working days notice and the time (plus timezone) that you
   would like this carried out.
1. A `throwaway` service created specifically for
   this scenario and not a service used in Production.
1. The virtual machine and/or the availability zone that you would like
   to target.
1. An Enterprise Support contract.

## Requesting a disaster recovery test

You can request a test by contacting the [support team](mailto:support@aiven.io)
or by contacting your Customer Success Manager.

The process looks as follows:

- All communication during the exercise will occur in the support ticket.
- Aiven contacts you to confirm the start date and content of the scenario.
- You confirm the scenario and its start date.
- Actions taken on the service and/or virtual machines will be communicated through
  the support ticket.
