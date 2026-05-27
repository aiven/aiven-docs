SCRIPTS         = ./scripts
INCLUDESDIR      = ./static/includes

# Generate config listing for a service type
all-service-type-configs: service-type-config-clickhouse service-type-config-flink service-type-config-grafana service-type-config-kafka_mirrormaker service-type-config-kafka_connect service-type-config-kafka service-type-config-mysql service-type-config-opensearch service-type-config-pg service-type-config-dragonfly service-type-config-valkey service-type-config-kafka-inkless-saas service-type-config-kafka-topic-inkless-saas service-type-config-kafka-free-tier service-type-config-kafka-topic-free-tier service-type-config-kafka-dev-tier service-type-config-kafka-topic-dev-tier

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

service-type-config-kafka-inkless-saas:
	node "$(SCRIPTS)/kafka/create-kafka-cluster-config-page.js" "inkless-saas" "$(INCLUDESDIR)/config-kafka-inkless-saas.md"

service-type-config-kafka-topic-inkless-saas:
	node "$(SCRIPTS)/kafka/create-kafka-topic-config-page.js" "inkless-saas" "$(INCLUDESDIR)/config-kafka-inkless-saas-topic.md"

service-type-config-kafka-free-tier:
	node "$(SCRIPTS)/kafka/create-kafka-cluster-config-page.js" "free-tier" "$(INCLUDESDIR)/config-kafka-free-tier.md"

service-type-config-kafka-topic-free-tier:
	node "$(SCRIPTS)/kafka/create-kafka-topic-config-page.js" "free-tier" "$(INCLUDESDIR)/config-kafka-free-tier-topic.md"

service-type-config-kafka-dev-tier:
	node "$(SCRIPTS)/kafka/create-kafka-cluster-config-page.js" "dev-tier" "$(INCLUDESDIR)/config-kafka-dev-tier.md"

service-type-config-kafka-topic-dev-tier:
	node "$(SCRIPTS)/kafka/create-kafka-topic-config-page.js" "dev-tier" "$(INCLUDESDIR)/config-kafka-dev-tier-topic.md"

service-type-config-mysql:
	node "$(SCRIPTS)/service_type_parser.js" "mysql" "$(INCLUDESDIR)/config-mysql.md"

service-type-config-opensearch:
	node "$(SCRIPTS)/service_type_parser.js" "opensearch" "$(INCLUDESDIR)/config-opensearch.md"

service-type-config-pg:
	node "$(SCRIPTS)/service_type_parser.js" "pg" "$(INCLUDESDIR)/config-pg.md"

service-type-config-valkey:
	node "$(SCRIPTS)/service_type_parser.js" "valkey" "$(INCLUDESDIR)/config-valkey.md"

cloud-list:
	node "$(SCRIPTS)/clouds_parser.js" "$(INCLUDESDIR)/clouds-list.md"

delete-unused-images:
	node "$(SCRIPTS)/delete_unused_images.js"

# Ignore localized sitemap URLs that can fail independently of docs content.
check-links:
	docker run --rm \
		-v "$(CURDIR)/scripts/linkchecker-ignore.rc:/linkchecker-ignore.rc:ro" \
		ghcr.io/linkchecker/linkchecker:latest \
		-f /linkchecker-ignore.rc \
		-r 1 \
		--no-warnings \
		--check-extern \
		https://aiven.io/docs/sitemap.xml
