#!/bin/bash

excludeList=(
    "aiven.io/?!docs"
	  "aiven.io/docs/assets"
	  "aiven.io/docs/images"
    "aiven.io/blog"
    "aiven.io/build"
    "aiven.io/community"
    "aiven.io/developer"
    "aiven.io/mysql"
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
