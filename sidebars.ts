import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  main: [
    {
      type: 'category',
      label: 'Overview',
      className: 'expandedSection',
      collapsed: false,
      collapsible: false,
      items: [
        'get-started',
        'platform/concepts/free-plan',
        'platform/concepts/free-trial',
        'marketplace-setup',
        'tools/aiven-console',
        'platform/concepts/beta_services',
        'platform/howto/feature-preview',
      ],
    },
    {
      type: 'category',
      label: 'Platform',
      className: 'expandedSection',
      collapsed: false,
      collapsible: false,
      items: [
        {
          type: 'category',
          label: 'Organizations, units, and projects',
          link: {
            type: 'doc',
            id: 'platform/concepts/orgs-units-projects',
          },
          items: [
            {
              type: 'category',
              label: 'Organizations and units',
              items: [
                'tools/aiven-console/howto/create-orgs-and-units',
                'platform/howto/manage-organizations',
              ],
            },
            {
              type: 'category',
              label: 'Projects',
              items: [
                'platform/howto/manage-project',
                'platform/howto/technical-emails',
                'platform/howto/manage-unassigned-projects',
                'platform/howto/reactivate-suspended-project',
              ],
            },
            'platform/concepts/carbon-footprint',
          ],
        },
        {
          type: 'category',
          label: 'Billing and payment',
          link: {
            type: 'doc',
            id: 'platform/concepts/billing-and-payment',
          },
          items: [
            'platform/concepts/tax-information',
            {
              type: 'category',
              label: 'Payment methods',
              items: [
                'platform/howto/manage-payment-card',
                'platform/howto/manage-bank-transfers',
                'platform/howto/list-marketplace-payments',
              ],
            },
            {
              type: 'category',
              label: 'Billing groups',
              items: ['platform/howto/use-billing-groups'],
            },
            'platform/howto/download-invoices',
          ],
        },
        {
          type: 'category',
          label: 'User and access management',
          link: {
            type: 'doc',
            id: 'platform/concepts/user-access-management',
          },
          items: [
            {
              type: 'category',
              label: 'Organization user management',
              items: [
                'platform/howto/manage-org-users',
                'platform/concepts/application-users',
                'platform/howto/manage-application-users',
                'platform/concepts/managed-users',
                'platform/howto/manage-groups',
                'tools/aiven-console/howto/create-manage-teams',
              ],
            },
            {
              type: 'category',
              label: 'Permissions',
              items: [
                'platform/concepts/permissions',
                'platform/howto/manage-permissions',
                'platform/howto/make-super-admin',
              ],
            },
            {
              type: 'category',
              label: 'User profiles',
              items: [
                'platform/howto/edit-user-profile',
                'platform/howto/change-your-email-address',
                'platform/howto/delete-user',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Authentication',
          link: {
            type: 'doc',
            id: 'platform/howto/list-authentication',
          },
          items: [
            'platform/howto/add-authentication-method',
            'platform/reference/password-policy',
            'platform/howto/user-2fa',
            'platform/howto/set-authentication-policies',
            'platform/concepts/authentication-tokens',
            'platform/howto/create_authentication_token',
          ],
        },
        {
          type: 'category',
          label: 'Identity providers and domains',
          link: {
            type: 'doc',
            id: 'platform/howto/list-identity-providers',
          },
          items: [
            'platform/howto/manage-domains',
            'platform/howto/saml/add-identity-providers',
            'platform/howto/saml/add-auth0-idp',
            'platform/howto/saml/add-fusionauth-idp',
            'platform/howto/saml/add-google-idp',
            'platform/howto/saml/add-jumpcloud-idp',
            'platform/howto/saml/add-azure-idp',
            'platform/howto/saml/add-okta-idp',
            'platform/howto/saml/add-onelogin-idp',
          ],
        },
        {
          type: 'category',
          label: 'Service management',
          link: {
            type: 'doc',
            id: 'platform/howto/list-service',
          },
          items: [
            {
              type: 'category',
              label: 'Concepts',
              items: [
                'platform/concepts/service_backups',
                'platform/concepts/service-resources',
                'platform/concepts/service-memory-limits',
                'platform/concepts/out-of-memory-conditions',
                'platform/concepts/maintenance-window',
                'platform/howto/custom-plans',
              ],
            },
            {
              type: 'category',
              label: 'Migrations',
              items: [
                'platform/howto/migrate-services-cloud-region',
                'platform/howto/migrate-services-vpc',
              ],
            },
            {
              type: 'category',
              label: 'Service scaling',
              items: [
                'platform/howto/scale-services',
                'platform/howto/add-storage-space',
                'platform/howto/disk-autoscaler',
              ],
            },
            {
              type: 'category',
              label: 'Backup to another region',
              items: [
                'platform/concepts/backup-to-another-region',
                'platform/howto/btar/enable-backup-to-another-region',
                'platform/howto/btar/manage-backup-to-another-region',
                'platform/howto/btar/disable-backup-to-another-region',
              ],
            },
            'platform/howto/create_new_service',
            'platform/concepts/service-power-cycle',
            'platform/howto/tag-resources',
            'platform/howto/search-services',
            'platform/howto/create_new_service_user',
            'platform/concepts/service-forking',
            'platform/howto/prepare-for-high-load',
          ],
        },
        {
          type: 'category',
          label: 'Networking and security',
          items: [
            'platform/concepts/cloud-security',
            'platform/reference/list_of_clouds',
            'platform/concepts/availability-zones',
            'platform/concepts/enhanced-compliance-env',
            {
              type: 'category',
              label: 'VPCs',
              items: [
                'platform/howto/manage-vpc-peering',
                'platform/howto/public-access-in-vpc',
                'platform/howto/vpc-peering-gcp',
                'platform/howto/vpc-peering-aws',
                'platform/howto/vnet-peering-azure',
                'platform/howto/vpc-peering-upcloud',
                'platform/howto/google-cloud-functions',
                'platform/howto/attach-vpc-aws-tgw',
                {
                  type: 'category',
                  label: 'Private link',
                  items: [
                    'platform/howto/use-aws-privatelinks',
                    'platform/howto/use-azure-privatelink',
                    'platform/howto/use-google-private-service-connect',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'IP addresses',
              items: [
                'platform/reference/service-ip-address',
                'platform/concepts/static-ips',
                'platform/howto/restrict-access',
                'platform/howto/private-ip-resolution',
              ],
            },
            'platform/concepts/aiven-node-firewall-configuration',
            'platform/concepts/tls-ssl-certificates',

            'platform/concepts/disaster-recovery-test-scenarios',
          ],
        },
        'platform/reference/eol-for-major-versions',
        'platform/reference/end-of-life',
        'platform/reference/get-resource-IDs',
      ],
    },
    {
      type: 'category',
      label: 'Integrations',
      className: 'expandedSection',
      collapsed: false,
      collapsible: false,
      items: [
        'platform/concepts/service-integration',
        'platform/howto/create-service-integration',
        {
          type: 'category',
          label: 'Bring your own cloud',
          link: {
            type: 'doc',
            id: 'platform/concepts/byoc',
          },
          items: [
            'platform/howto/byoc/networking-security',
            'platform/howto/byoc/enable-byoc',
            {
              type: 'category',
              label: 'Create custom clouds',
              link: {
                type: 'doc',
                id: 'platform/howto/byoc/create-cloud/create-custom-cloud',
              },
              items: [
                'platform/howto/byoc/create-cloud/create-aws-custom-cloud',
                'platform/howto/byoc/create-cloud/create-google-custom-cloud',
              ],
            },
            'platform/howto/byoc/assign-project-custom-cloud',
            'platform/howto/byoc/add-customer-info-custom-cloud',
            'platform/howto/byoc/tag-custom-cloud-resources',
            'platform/howto/byoc/rename-custom-cloud',
            'platform/howto/byoc/download-infrastructure-template',
            'platform/howto/byoc/delete-custom-cloud',
            'platform/howto/byoc/manage-byoc-service',
            'platform/howto/byoc/view-custom-cloud-status',
          ],
        },
        {
          type: 'category',
          label: 'Monitoring and logs',
          link: {
            type: 'doc',
            id: 'platform/howto/list-monitoring',
          },
          items: [
            {
              type: 'category',
              label: 'Amazon CloudWatch',
              link: {
                type: 'doc',
                id: 'integrations/cloudwatch',
              },
              items: [
                'integrations/cloudwatch/cloudwatch-metrics',
                {
                  type: 'category',
                  label: 'CloudWatch logs',

                  items: [
                    'integrations/cloudwatch/cloudwatch-logs-console',
                    'integrations/cloudwatch/cloudwatch-logs-cli',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Datadog',
              link: {
                type: 'doc',
                id: 'integrations/datadog',
              },
              items: [
                'integrations/datadog/datadog-metrics',
                'platform/howto/integrations/datadog-increase-metrics-limit',
                'integrations/datadog/datadog-logs',
                'integrations/datadog/add-custom-tags-to-datadog',
              ],
            },
            'integrations/send-logs-to-elasticsearch',
            'integrations/cloudlogging',
            {
              type: 'category',
              label: 'Remote Syslog',
              link: {
                type: 'doc',
                id: 'integrations/rsyslog',
              },
              items: [
                'integrations/rsyslog/logtail',
                'integrations/rsyslog/loggly',
              ],
            },
            'platform/howto/integrations/access-jmx-metrics-jolokia',

            {
              type: 'category',
              label: 'Prometheus',
              link: {
                id: 'platform/howto/integrations/prometheus-metrics',
                type: 'doc',
              },
              items: ['integrations/prometheus-system-metrics'],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Aiven dev tools',
      className: 'expandedSection',
      collapsed: false,
      collapsible: false,
      items: [
        'tools',
        'tools/api',
        {
          type: 'category',
          label: 'Aiven Provider for Terraform',
          link: {
            id: 'tools/terraform',
            type: 'doc',
          },
          items: [
            'tools/terraform/get-started',
            {
              type: 'category',
              label: 'Upgrade Aiven Provider',
              items: [
                'tools/terraform/howto/upgrade-provider-v1-v2',
                'tools/terraform/howto/upgrade-provider-v2-v3',
                'tools/terraform/howto/upgrade-provider-v3-v4',
              ],
            },
            'tools/terraform/howto/migrate-from-teams-to-groups',
            'tools/terraform/howto/upgrade-to-opensearch',
            {
              type: 'category',
              label: 'PostgreSQL',
              items: [
                'tools/terraform/howto/config-postgresql-provider',
                'tools/terraform/howto/promote-to-master-pg-rr',
              ],
            },
            'tools/terraform/howto/use-opentofu',
          ],
        },
        'tools/kubernetes',
        {
          type: 'category',
          label: 'Aiven CLI',
          link: {
            id: 'tools/cli',
            type: 'doc',
          },
          items: [
            'tools/cli/billing-group',
            'tools/cli/byoc',
            'tools/cli/cloud',
            'tools/cli/credits',
            'tools/cli/events',
            'tools/cli/mirrormaker',
            {
              type: 'category',
              label: 'avn service',
              link: {
                id: 'tools/cli/service-cli',
                type: 'doc',
              },
              items: [
                'tools/cli/service/acl',
                'tools/cli/service/alloydbomni',
                'tools/cli/service/connection-info',
                'tools/cli/service/connection-pool',
                'tools/cli/service/connector',
                'tools/cli/service/database',
                'tools/cli/service/es-acl',
                'tools/cli/service/flink',
                'tools/cli/service/integration',
                'tools/cli/service/kafka-acl',
                'tools/cli/service/m3',
                'tools/cli/service/privatelink',
                'tools/cli/service/schema-registry-acl',
                'tools/cli/service/service-index',
                'tools/cli/service/tags',
                'tools/cli/service/topic',
                'tools/cli/service/user',
              ],
            },
            {
              type: 'category',
              label: 'avn user',
              link: {
                id: 'tools/cli/user',
                type: 'doc',
              },
              items: ['tools/cli/user/user-access-token'],
            },
            'tools/cli/vpc',
          ],
        },
        'tools/query-optimizer',
      ],
    },
    {
      type: 'category',
      label: 'Services',
      collapsed: false,
      collapsible: false,
      className: 'expandedSection',
      items: [
        'products/services',
        {
          type: 'category',
          label: 'Aiven for AlloyDB Omni',
          link: {
            id: 'products/alloydbomni',
            type: 'doc',
          },
          items: [
            'products/alloydbomni/get-started',
            {
              type: 'category',
              label: 'Connect to service',
              link: {
                type: 'doc',
                id: 'products/alloydbomni/connect/connect-services',
              },
              items: [
                'products/alloydbomni/connect/connect-go',
                'products/alloydbomni/connect/connect-node',
                'products/alloydbomni/connect/connect-php',
                'products/alloydbomni/connect/connect-python',
                'products/alloydbomni/connect/connect-java',
                'products/alloydbomni/connect/connect-psql',
                'products/alloydbomni/connect/connect-pgadmin',
                'products/alloydbomni/connect/connect-datagrip',
                'products/alloydbomni/connect/connect-dbeaver',
                'products/alloydbomni/connect/connect-rivery',
                'products/alloydbomni/connect/connect-skyvia',
                'products/alloydbomni/connect/connect-zapier',
              ],
            },
            'products/alloydbomni/use-columnar-engine',
            'products/alloydbomni/manage-credentials',
            'products/alloydbomni/access-ai-models',
            'products/alloydbomni/advanced-params',
          ],
        },
        {
          type: 'category',
          label: 'Aiven for Apache Cassandra®',
          link: {
            type: 'doc',
            id: 'products/cassandra',
          },
          items: [
            'products/cassandra/get-started',
            {
              type: 'category',
              label: 'Concepts',
              items: [
                'products/cassandra/concepts/tombstones',
                'products/cassandra/concepts/cross-cluster-replication',
              ],
            },
            {
              type: 'category',
              label: 'How to',
              items: [
                {
                  type: 'category',
                  label: 'Connect to service',
                  link: {
                    type: 'generated-index',
                    slug: 'products/cassandra/howto/list-code-samples',
                  },
                  items: [
                    'products/cassandra/howto/connect-cqlsh-cli',
                    'products/cassandra/howto/connect-python',
                    'products/cassandra/howto/connect-go',
                  ],
                },
                {
                  type: 'category',
                  label: 'Manage service',
                  items: [
                    'products/cassandra/howto/use-dsbulk-with-cassandra',
                    'products/cassandra/howto/use-nosqlbench-with-cassandra',
                    'products/cassandra/howto/zdm-proxy',
                  ],
                },
                'products/cassandra/howto/list-manage-cluster',
                {
                  type: 'category',
                  label: 'Cross-cluster replication',
                  link: {
                    type: 'doc',
                    id: 'products/cassandra/howto/list-cross-cluster-replication',
                  },
                  items: [
                    'products/cassandra/howto/enable-cross-cluster-replication',
                    'products/cassandra/howto/manage-cross-cluster-replication',
                    'products/cassandra/howto/disable-cross-cluster-replication',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Reference',
              items: [
                'products/cassandra/reference/advanced-params',
                'products/cassandra/reference/cassandra-metrics-prometheus',
                'products/cassandra/reference/cassandra-metrics-datadog',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Aiven for Apache Flink®',
          link: {
            type: 'doc',
            id: 'products/flink',
          },
          items: [
            'products/flink/get-started',
            'products/flink/reference/plans-pricing',
            {
              type: 'category',
              label: 'Concepts',
              items: [
                'products/flink/concepts/flink-architecture',
                'products/flink/reference/flink-limitations',
                'products/flink/concepts/flink-applications',
                'products/flink/concepts/supported-syntax-sql-editor',
                'products/flink/concepts/custom-jars',
                'products/flink/concepts/tables',
                'products/flink/concepts/checkpoints',
                'products/flink/concepts/savepoints',
                'products/flink/concepts/event-processing-time',
                'products/flink/concepts/watermarks',
                'products/flink/concepts/windows',
                'products/flink/concepts/kafka-connectors',
                'products/flink/concepts/kafka-connector-requirements',
              ],
            },
            {
              type: 'category',
              label: 'How to',
              items: [
                {
                  type: 'category',
                  label: 'Integrate service',
                  items: [
                    'products/flink/howto/create-integration',
                    'products/flink/howto/ext-kafka-flink-integration',
                    'products/flink/howto/connect-bigquery',
                  ],
                },
                {
                  type: 'category',
                  label: 'Aiven for Apache Flink applications',
                  link: {
                    type: 'doc',
                    id: 'products/flink/howto/create-flink-applications',
                  },
                  items: [
                    'products/flink/howto/create-sql-application',
                    'products/flink/howto/create-jar-application',
                    'products/flink/howto/manage-flink-applications',
                    'products/flink/howto/restart-strategy-jar-applications',
                    'products/flink/howto/manage-credentials-jars',
                  ],
                },
                {
                  type: 'category',
                  label: 'Apache Flink tables',
                  items: [
                    {
                      type: 'category',
                      label: 'Create tables with data source',
                      items: [
                        'products/flink/howto/connect-kafka',
                        'products/flink/howto/flink-confluent-avro',
                        'products/flink/howto/connect-pg',
                        'products/flink/howto/connect-opensearch',
                        'products/flink/howto/pg-cdc-connector',
                        'products/flink/howto/slack-connector',
                        'products/flink/howto/datagen-connector',
                      ],
                    },
                    'products/flink/howto/manage-flink-tables',
                  ],
                },
                'products/flink/howto/list-manage-cluster',
                'products/flink/howto/upgrade-flink-version',
                {
                  type: 'category',
                  label: 'Advanced topics',
                  items: ['products/flink/howto/timestamps_opensearch'],
                },
              ],
            },
            {
              type: 'category',
              label: 'Reference',
              items: ['products/flink/reference/advanced-params'],
            },
          ],
        },
        {
          type: 'category',
          label: 'Aiven for Apache Kafka®',
          link: {
            id: 'products/kafka',
            type: 'doc',
          },
          items: [
            'products/kafka/get-started',
            'products/kafka/howto/fake-sample-data',
            {
              type: 'category',
              label: 'Concepts',
              link: {
                type: 'doc',
                id: 'products/kafka/concepts',
              },
              items: [
                'products/kafka/concepts/upgrade-procedure',
                'products/kafka/concepts/horizontal-vertical-scaling',
                'products/kafka/concepts/acl',
                'products/kafka/concepts/schema-registry-authorization',
                'products/kafka/concepts/kafka-rest-api',
                'products/kafka/concepts/log-compaction',
                'products/kafka/concepts/partition-segments',
                'products/kafka/concepts/auth-types',
                'products/kafka/concepts/non-leader-for-partition',
                'products/kafka/concepts/configuration-backup',
                'products/kafka/concepts/monitor-consumer-group',
                'products/kafka/concepts/consumer-lag-predictor',
                'products/kafka/concepts/kafka-quotas',
                'products/kafka/concepts/follower-fetching',
                'products/kafka/concepts/topic-catalog-overview',
                'products/kafka/concepts/governance-overview',
                {
                  type: 'category',
                  label: 'Tiered storage',
                  link: {
                    type: 'doc',
                    id: 'products/kafka/concepts/kafka-tiered-storage',
                  },
                  items: [
                    'products/kafka/concepts/tiered-storage-how-it-works',
                    'products/kafka/concepts/tiered-storage-guarantees',
                    'products/kafka/concepts/tiered-storage-limitations',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'How to',
              items: [
                {
                  type: 'category',
                  label: 'Connect to service',
                  link: {
                    type: 'generated-index',
                    slug: 'products/kafka/howto/list-code-samples',
                  },
                  items: [
                    'products/kafka/howto/connect-with-python',
                    'products/kafka/howto/connect-with-java',
                    'products/kafka/howto/connect-with-go',
                    'products/kafka/howto/connect-with-command-line',
                    'products/kafka/howto/connect-with-nodejs',
                  ],
                },
                {
                  type: 'category',
                  label: 'Tools',
                  items: [
                    'products/kafka/howto/kafka-tools-config-file',
                    'products/kafka/howto/kcat',
                    'products/kafka/howto/kafka-conduktor',
                    'products/kafka/howto/kafdrop',
                    'products/kafka/howto/provectus-kafka-ui',
                    'products/kafka/howto/kpow',
                    'products/kafka/howto/kafka-klaw',
                    'products/kafka/howto/kafka-quix',
                  ],
                },
                {
                  type: 'category',
                  label: 'Security',
                  items: [
                    'products/kafka/howto/keystore-truststore',
                    'products/kafka/howto/manage-acls',
                    'products/kafka/howto/monitor-logs-acl-failure',
                    'products/kafka/howto/kafka-sasl-auth',
                    'products/kafka/howto/renew-ssl-certs',
                    'products/kafka/howto/enable-oidc',
                    'products/kafka/howto/kafka-custom-serde-encrypt',
                  ],
                },
                {
                  type: 'category',
                  label: 'Administrative tasks',
                  items: [
                    'products/kafka/howto/add-manage-service-users',
                    'products/kafka/howto/enable-schema-registry',
                    'products/kafka/howto/configure-with-kafka-cli',
                    'products/kafka/howto/set-kafka-parameters',
                    'products/kafka/howto/viewing-resetting-offset',
                    'products/kafka/howto/configure-log-cleaner',
                    'products/kafka/howto/prevent-full-disks',
                    'products/kafka/howto/optimizing-resource-usage',
                    'products/kafka/howto/enabled-consumer-lag-predictor',
                    'products/kafka/howto/manage-quotas',
                    'products/kafka/howto/enable-follower-fetching',
                    'products/kafka/howto/best-practices',
                    'products/kafka/howto/avoid-out-of-memory-error',
                  ],
                },
                {
                  type: 'category',
                  label: 'Integrations',
                  items: [
                    'products/kafka/howto/integrate-service-logs-into-kafka-topic',
                    'products/kafka/howto/kafka-streams-with-aiven-for-kafka',
                    'products/kafka/howto/flink-with-aiven-for-kafka',
                    'products/kafka/howto/datadog-customised-metrics',
                    'products/kafka/howto/kafka-prometheus-privatelink',
                    'products/kafka/howto/ksql-docker',
                    'products/kafka/howto/add-missing-producer-consumer-metrics',
                  ],
                },
                {
                  type: 'category',
                  label: 'Topic and schema management',
                  items: [
                    'products/kafka/howto/create-topic',
                    'products/kafka/howto/create-topics-automatically',
                    'products/kafka/howto/get-topic-partition-details',
                    'products/kafka/howto/schema-registry',
                    'products/kafka/howto/change-retention-period',
                    {
                      type: 'category',
                      label: 'Manage topic catalog',
                      link: {
                        type: 'doc',
                        id: 'products/kafka/howto/view-kafka-topic-catalog',
                      },
                      items: ['products/kafka/howto/manage-topics-details'],
                    },
                  ],
                },
                {
                  type: 'category',
                  label: 'Governance',
                  link: {
                    type: 'doc',
                    id: 'products/kafka/howto/governance',
                  },
                  items: [
                    'products/kafka/howto/enable-governance',
                    'products/kafka/howto/claim-topic',
                    {
                      type: 'category',
                      label: 'Manage topic requests',
                      link: {
                        type: 'doc',
                        id: 'products/kafka/howto/manage-resource-requests',
                      },
                      items: [
                        'products/kafka/howto/approvals',
                        'products/kafka/howto/group-requests',
                      ],
                    },
                  ],
                },
                {
                  type: 'category',
                  label: 'Tiered storage',
                  link: {
                    type: 'doc',
                    id: 'products/kafka/howto/kafka-tiered-storage-get-started',
                  },
                  items: [
                    'products/kafka/howto/enable-kafka-tiered-storage',
                    'products/kafka/howto/configure-topic-tiered-storage',
                    'products/kafka/howto/tiered-storage-overview-page',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Reference',
              items: [
                'products/kafka/reference/advanced-params',
                'products/kafka/reference/kafka-metrics-prometheus',
              ],
            },
            {
              type: 'category',
              label: 'Troubleshooting',
              items: [
                'products/kafka/troubleshooting/troubleshoot-consumer-disconnections',
              ],
            },
            {
              type: 'category',
              label: 'Apache Kafka Connect',
              link: {
                type: 'doc',
                id: 'products/kafka/kafka-connect',
              },
              items: [
                'products/kafka/kafka-connect/get-started',
                {
                  type: 'category',
                  label: 'Concepts',
                  items: [
                    'products/kafka/kafka-connect/concepts/list-of-connector-plugins',
                    'products/kafka/kafka-connect/concepts/jdbc-source-modes',
                    'products/kafka/kafka-connect/concepts/connect-plugin-list-not-available',
                  ],
                },
                {
                  type: 'category',
                  label: 'How to',
                  items: [
                    {
                      type: 'category',
                      label: 'Administration tasks',
                      items: [
                        'products/kafka/kafka-connect/howto/best-practices',
                        'products/kafka/kafka-connect/howto/bring-your-own-kafka-connect-cluster',
                        'products/kafka/kafka-connect/howto/enable-connect',
                        'products/kafka/kafka-connect/howto/enable-automatic-restart',
                        'products/kafka/kafka-connect/howto/manage-logging-level',
                        'products/kafka/kafka-connect/howto/request-new-connector',
                        {
                          type: 'category',
                          label: 'Configure secret providers',
                          link: {
                            type: 'doc',
                            id: 'products/kafka/kafka-connect/howto/configure-secret-providers',
                          },
                          items: [
                            'products/kafka/kafka-connect/howto/configure-aws-secrets-manager',
                            'products/kafka/kafka-connect/howto/configure-hashicorp-vault',
                          ],
                        },
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Source connectors',
                      items: [
                        'products/kafka/kafka-connect/howto/jdbc-source-connector-pg',
                        'products/kafka/kafka-connect/howto/debezium-source-connector-pg',
                        'products/kafka/kafka-connect/howto/kafka-connect-debezium-tls-pg',
                        'products/kafka/kafka-connect/howto/jdbc-source-connector-mysql',
                        'products/kafka/kafka-connect/howto/debezium-source-connector-mysql',
                        'products/kafka/kafka-connect/howto/jdbc-source-connector-sql-server',
                        'products/kafka/kafka-connect/howto/debezium-source-connector-sql-server',
                        'products/kafka/kafka-connect/howto/mongodb-poll-source-connector',
                        'products/kafka/kafka-connect/howto/debezium-source-connector-pg-node-replacement',
                        'products/kafka/kafka-connect/howto/debezium-source-connector-mongodb',
                        'products/kafka/kafka-connect/howto/cassandra-streamreactor-source',
                        'products/kafka/kafka-connect/howto/mqtt-source-connector',
                        'products/kafka/kafka-connect/howto/gcp-pubsub-source',
                        'products/kafka/kafka-connect/howto/gcp-pubsub-lite-source',
                        'products/kafka/kafka-connect/howto/couchbase-source',
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Sink connectors',
                      items: [
                        'products/kafka/kafka-connect/howto/azure-blob-sink',
                        'products/kafka/kafka-connect/howto/cassandra-streamreactor-sink',
                        'products/kafka/kafka-connect/howto/clickhouse-sink-connector',
                        'products/kafka/kafka-connect/howto/couchbase-sink',
                        'products/kafka/kafka-connect/howto/elasticsearch-sink',
                        'products/kafka/kafka-connect/howto/gcp-bigquery-sink-prereq',
                        'products/kafka/kafka-connect/howto/gcp-bigquery-sink',
                        'products/kafka/kafka-connect/howto/gcp-pubsub-lite-sink',
                        'products/kafka/kafka-connect/howto/gcp-pubsub-sink',
                        'products/kafka/kafka-connect/howto/gcs-sink-prereq',
                        'products/kafka/kafka-connect/howto/gcs-sink',
                        'products/kafka/kafka-connect/howto/http-sink',
                        'products/kafka/kafka-connect/howto/ibm-mq-sink-connector',
                        'products/kafka/kafka-connect/howto/influx-sink',
                        'products/kafka/kafka-connect/howto/jdbc-sink',
                        'products/kafka/kafka-connect/howto/mongodb-sink-lenses',
                        'products/kafka/kafka-connect/howto/mongodb-sink-mongo',
                        'products/kafka/kafka-connect/howto/mqtt-sink-connector',
                        'products/kafka/kafka-connect/howto/opensearch-sink',
                        'products/kafka/kafka-connect/howto/redis-streamreactor-sink',
                        'products/kafka/kafka-connect/howto/s3-iam-assume-role',
                        'products/kafka/kafka-connect/howto/s3-sink-connector-aiven',
                        'products/kafka/kafka-connect/howto/s3-sink-connector-confluent',
                        'products/kafka/kafka-connect/howto/s3-sink-prereq',
                        'products/kafka/kafka-connect/howto/snowflake-sink-prereq',
                        'products/kafka/kafka-connect/howto/snowflake-sink',
                        'products/kafka/kafka-connect/howto/splunk-sink',
                      ],
                    },
                  ],
                },
                {
                  type: 'category',
                  label: 'Reference',
                  items: [
                    'products/kafka/kafka-connect/reference/advanced-params',
                    {
                      type: 'category',
                      label: 'AWS S3 sink connector naming and data formats',
                      link: {
                        type: 'doc',
                        id: 'products/kafka/kafka-connect/reference/s3-sink-formats',
                      },
                      items: [
                        'products/kafka/kafka-connect/reference/s3-sink-additional-parameters',
                        'products/kafka/kafka-connect/reference/s3-sink-additional-parameters-confluent',
                      ],
                    },
                    'products/kafka/kafka-connect/reference/gcs-sink-formats',
                    'products/kafka/kafka-connect/reference/connect-metrics-prometheus',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Apache Kafka Mirrormaker 2',
              link: {
                type: 'doc',
                id: 'products/kafka/kafka-mirrormaker',
              },
              items: [
                'products/kafka/kafka-mirrormaker/get-started',
                {
                  type: 'category',
                  label: 'Concepts',
                  items: [
                    {
                      type: 'category',
                      label: 'Disaster recovery and migration',
                      link: {
                        type: 'doc',
                        id: 'products/kafka/kafka-mirrormaker/concepts/disaster-recovery-migration',
                      },
                      items: [
                        'products/kafka/kafka-mirrormaker/concepts/disaster-recovery/active-active-setup',
                        'products/kafka/kafka-mirrormaker/concepts/disaster-recovery/active-passive-setup',
                      ],
                    },
                    'products/kafka/kafka-mirrormaker/concepts/replication-flow-topics-regex',
                    'products/kafka/kafka-mirrormaker/concepts/mirrormaker2-tuning',
                  ],
                },
                {
                  type: 'category',
                  label: 'How to',
                  items: [
                    'products/kafka/kafka-mirrormaker/howto/integrate-external-kafka-cluster',
                    'products/kafka/kafka-mirrormaker/howto/setup-replication-flow',
                    'products/kafka/kafka-mirrormaker/howto/monitor-replication-execution',
                    'products/kafka/kafka-mirrormaker/howto/remove-mirrormaker-prefix',
                    'products/kafka/kafka-mirrormaker/howto/datadog-customised-metrics',
                    'products/kafka/kafka-mirrormaker/howto/log-analysis-offset-sync-tool',
                    'products/kafka/kafka-mirrormaker/howto/exactly-once-delivery',
                  ],
                },
                {
                  type: 'category',
                  label: 'Troubleshooting',
                  items: [
                    'products/kafka/kafka-mirrormaker/troubleshooting/topic-not-replicated',
                  ],
                },
                {
                  type: 'category',
                  label: 'Reference',
                  items: [
                    'products/kafka/kafka-mirrormaker/reference/advanced-params',
                    'products/kafka/kafka-mirrormaker/reference/known-issues',
                    'products/kafka/kafka-mirrormaker/reference/terminology',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Karapace',
              link: {
                type: 'doc',
                id: 'products/kafka/karapace',
              },
              items: [
                'products/kafka/karapace/get-started',
                {
                  type: 'category',
                  label: 'Concepts',
                  items: [
                    'products/kafka/karapace/concepts/schema-registry-authorization',
                    'products/kafka/karapace/concepts/acl-definition',
                    'products/kafka/karapace/concepts/kafka-rest-proxy-authorization',
                  ],
                },
                {
                  type: 'category',
                  label: 'How to',
                  items: [
                    'products/kafka/karapace/howto/enable-karapace',
                    'products/kafka/karapace/howto/enable-schema-registry-authorization',
                    'products/kafka/karapace/howto/enable-kafka-rest-proxy-authorization',
                    'products/kafka/karapace/howto/enable-oauth-oidc-kafka-rest-proxy',
                    'products/kafka/karapace/howto/manage-schema-registry-authorization',
                    'products/kafka/karapace/howto/enable-schema-reader-strict-mode',
                  ],
                },
              ],
            },
          ],
        },

        {
          type: 'category',
          label: 'Aiven for Caching',
          link: {
            id: 'products/caching',
            type: 'doc',
          },
          items: [
            'products/caching/get-started',

            {
              type: 'category',
              label: 'Concepts',
              items: [
                'products/caching/concepts/high-availability-redis',
                'products/caching/concepts/lua-scripts-caching',
                'products/caching/concepts/memory-usage',
                'products/caching/concepts/restricted-redis-commands',
              ],
            },
            {
              type: 'category',
              label: 'How to',
              items: [
                {
                  type: 'category',
                  label: 'Connect to service',
                  link: {
                    type: 'doc',
                    id: 'products/caching/howto/list-code-samples',
                  },
                  items: [
                    'products/caching/howto/connect-redis-cli',
                    'products/caching/howto/connect-go',
                    'products/caching/howto/connect-node',
                    'products/caching/howto/connect-php',
                    'products/caching/howto/connect-python',
                    'products/caching/howto/connect-java',
                  ],
                },
                {
                  type: 'category',
                  label: 'Administer database',
                  items: ['products/caching/howto/configure-acl-permissions'],
                },
                {
                  type: 'category',
                  label: 'Data migration',
                  items: [
                    'products/caching/howto/migrate-redis-aiven-cli',
                    'products/caching/howto/migrate-redis-aiven-via-console',
                  ],
                },
                'products/caching/howto/estimate-max-number-of-connections',
                'products/caching/howto/manage-ssl-connectivity',
                'products/caching/howto/warning-overcommit_memory',
                'products/caching/howto/benchmark-performance',
                'products/caching/howto/upgrade-aiven-for-caching-to-valkey',
              ],
            },
            {
              type: 'category',
              label: 'Reference',
              items: ['products/caching/reference/advanced-params'],
            },
            {
              type: 'category',
              label: 'Troubleshooting',
              items: [
                'products/caching/troubleshooting/troubleshoot-redis-connection-issues',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Aiven for ClickHouse®',
          link: {
            type: 'doc',
            id: 'products/clickhouse',
          },
          items: [
            'products/clickhouse/get-started',
            'products/clickhouse/reference/plans-pricing',
            {
              type: 'category',
              label: 'Concepts',
              items: [
                'products/clickhouse/concepts/service-architecture',
                'products/clickhouse/reference/limitations',
                'products/clickhouse/concepts/olap',
                'products/clickhouse/concepts/columnar-databases',
                'products/clickhouse/concepts/indexing',
                'products/clickhouse/concepts/disaster-recovery',
                'products/clickhouse/concepts/strings',
                'products/clickhouse/concepts/federated-queries',
                'products/clickhouse/concepts/clickhouse-tiered-storage',
                'products/clickhouse/concepts/data-integration-overview',
              ],
            },
            {
              type: 'category',
              label: 'How to',
              items: [
                {
                  type: 'category',
                  label: 'Connect to service',
                  link: {
                    type: 'doc',
                    id: 'products/clickhouse/howto/list-connect-to-service',
                  },
                  items: [
                    'products/clickhouse/howto/connect-with-clickhouse-cli',
                    'products/clickhouse/howto/connect-with-go',
                    'products/clickhouse/howto/connect-with-python',
                    'products/clickhouse/howto/connect-with-nodejs',
                    'products/clickhouse/howto/connect-with-php',
                    'products/clickhouse/howto/connect-with-java',
                  ],
                },
                {
                  type: 'category',
                  label: 'Manage service',
                  items: [
                    'products/clickhouse/howto/secure-service',
                    'products/clickhouse/howto/restore-backup',
                    'products/clickhouse/howto/manage-users-roles',
                    'products/clickhouse/howto/manage-databases-tables',
                    'products/clickhouse/howto/query-databases',
                    'products/clickhouse/howto/materialized-views',
                    'products/clickhouse/howto/monitor-performance',
                    'products/clickhouse/howto/use-shards-with-distributed-table',
                    'products/clickhouse/howto/copy-data-across-instances',
                    'products/clickhouse/howto/fetch-query-statistics',
                    'products/clickhouse/howto/run-federated-queries',
                    'products/clickhouse/howto/create-dictionary',
                    'products/clickhouse/howto/sql-user-defined-functions',
                    'products/clickhouse/howto/clickhouse-query-cache',
                  ],
                },
                'products/clickhouse/howto/list-manage-cluster',
                {
                  type: 'category',
                  label: 'Integrate service',
                  link: {
                    type: 'doc',
                    id: 'products/clickhouse/howto/list-integrations',
                  },
                  items: [
                    'products/clickhouse/howto/connect-to-grafana',
                    'products/clickhouse/howto/integrate-kafka',
                    'products/clickhouse/howto/integrate-postgresql',
                    'products/clickhouse/howto/data-service-integration',
                    'products/clickhouse/howto/integration-databases',
                    'products/clickhouse/howto/connect-with-jdbc',
                  ],
                },
                {
                  type: 'category',
                  label: 'Tiered storage',
                  link: {
                    type: 'doc',
                    id: 'products/clickhouse/howto/list-tiered-storage',
                  },
                  items: [
                    'products/clickhouse/howto/enable-tiered-storage',
                    'products/clickhouse/howto/configure-tiered-storage',
                    'products/clickhouse/howto/check-data-tiered-storage',
                    'products/clickhouse/howto/transfer-data-tiered-storage',
                    'products/clickhouse/howto/local-cache-tiered-storage',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Reference',
              items: [
                'products/clickhouse/reference/supported-table-engines',
                'products/clickhouse/reference/supported-interfaces-drivers',
                'products/clickhouse/reference/metrics-list',
                'products/clickhouse/reference/clickhouse-metrics-datadog',
                'products/clickhouse/reference/clickhouse-metrics-prometheus',
                'products/clickhouse/reference/supported-table-functions',
                'products/clickhouse/reference/s3-supported-file-formats',
                'products/clickhouse/reference/supported-input-output-formats',
                'products/clickhouse/reference/advanced-params',
                'products/clickhouse/reference/clickhouse-system-tables',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Aiven for Dragonfly',
          link: {
            type: 'doc',
            id: 'products/dragonfly',
          },
          items: [
            'products/dragonfly/get-started',
            'products/dragonfly/concepts/ha-dragonfly',
            {
              type: 'category',
              label: 'How to',
              items: [
                {
                  type: 'category',
                  label: 'Connect to service',
                  link: {
                    type: 'doc',
                    id: 'products/dragonfly/howto/list-code-samples',
                  },
                  items: [
                    'products/dragonfly/howto/connect-redis-cli',
                    'products/dragonfly/howto/connect-go',
                    'products/dragonfly/howto/connect-node',
                    'products/dragonfly/howto/connect-python',
                  ],
                },
                {
                  type: 'category',
                  label: 'Data migration',
                  items: [
                    'products/dragonfly/howto/migrate-aiven-caching-df-console',
                    'products/dragonfly/howto/migrate-ext-redis-df-console',
                  ],
                },
                'products/dragonfly/howto/eviction-policy-df',
                'products/dragonfly/howto/compatibility-redisjson',
              ],
            },
            {
              type: 'category',
              label: 'Reference',
              items: ['products/dragonfly/reference/advanced-params'],
            },
          ],
        },
        {
          type: 'category',
          label: 'Aiven for Grafana®',
          link: {
            type: 'doc',
            id: 'products/grafana',
          },
          items: [
            'products/grafana/get-started',
            'products/grafana/reference/plans-pricing',
            {
              type: 'category',
              label: 'How to',
              items: [
                {
                  type: 'category',
                  label: 'User access',
                  items: [
                    'products/grafana/howto/log-in',
                    'products/grafana/howto/rotating-grafana-service-credentials',
                    'products/grafana/howto/oauth-configuration',
                  ],
                },
                {
                  type: 'category',
                  label: 'Manage dashboards',
                  items: [
                    'products/grafana/howto/dashboard-previews',
                    'products/grafana/howto/replace-expression-string',
                  ],
                },
                'products/grafana/howto/send-emails',
                'products/grafana/howto/list-manage-cluster',
                'products/grafana/howto/pitr-process-for-grafana',
              ],
            },
            {
              type: 'category',
              label: 'Reference',
              items: [
                'products/grafana/reference/advanced-params',
                'products/grafana/reference/plugins',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Aiven for M3DB',
          link: {
            type: 'doc',
            id: 'products/m3db',
          },
          items: [
            'products/m3db/get-started',
            {
              type: 'category',
              label: 'Concepts',
              items: [
                'products/m3db/concepts/m3-components',
                'products/m3db/concepts/namespaces-aggregation',
                'products/m3db/concepts/scaling-m3',
              ],
            },
            {
              type: 'category',
              label: 'How to',
              link: {
                type: 'doc',
                id: 'products/m3db/howto',
              },
              items: [
                'products/m3db/howto/grafana',
                'products/m3db/howto/monitoring',
                'products/m3db/howto/prometheus-storage',
                'products/m3db/howto/telegraf',
                'products/m3db/howto/telegraf_local_example',
                'products/m3db/howto/write-go',
                'products/m3db/howto/write-php',
                'products/m3db/howto/write-python',
              ],
            },
            {
              type: 'category',
              label: 'Reference',
              link: {
                type: 'doc',
                id: 'products/m3db/reference',
              },
              items: [
                'products/m3db/reference/terminology',
                'products/m3db/reference/advanced-params',
                'products/m3db/reference/advanced-params-m3aggregator',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Aiven for Metrics',
          link: {
            type: 'doc',
            id: 'products/metrics',
          },
          items: [
            'products/metrics/get-started',
            'products/metrics/concepts/retention-rules',
            {
              type: 'category',
              label: 'Storage and usage',
              items: [
                'products/metrics/concepts/storage-resource-scaling',
                'products/metrics/howto/storage-usage',
              ],
            },
            {
              type: 'category',
              label: 'Data migration',
              items: [
                'products/metrics/howto/migrate-influxdb-thanos',
                'products/metrics/howto/migrate-m3db-thanos',
              ],
            },
            'products/metrics/howto/download-influxdb-data',
          ],
        },
        {
          type: 'category',
          label: 'Aiven for MySQL®',
          link: {
            type: 'doc',
            id: 'products/mysql',
          },
          items: [
            'products/mysql/get-started',
            {
              type: 'category',
              label: 'Concepts',
              items: [
                'products/mysql/concepts/max-number-of-connections',
                'products/mysql/concepts/mysql-backups',
                'products/mysql/concepts/mysql-memory-usage',
                'products/mysql/concepts/mysql-replication',
                'products/mysql/concepts/mysql-tuning-and-concurrency',
                'products/mysql/concepts/high-availability',
              ],
            },

            {
              type: 'category',
              label: 'How to',
              items: [
                {
                  type: 'category',
                  label: 'Connect to service',
                  link: {
                    type: 'doc',
                    id: 'products/mysql/howto/list-code-samples',
                  },
                  items: [
                    'products/mysql/howto/connect-from-cli',
                    'products/mysql/howto/connect-with-python',
                    'products/mysql/howto/connect-using-mysqlx-with-python',
                    'products/mysql/howto/connect-with-java',
                    'products/mysql/howto/connect-with-php',
                    'products/mysql/howto/connect-from-mysql-workbench',
                    'products/mysql/howto/connect-with-datagrip',
                    'products/mysql/howto/connect-with-dbeaver',
                  ],
                },
                {
                  type: 'category',
                  label: 'Database management',
                  items: [
                    'products/mysql/howto/create-database',
                    'products/mysql/howto/ai-insights',
                    'products/mysql/howto/create-remote-replica',
                    'products/mysql/howto/migrate-database-mysqldump',
                    'products/mysql/howto/disable-foreign-key-checks',
                    'products/mysql/howto/enable-slow-queries',
                    'products/mysql/howto/create-tables-without-primary-keys',
                    'products/mysql/howto/create-missing-primary-keys',
                    'products/mysql/howto/mysql-long-running-queries',
                  ],
                },
                {
                  type: 'category',
                  label: 'Data migration',
                  items: [
                    'products/mysql/howto/do-check-service-migration',
                    'products/mysql/howto/migrate-from-external-mysql',
                    'products/mysql/howto/migrate-db-to-aiven-via-console',
                  ],
                },
                {
                  type: 'category',
                  label: 'Disk space management',
                  items: [
                    'products/mysql/howto/prevent-disk-full',
                    'products/mysql/howto/reclaim-disk-space',
                    'products/mysql/howto/identify-disk-usage-issues',
                  ],
                },
                'products/mysql/howto/list-manage-cluster',
              ],
            },
            {
              type: 'category',
              label: 'Reference',
              items: [
                'products/mysql/reference/advanced-params',
                'products/mysql/reference/resource-capability',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Aiven for OpenSearch®',
          link: {
            type: 'doc',
            id: 'products/opensearch',
          },
          items: [
            'products/opensearch/get-started',
            'products/opensearch/reference/plans-pricing',
            'products/opensearch/howto/sample-dataset',
            {
              type: 'category',
              label: 'Concepts',
              items: [
                'products/opensearch/concepts/access_control',
                {
                  type: 'category',
                  label: 'Security',
                  link: {
                    type: 'doc',
                    id: 'products/opensearch/concepts/os-security',
                  },
                  items: [
                    'products/opensearch/concepts/opensearch-security-considerations',
                  ],
                },
                'products/opensearch/concepts/backups',
                {
                  type: 'category',
                  label: 'Indices',
                  link: {
                    type: 'doc',
                    id: 'products/opensearch/concepts/indices',
                  },
                  items: [
                    'products/opensearch/concepts/index-replication',
                    'products/opensearch/concepts/when-create-index',
                  ],
                },

                'products/opensearch/concepts/aggregations',
                'products/opensearch/concepts/high-availability-for-opensearch',
                'products/opensearch/concepts/opensearch-vs-elasticsearch',
                'products/opensearch/concepts/shards-number',
                'products/opensearch/concepts/cross-cluster-replication-opensearch',
              ],
            },
            {
              type: 'category',
              label: 'How to',
              items: [
                'products/opensearch/howto/control_access_to_content',
                {
                  type: 'category',
                  label: 'Connect with service',
                  link: {
                    id: 'products/opensearch/howto/list-connect-to-service',
                    type: 'doc',
                  },
                  items: [
                    'products/opensearch/howto/opensearch-with-curl',
                    'products/opensearch/howto/connect-with-nodejs',
                    'products/opensearch/howto/connect-with-python',
                  ],
                },
                {
                  type: 'category',
                  label: 'Data management',
                  items: [
                    'products/opensearch/howto/import-opensearch-data-elasticsearch-dump-to-aiven',
                    'products/opensearch/howto/import-opensearch-data-elasticsearch-dump-to-aws',
                    'products/opensearch/howto/migrating_elasticsearch_data_to_aiven',
                    {
                      type: 'category',
                      label: 'Migrate external snapshots',
                      link: {
                        type: 'doc',
                        id: 'products/opensearch/howto/migrate-external-snapshots-aiven-opensearch',
                      },
                      items: [
                        'products/opensearch/howto/migrate-snapshot-data-opensearch',
                        'products/opensearch/howto/migrate-ism-policies',
                        'products/opensearch/howto/migrate-opendistro-security-config-aiven',
                      ],
                    },
                  ],
                },
                {
                  type: 'category',
                  label: 'Search and aggregation',
                  link: {
                    id: 'products/opensearch/howto/list-search-service',
                    type: 'doc',
                  },
                  items: [
                    'products/opensearch/howto/opensearch-search-and-python',
                    'products/opensearch/howto/opensearch-and-nodejs',
                    'products/opensearch/howto/opensearch-aggregations-and-nodejs',
                  ],
                },
                {
                  type: 'category',
                  label: 'Manage OpenSearch Security',
                  link: {
                    id: 'products/opensearch/howto/list-opensearch-security',
                    type: 'doc',
                  },
                  items: [
                    'products/opensearch/howto/enable-opensearch-security',
                    'products/opensearch/howto/saml-sso-authentication',
                    'products/opensearch/howto/oidc-authentication',
                    'products/opensearch/howto/audit-logs',
                    'products/opensearch/howto/opensearch-dashboard-multi_tenancy',
                  ],
                },
                {
                  type: 'category',
                  label: 'Manage service',
                  items: [
                    'products/opensearch/howto/restore_opensearch_backup',
                    'products/opensearch/howto/set_index_retention_patterns',
                    'products/opensearch/howto/custom-dictionary-files',
                    'products/opensearch/howto/opensearch-alerting-api',
                    'products/opensearch/howto/handle-low-disk-space',
                    'products/opensearch/howto/resolve-shards-too-large',
                    'products/opensearch/howto/setup-cross-cluster-replication-opensearch',
                  ],
                },
                {
                  type: 'category',
                  label: 'Integrate service',
                  items: [
                    'products/opensearch/howto/opensearch-log-integration',
                    'products/opensearch/howto/integrate-with-grafana',
                  ],
                },
                'products/opensearch/howto/upgrade-clients-to-opensearch',
              ],
            },

            {
              type: 'category',
              label: 'Reference',
              items: [
                'products/opensearch/reference/plugins',
                'products/opensearch/reference/advanced-params',

                'products/opensearch/reference/restapi-limited-access',
                'products/opensearch/reference/low-space-watermarks',
                'products/opensearch/howto/os-metrics',
              ],
            },
            {
              type: 'category',
              label: 'OpenSearch Dashboards',
              link: {
                type: 'doc',
                id: 'products/opensearch/dashboards',
              },
              items: [
                'products/opensearch/dashboards/get-started',
                {
                  type: 'category',
                  label: 'How to',
                  items: [
                    'products/opensearch/dashboards/howto/dev-tools-usage-example',
                    'products/opensearch/dashboards/howto/opensearch-alerting-dashboard',
                    'products/opensearch/troubleshooting/troubleshooting-opensearch-dashboards',
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Aiven for PostgreSQL®',
          link: {
            type: 'doc',
            id: 'products/postgresql',
          },
          items: [
            'products/postgresql/get-started',
            {
              type: 'category',
              label: 'Concepts',
              items: [
                'products/postgresql/concepts/aiven-db-migrate',
                'products/postgresql/concepts/dba-tasks-pg',
                'products/postgresql/concepts/high-availability',
                'products/postgresql/concepts/pg-backups',
                'products/postgresql/concepts/pg-connection-pooling',
                'products/postgresql/concepts/pg-disk-usage',
                'products/postgresql/concepts/pg-shared-buffers',
                'products/postgresql/concepts/timescaledb',
                'products/postgresql/concepts/upgrade-failover',
                'products/postgresql/concepts/pgvector',
              ],
            },
            {
              type: 'category',
              label: 'How to',
              items: [
                'products/postgresql/howto/pagila',
                {
                  type: 'category',
                  label: 'Connect to service',
                  link: {
                    id: 'products/postgresql/howto/list-code-samples',
                    type: 'doc',
                  },
                  items: [
                    'products/postgresql/howto/connect-go',
                    'products/postgresql/howto/connect-java',
                    'products/postgresql/howto/connect-node',
                    'products/postgresql/howto/connect-php',
                    'products/postgresql/howto/connect-python',
                    'products/postgresql/howto/connect-psql',
                    'products/postgresql/howto/connect-pgadmin',
                    'products/postgresql/howto/connect-rivery',
                    'products/postgresql/howto/connect-skyvia',
                    'products/postgresql/howto/connect-zapier',
                    'products/postgresql/howto/connect-datagrip',
                    'products/postgresql/howto/connect-dbeaver',
                  ],
                },
                {
                  type: 'category',
                  label: 'Administer database',
                  items: [
                    'products/postgresql/howto/create-database',
                    'products/postgresql/howto/upgrade',
                    'products/postgresql/howto/manage-extensions',
                    'products/postgresql/howto/create-manual-backups',
                    'products/postgresql/howto/restore-backup',
                    'products/postgresql/howto/ai-insights',
                    'products/postgresql/howto/claim-public-schema-ownership',
                    'products/postgresql/howto/manage-pool',
                    'products/postgresql/howto/pgbouncer-stats',
                    'products/postgresql/howto/monitor-pgbouncer-with-datadog',
                    'products/postgresql/howto/use-dblink-extension',
                    'products/postgresql/howto/use-pg-repack-extension',
                    'products/postgresql/howto/use-pg-cron-extension',
                    'products/postgresql/howto/enable-jit',
                    'products/postgresql/howto/optimize-pg-slow-queries',
                    'products/postgresql/howto/identify-pg-slow-queries',
                    'products/postgresql/howto/pg-long-running-queries',
                    'products/postgresql/howto/check-avoid-transaction-id-wraparound',
                    'products/postgresql/howto/prevent-full-disk',
                    'products/postgresql/howto/use-pgvector',
                    'products/postgresql/howto/pg-object-size',
                    'products/postgresql/howto/readonly-user',
                  ],
                },
                {
                  type: 'category',
                  label: 'Migrate',
                  items: [
                    'products/postgresql/howto/migrate-cloud-region',
                    'products/postgresql/howto/migrate-db-to-aiven-via-console',
                    'products/postgresql/howto/migrate-aiven-db-migrate',
                    'products/postgresql/howto/migrate-pg-dump-restore',
                    'products/postgresql/howto/migrate-using-bucardo',
                    'products/postgresql/howto/run-aiven-db-migrate-python',
                  ],
                },
                {
                  type: 'category',
                  label: 'Replicate',
                  items: [
                    'products/postgresql/howto/create-read-replica',
                    'products/postgresql/howto/setup-logical-replication',
                    'products/postgresql/howto/logical-replication-aws-aurora',
                    'products/postgresql/howto/logical-replication-aws-rds',
                    'products/postgresql/howto/logical-replication-gcp-cloudsql',
                  ],
                },
                'products/postgresql/howto/list-manage-cluster',
                {
                  type: 'category',
                  label: 'Integrate',
                  items: [
                    'products/postgresql/howto/monitor-database-with-datadog',
                    'products/postgresql/howto/visualize-grafana',
                    'products/postgresql/howto/report-metrics-grafana',
                    'products/postgresql/howto/monitor-with-pgwatch2',
                    'products/postgresql/howto/datasource-integration',
                    'products/postgresql/howto/analyze-with-google-data-studio',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Troubleshooting',
              items: [
                'products/postgresql/troubleshooting/troubleshooting-connection-pooling',
                'products/postgresql/howto/repair-pg-index',
              ],
            },
            {
              type: 'category',
              label: 'Reference',
              items: [
                'products/postgresql/reference/advanced-params',
                'products/postgresql/reference/pg-connection-limits',
                'products/postgresql/reference/use-of-deprecated-tls-versions',
                'products/postgresql/reference/list-of-extensions',
                'products/postgresql/reference/idle-connections',
                'products/postgresql/reference/pg-metrics',
                'products/postgresql/reference/resource-capability',
                'products/postgresql/reference/log-formats-supported',
                'products/postgresql/reference/terminology',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Aiven for Valkey™',
          link: {
            id: 'products/valkey',
            type: 'doc',
          },
          items: [
            'products/valkey/get-started',
            {
              type: 'category',
              label: 'Connect to service',
              link: {
                type: 'doc',
                id: 'products/valkey/howto/connect-services',
              },
              items: [
                'products/valkey/howto/connect-valkey-cli',
                'products/valkey/howto/connect-go',
                'products/valkey/howto/connect-node',
                'products/valkey/howto/connect-php',
                'products/valkey/howto/connect-python',
                'products/valkey/howto/connect-java',
              ],
            },
            {
              type: 'category',
              label: 'Data migration',
              items: [
                'products/valkey/howto/migrate-caching-valkey-to-aiven-for-valkey',
              ],
            },
            {
              type: 'category',
              label: 'Read replica',
              link: {
                type: 'doc',
                id: 'products/valkey/concepts/read-replica',
              },
              items: [
                {
                  type: 'doc',
                  id: 'products/valkey/howto/create-valkey-read-replica',
                  label: 'Create read replica',
                },
              ],
            },
            {
              type: 'category',
              label: 'Reference',
              items: [
                'products/valkey/reference/advanced-params',
                'products/valkey/reference/valkey-metrics-in-prometheus',
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default sidebars;
