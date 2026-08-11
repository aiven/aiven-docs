## Service version management

Aiven manages the software version of single-versioned services for you. You don't
select or change the major version yourself, and only one version is available at a
time. The version your service is currently running is visible in the
[Aiven Console](https://console.aiven.io/).

## Version updates

Aiven updates the version as part of regular platform maintenance and rolls it out
during your service's [maintenance window](/docs/platform/concepts/maintenance-window).
Because you don't select a version, Aiven doesn't send the EOL email notifications and
reminders described for
[multi-versioned services](/docs/platform/reference/eol-for-major-versions#service-version-eol-policy).

## After a version reaches end of life

If Aiven sets an EOL date for the version your service is running:

-   If the service is powered on, it's automatically upgraded to the next supported
    version.
-   If the service is powered off, it's deleted.

{props.exception}

For the EOL dates of a specific single-versioned service, see the
[Aiven single-versioned services EOL](/docs/platform/reference/eol-for-major-versions#aiven-single-versioned-services-eol)
reference.

## If the entire service reaches end of life

In some cases, Aiven retires an entire service rather than upgrading it to a new
version. If this happens, Aiven announces the retirement in advance and provides
migration guidance. For the list of retired and soon-to-be-retired services, see
[End of life for Aiven services](/docs/platform/reference/end-of-life).
