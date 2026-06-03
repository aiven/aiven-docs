Fork an Aiven service to create a complete copy of it from its latest backup.
Forked services are independent
and don't share resources with or increase the load on the original service.
Common use cases for forking include:

- Creating a snapshot to analyze an issue.
- Creating a development copy of your production environment.
- Testing upgrades before applying them to production services.
- Creating an instance in a different cloud provider, region, or with a different plan.
- Renaming a service.

During the forking process, the fork might initially have only one node while backups
are being taken. The other nodes appear after the backup process is complete.
