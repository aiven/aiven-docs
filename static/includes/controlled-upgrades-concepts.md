import LimitedBadge from "@site/src/components/Badges/LimitedBadge";

Control when your Aiven managed services receive maintenance updates and test maintenance
updates in development or staging environments before they reach production.

:::important
Controlled upgrade pipeline is a
[limited availability](/docs/platform/concepts/service-and-feature-releases#limited-availability-)
feature.
[Contact Aiven](https://aiven.io/contact) to request access.
:::

Aiven performs automatic
[service maintenance for security fixes, minor software updates](/docs/platform/concepts/maintenance-window),
and other platform changes. The controlled upgrade pipeline feature lets you link services
of the same type in an ordered sequence to control when each service receives updates.
After a maintenance update upgrades a service at the initial pipeline step, you validate
that service version before the update proceeds to the service at the next pipeline step.
Validating means approving the new version as safe to roll out to the next service.
Validation can be manual or automatic after a configurable delay.

## Why use controlled upgrade pipelines

Controlled upgrade pipelines prevent production incidents caused by automatic updates
reaching production before teams can test the new version in a lower environment.
They give you full oversight of the update process:

- **Risk mitigation**: Prevents unexpected maintenance updates from breaking your
  production environment by ensuring they are tested in a non-production setting first.
- **Stability**: Keeps destination services (such as production) on a known-good version
  until you, or the automatic timer, confirm the new version is safe.
- **Process control**: Allows platform teams to standardize their deployment and
  maintenance lifecycle across environments.

## About controlled upgrade pipelines

### Upgrade steps

An upgrade step is a pair of services linked by an upgrade constraint:

- **Source service**: The service that receives maintenance updates first
- **Destination service**: The service that waits for validation before receiving updates

Each destination service can have only one source service. A source service can have
multiple destination services.

### Upgrade pipelines

An upgrade pipeline is a chain of upgrade steps that spans multiple environments.
For example:

- Single chain: development → staging → production
- Multiple destinations: development → production-eu and development → production-na

## How validation works

When a maintenance update upgrades your source service:

1. The source service receives the update first.
1. Test the updated source service to verify it works as expected.
1. Validate the update manually using the API or CLI, or wait for automatic validation
  after the configured delay. The default delay is 7 days.
1. After validation, the destination service becomes eligible for the same
   maintenance update.

If one source service has multiple destination services, one validation for the
source service applies to all connected destination services.

Nodes in the destination service maintain the validated version until a newer version is
validated, either when you validate it manually or when automatic validation applies after
the configured delay. When a node is recycled, it uses the same validated version, not the
latest available version.

When you create a step, the destination service keeps the newest version that is
already validated at that moment. If the destination service is already applying
maintenance during step creation, the in-progress target version becomes the initial
validated version.

:::warning
A powered-off source service cannot receive maintenance updates, so you cannot validate
it. If you power off services earlier in the chain, the destination service upgrades
regardless. For example, in a development → staging → production chain, if both
development and staging are powered off, production upgrades without testing and
validation in the earlier environments. Keep services in the chain powered on to preserve
the protection that upgrade pipelines provide.
:::

## Limitations and considerations

- **Same service type**: You can only link services of the same type. For example,
  two Aiven for PostgreSQL services.
- **Chain length**: The maximum chain depth is 3 services, which is 2 steps.
- **No cycles**: You cannot create circular dependencies between services.
- **Emergency overrides**: Aiven can apply critical security or stability fixes
  to a destination service before explicit validation.
- **Supported services**: This feature supports all Aiven service types except
  Aiven for Apache Flink® and Aiven for MySQL.
- **No permanent blocking**: You cannot prevent an update indefinitely. Automatic
  validation applies after the configured delay, up to the maximum delay.
