#!/bin/bash

excludeList=(
    ".*maven.apache.org"
    ".*docs.npmjs.com"
    ".*github.com"
    "www.php.net"
    "aiven.io\\/community"
    "aiven.io\\/build"
    "aiven.io\\/docs\\/assets"
    ".*uptime.aiven.io"
    ".*linkedin.com"
    ".*cdn.sanity.io"
    ".*console.cloud.google.com"
    "docker.com"
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
