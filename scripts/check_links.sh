#!/bin/bash

excludeList=(
    "aiven.io/?!docs"
	  "aiven.io/docs/assets"
	  "aiven.io/docs/images"
    "aiven.io/blog"
    "aiven.io/build"
    "aiven.io/byoc"
    "aiven.io/clickhouse"
    "aiven.io/changelog"
    "aiven.io/free-mysql-database"
    "aiven.io/community"
    "aiven.io/cookies"
    "aiven.io/developer"
    "aiven.io/events"
    "aiven.io/expert-services"
    "aiven.io/mysql"
    "aiven.io/press"
    "aiven.io/integrations-and-connectors"
    "aiven.io/security-compliance"
    "aiven.io/workshop"
    ".*twitter.com"
    ".*cdn.sanity.io"
    ".*console.cloud.google.com"
    ".*docs.npmjs.com"
    ".*github.com"
    ".*linkedin.com"
    ".*maven.apache.org"
    ".*uptime.aiven.io"
    ".*docker.com"
    ".*php.net"
    ".*karapace.io"
  )

acceptedResponses="--accepted-status-codes=200..404"
address="https://aiven.io/docs/"
bufferSize="--buffer-size=8192"
limitConnections="--max-connections=9"
rateLimit="--rate-limit=30"
redirectionLimit="--max-redirections=5"
timeout="--timeout=4000"

muffet ${acceptedResponses} \
       ${bufferSize} \
       ${excludeList[@]/#/--exclude } \
       ${limitConnections} \
       ${rateLimit} \
       ${redirectionLimit} \
       ${timeout} \
       "--color=always" \
       ${address};
