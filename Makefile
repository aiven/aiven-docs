TOOLS         = ./tools
INCLUDESDIR      = ./static/includes

# Generate config listing for a service type
all-service-type-configs: service-type-config-cassandra service-type-config-clickhouse service-type-config-flink service-type-config-grafana service-type-config-kafka_mirrormaker service-type-config-kafka_connect service-type-config-kafka service-type-config-m3aggregator service-type-config-m3db service-type-config-mysql service-type-config-opensearch service-type-config-redis service-type-config-influxdb service-type-config-dragonfly

service-type-config-cassandra:
	node "$(TOOLS)/service_type_parser.js" "cassandra" "$(INCLUDESDIR)/config-cassandra.md"

service-type-config-clickhouse:
	node "$(TOOLS)/service_type_parser.js" "clickhouse" "$(INCLUDESDIR)/config-clickhouse.md"

service-type-config-dragonfly:
	node "$(TOOLS)/service_type_parser.js" "dragonfly" "$(INCLUDESDIR)/config-dragonfly.md"

service-type-config-flink:
	node "$(TOOLS)/service_type_parser.js" "flink" "$(INCLUDESDIR)/config-flink.md"

service-type-config-grafana:
	node "$(TOOLS)/service_type_parser.js" "grafana" "$(INCLUDESDIR)/config-grafana.md"

service-type-config-influxdb:
	node "$(TOOLS)/service_type_parser.js" "influxdb" "$(INCLUDESDIR)/config-influxdb.md"

service-type-config-kafka_connect:
	node "$(TOOLS)/service_type_parser.js" "kafka_connect" "$(INCLUDESDIR)/config-kafka_connect.md"

service-type-config-kafka_mirrormaker:
	node "$(TOOLS)/service_type_parser.js" "kafka_mirrormaker" "$(INCLUDESDIR)/config-kafka_mirrormaker.md"

service-type-config-kafka:
	node "$(TOOLS)/service_type_parser.js" "kafka" "$(INCLUDESDIR)/config-kafka.md"

service-type-config-m3aggregator:
	node "$(TOOLS)/service_type_parser.js" "m3aggregator" "$(INCLUDESDIR)/config-m3aggregator.md"

service-type-config-m3db:
	node "$(TOOLS)/service_type_parser.js" "m3db" "$(INCLUDESDIR)/config-m3db.md"

service-type-config-mysql:
	node "$(TOOLS)/service_type_parser.js" "mysql" "$(INCLUDESDIR)/config-mysql.md"

service-type-config-opensearch:
	node "$(TOOLS)/service_type_parser.js" "opensearch" "$(INCLUDESDIR)/config-opensearch.md"

service-type-config-redis:
	node "$(TOOLS)/service_type_parser.js" "redis" "$(INCLUDESDIR)/config-redis.md"

# TODO: add automation for "pg". See https://github.com/aiven/devportal/issues/1026

cloud-list:
	node "$(TOOLS)/clouds.js" "$(INCLUDESDIR)/clouds-list.md"
