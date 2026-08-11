## Aiven version support and upstream EOL

Aiven aims to follow the EOL schedule set by the original authors and
maintainers of the open source software (the upstream projects). Once
the upstream project retires a specific version, they do not receive
security updates and critical bug fixes anymore by the maintainers.

Outdated services don't offer the level of protection you
need, so Aiven follows the upstream project's EOL schedule to ensure
that Aiven services are always running on supported versions.

## Service version numbering

Aiven services inherit the upstream project's software versioning
scheme. Depending on the service, a major version can be either a single
digit or in the format `major.minor`. The exact version of the service is
visible in the [Aiven Console](https://console.aiven.io/) when the service
is running.

## Service version EOL policy

Aiven sets an EOL date for each major version of the service. This policy
covers both running and powered-off services on affected versions.

## EOL notifications

When Aiven sets the EOL date for a service major version:

-   You receive an email notification along with instructions on
    the next steps.
-   The [Aiven Console](https://console.aiven.io/) shows an EOL alert
    for affected services.
-   You receive email reminders monthly.
-   In the month of the EOL date, you receive weekly reminders.

## EOL best practices

- Use [service forking](/docs/platform/concepts/service-forking) to test the version
  upgrade before upgrading your production services.
- Upgrade to the supported version before the EOL date. This gives you time to test
  compatibility, resolve any issues, and plan the upgrade on your schedule.

After the EOL date:

-   If the service is powered on, it's automatically upgraded to the
    latest version when possible, or to another supported version.

    :::note
    If it's not possible to upgrade a powered-on service to a supported
    version, the service is powered off and ultimately deleted.
    :::

-   If the service is powered off, it's deleted.

{props.exception}
