---
title: Restart strategy in SQL and JAR applications
---
Learn how Aiven for Apache Flink® applications uses restart strategies to recover from job failures, ensuring high availability and fault tolerance for your distributed applications.

## About restart strategy

A restart strategy is a set of rules that Apache Flink® adheres to when dealing with
Flink job failures. These strategies enable the automatic restart of a failed Flink job
under specific conditions and parameters, which is crucial for high availability and fault
tolerance in distributed and scalable systems. Aiven for Apache Flink® supports restart
strategies for both JAR and SQL applications.

## Default restart strategy for JAR and SQL applications

Aiven for Apache Flink® uses the **exponential-delay** strategy as the default
restart mechanism for both **JAR and SQL applications**. This strategy incrementally
increases the delay between restarts, reaching a configurable maximum. After reaching
the maximum, the delay remains constant. The strategy resets the exponential delay after
a period of successful restarts, preventing it from staying at the maximum indefinitely.
This default strategy is integrated into the Aiven for Apache Flink cluster configuration
and automatically applies to JAR and SQL applications.

## View the default strategy

You can view the default restart strategy configurations for your Aiven
for Apache Flink cluster in the Apache Flink Dashboard. Follow these
steps to view the current settings:

1. Access the [Aiven Console](https://console.aiven.io/) and select the
   Aiven for Apache Flink service.
1. From the **Connection information** section on the overview page,
   copy the **Service URI** and paste it into your web browser's
   address bar.
1. When prompted, log in using the **User** and **Password**
   credentials specified in the **Connection information** section.
1. Once in the **Apache Flink Dashboard**, click the **Job Manager**
   from the menu.
1. Switch to the **Configuration** tab.
1. Review the configurations and parameters related to the restart
   strategy.

## Disable default restart strategy

While Aiven for Apache Flink® typically recommends following the default restart strategy
for high availability and fault tolerance, there might be scenarios,
especially during testing or debugging, where disabling automatic restarts
might be beneficial.

### JAR applications

For JAR applications, you cannot disable the default restart
strategy in Aiven for Apache Flink® through configuration files.
Instead, directly modify the code of your Jar application to achieve
this.

```java
StreamExecutionEnvironment env = StreamExecutionEnvironment.getExecutionEnvironment();
env.setRestartStrategy(RestartStrategies.noRestart());
```

This code sets the restart strategy to `None`, preventing any restart
attempts in case of failures.

### SQL applications

For SQL applications, you have a simplified approach to
restart strategies. You can enable or disable restarts on failure during
application deployment, providing a straightforward way
to manage applications without complex configurations.
For more information, see [Create an SQL application](/docs/products/flink/howto/create-sql-application).

## Key considerations when disabling default restarts

Before disabling the default restart strategy for your applications, consider the
following:

- **Persistent failures**: Disabling restarts means that if a Flink
  Job fails, it will not attempt to recover it, leading to
  permanent job failure.
- **Testing and debugging**: Disabling is beneficial when identifying
  issues in the application code, as it prevents the masking of errors
  through automatic restarts.
- **External factors**: Jobs can fail due to external factors, such as
  infrastructure changes or maintenance activities. If you disable
  restarts, your Flink jobs will become vulnerable to failures.
- **Operational risks**: In production environments, it is generally
  advisable to use the default restart strategy to ensure high
  availability and fault tolerance.

## Related pages

- [Restart strategies in Apache
  Flink®](https://nightlies.apache.org/flink/flink-docs-release-1.18/docs/ops/state/task_failure_recovery/#restart-strategies)
