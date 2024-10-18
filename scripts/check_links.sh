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

rateLimit="--rate-limit=30"
limitConnections="--max-connections=9"
bufferSize="--buffer-size=8192"
timeout="--timeout=4000"
address="https://aiven.io/docs/"
redirectionLimit="--max-redirections=5"

muffet ${bufferSize} \
       ${timeout} \
       ${excludeList[@]/#/--exclude } \
       ${skipTLS} \
       ${excludeGithub} \
       ${limitConnections} \
       ${rateLimit} \
       ${redirectionLimit} \
       "--color=always" \
       ${address};
