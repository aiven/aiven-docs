SCRIPTS         = ./scripts
INCLUDESDIR      = ./static/includes

# Generate config listing for a service type
all-service-type-configs: service-type-config-cassandra service-type-config-clickhouse service-type-config-flink service-type-config-grafana service-type-config-kafka_mirrormaker service-type-config-kafka_connect service-type-config-kafka service-type-config-m3aggregator service-type-config-m3db service-type-config-mysql service-type-config-opensearch service-type-config-caching service-type-config-pg service-type-config-dragonfly

service-type-config-cassandra:
	node "$(SCRIPTS)/service_type_parser.js" "cassandra" "$(INCLUDESDIR)/config-cassandra.md"

service-type-config-clickhouse:
	node "$(SCRIPTS)/service_type_parser.js" "clickhouse" "$(INCLUDESDIR)/config-clickhouse.md"

service-type-config-dragonfly:
	node "$(SCRIPTS)/service_type_parser.js" "dragonfly" "$(INCLUDESDIR)/config-dragonfly.md"

service-type-config-flink:
	node "$(SCRIPTS)/service_type_parser.js" "flink" "$(INCLUDESDIR)/config-flink.md"

service-type-config-grafana:
	node "$(SCRIPTS)/service_type_parser.js" "grafana" "$(INCLUDESDIR)/config-grafana.md"

service-type-config-kafka_connect:
	node "$(SCRIPTS)/service_type_parser.js" "kafka_connect" "$(INCLUDESDIR)/config-kafka_connect.md"

service-type-config-kafka_mirrormaker:
	node "$(SCRIPTS)/service_type_parser.js" "kafka_mirrormaker" "$(INCLUDESDIR)/config-kafka_mirrormaker.md"

service-type-config-kafka:
	node "$(SCRIPTS)/service_type_parser.js" "kafka" "$(INCLUDESDIR)/config-kafka.md"

service-type-config-m3aggregator:
	node "$(SCRIPTS)/service_type_parser.js" "m3aggregator" "$(INCLUDESDIR)/config-m3aggregator.md"

service-type-config-m3db:
	node "$(SCRIPTS)/service_type_parser.js" "m3db" "$(INCLUDESDIR)/config-m3db.md"

service-type-config-mysql:
	node "$(SCRIPTS)/service_type_parser.js" "mysql" "$(INCLUDESDIR)/config-mysql.md"

service-type-config-opensearch:
	node "$(SCRIPTS)/service_type_parser.js" "opensearch" "$(INCLUDESDIR)/config-opensearch.md"

service-type-config-pg:
	node "$(SCRIPTS)/service_type_parser.js" "pg" "$(INCLUDESDIR)/config-pg.md"

service-type-config-caching:
	node "$(SCRIPTS)/service_type_parser.js" "redis" "$(INCLUDESDIR)/config-caching.md"

cloud-list:
	node "$(SCRIPTS)/clouds_parser.js" "$(INCLUDESDIR)/clouds-list.md"

delete-unused-images:
	node "$(SCRIPTS)/delete_unused_images.js"
