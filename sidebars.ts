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
        'tools/aiven-console',
        'platform/howto/support',
        'platform/reference/referrals',
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
                'platform/howto/view-organization-logs',
              ],
            },
            {
              type: 'category',
              label: 'Projects',
              items: [
                'platform/howto/manage-project',
                'platform/howto/technical-emails',
                'platform/howto/view-project-logs',
                'platform/howto/manage-unassigned-projects',
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
            'platform/concepts/service-pricing',
            'platform/concepts/tax-information',
            {
              type: 'category',
              label: 'Payment methods',
              items: [
                'platform/howto/manage-payment-card',
                'platform/howto/manage-bank-transfers',
                'marketplace-setup',
                'platform/howto/list-marketplace-payments',
              ],
            },
            {
              type: 'category',
              label: 'Billing groups',
              items: [
                'platform/howto/use-billing-groups',
                'platform/howto/manage-billing-addresses',
              ],
            },
            'platform/howto/download-invoices',
            'platform/howto/credits',
            'platform/howto/reactivate-suspended-project',
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
                'platform/concepts/discovered-organizations',
                'platform/howto/manage-groups',
              ],
            },
            {
              type: 'category',
              label: 'Permissions',
              items: [
                'platform/concepts/permissions',
                'platform/howto/manage-permissions',
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
            'platform/howto/unsafe-passwords',
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
            'platform/reference/change-password',
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
            'platform/howto/saml/rotate-scim-token',
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
          label: 'Networking and security',
          items: [
            'platform/concepts/cloud-security',
            'platform/reference/list_of_clouds',
            'platform/howto/migrate-services-cloud-region',
            'platform/concepts/availability-zones',
            'platform/concepts/enhanced-compliance-env',
            {
              type: 'category',
              label: 'Bring your own cloud',
              link: {
                type: 'doc',
                id: 'platform/concepts/byoc',
              },
              items: [
                'platform/concepts/byoc-enhanced-compliance',
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
                'platform/howto/byoc/aws-privatelink-byoc',
                'platform/howto/byoc/assign-project-custom-cloud',
                'platform/howto/byoc/add-customer-info-custom-cloud',
                'platform/howto/byoc/tag-custom-cloud-resources',
                'platform/howto/byoc/store-data',
                'platform/howto/byoc/rename-custom-cloud',
                'platform/howto/byoc/download-infrastructure-template',
                'platform/howto/byoc/delete-custom-cloud',
                'platform/howto/byoc/manage-byoc-service',
                'platform/howto/byoc/view-custom-cloud-status',
              ],
            },
            {
              type: 'category',
              label: 'VPCs',
              link: {
                type: 'doc',
                id: 'platform/concepts/vpcs',
              },
              items: [
                {
                  type: 'category',
                  label: 'Manage VPCs',
                  link: {
                    type: 'doc',
                    id: 'platform/howto/list-manage-vpc',
                  },
                  items: [
                    'platform/howto/manage-project-vpc',
                    'platform/howto/manage-organization-vpc',
                  ],
                },
                {
                  type: 'category',
                  label: 'Peer VPCs',
                  link: {
                    type: 'doc',
                    id: 'platform/howto/list-vpc-peering',
                  },
                  items: [
                    {
                      type: 'category',
                      label: 'Project VPC peering',
                      link: {
                        type: 'doc',
                        id: 'platform/howto/list-project-vpc-peering',
                      },
                      items: [
                        'platform/howto/vpc-peering-aws',
                        'platform/howto/vnet-peering-azure',
                        'platform/howto/vpc-peering-gcp',
                        'platform/howto/vpc-peering-upcloud',
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Organization VPC peering',
                      link: {
                        type: 'doc',
                        id: 'platform/howto/list-organization-vpc-peering',
                      },
                      items: [
                        'platform/howto/manage-org-vpc-peering-aws',
                        'platform/howto/manage-org-vpc-peering-azure',
                        'platform/howto/manage-org-vpc-peering-google',
                      ],
                    },
                  ],
                },
                'platform/howto/vpc-service-management',
                'platform/howto/google-cloud-functions',
                'platform/howto/public-access-in-vpc',
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
            'platform/howto/configure-project-base-port',
            'platform/concepts/tls-ssl-certificates',
            'platform/howto/bring-your-own-key',
            'platform/concepts/disaster-recovery-test-scenarios',
          ],
        },
        'platform/concepts/service-and-feature-releases',
        'platform/howto/feature-preview',
        'platform/reference/eol-for-major-versions',
        'platform/reference/end-of-life',
        'platform/reference/get-resource-IDs',
      ],
    },
  ],
  // Tools sidebar
  tools: [
    {
      type: 'category',
      label: 'Aiven dev tools',
      className: 'expandedSection',
      collapsed: false,
      collapsible: false,
      items: [
        'tools',
        'tools/api',
        'tools/mcp-server',
        {
          type: 'category',
          label: 'Aiven Provider for Terraform',
          link: {
            id: 'tools/terraform',
            type: 'doc',
          },
          items: ['tools/terraform/howto/use-opentofu'],
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
                'tools/cli/service/connection-info',
                'tools/cli/service/connection-pool',
                'tools/cli/service/connector',
                'tools/cli/service/database',
                'tools/cli/service/es-acl',
                'tools/cli/service/flink',
                'tools/cli/service/integration',
                'tools/cli/service/kafka-acl',
                'tools/cli/service/privatelink',
                'tools/cli/service/quota',
                'tools/cli/service/schema-registry-acl',
                'tools/cli/service/service-index',
                'tools/cli/service/tags',
                'tools/cli/service/topic',
                'tools/cli/service/user',
              ],
            },
            'tools/cli/user',
            'tools/cli/vpc',
          ],
        },
        'tools/query-optimizer',
        'tools/doc-diff-llms',
      ],
    },
  ],
  //Apps sidebar
  apps: [
    {
      type: 'category',
      label: 'Apps',
      collapsed: false,
      collapsible: false,
      className: 'expandedSection',
      items: [
        'products/aiven-apps',
        'products/apps/deploy-apps',
        {
          type: 'category',
          label: 'Manifest files',
          link: {
            type: 'doc',
            id: 'products/apps/manifest-files/manifests',
          },
          items: [
            'products/apps/manifest-files/compose-files',
            'products/apps/manifest-files/containerfiles',
          ],
        },
        'products/apps/connect-services-to-apps',
        {
          type: 'category',
          label: 'Manage apps',
          items: [
            'products/apps/ports',
            'products/apps/secrets-and-variables',
            'products/apps/deployment-information',
            'products/apps/scale-apps',
            'products/apps/custom-domain-for-apps',
          ],
        },
      ],
    },
  ],

  //Services sidebar
  services: [
    {
      type: 'category',
      label: 'Services',
      collapsed: false,
      collapsible: false,
      className: 'expandedSection',
      items: [
        'products/services',
        'platform/howto/search-services',
        {
          type: 'category',
          label: 'Aiven for Apache Flink®',
          link: {
            type: 'doc',
            id: 'products/flink',
          },
          items: [
            'products/flink/get-started',
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
            'products/kafka/inkless-overview',
            {
              type: 'category',
              label: 'Get started',
              link: {
                type: 'doc',
                id: 'products/kafka/get-started/get-started-kafka',
              },
              items: [
                {
                  type: 'category',
                  label: 'Free tier',
                  link: {
                    type: 'doc',
                    id: 'products/kafka/free-tier/kafka-free-tier',
                  },
                  items: [
                    'products/kafka/free-tier/create-free-tier-kafka-service',
                  ],
                },
                {
                  type: 'category',
                  label: 'Developer tier',
                  link: {
                    type: 'doc',
                    id: 'products/kafka/dev-tier/kafka-dev-tier',
                  },
                  items: [
                    'products/kafka/dev-tier/create-dev-tier-kafka-service',
                  ],
                },
                {
                  type: 'category',
                  label: 'Create Kafka service',
                  link: {
                    type: 'doc',
                    id: 'products/kafka/get-started/create-kafka-service',
                  },
                  items: [
                    'products/kafka/get-started/create-inkless-service',
                    'products/kafka/get-started/create-classic-kafka-service',
                  ],
                },
                {
                  type: 'category',
                  label: 'Generate sample data',
                  link: {
                    type: 'doc',
                    id: 'products/kafka/howto/generate-sample-data',
                  },
                  items: ['products/kafka/howto/generate-sample-data-manually'],
                },
                'products/kafka/howto/set-up-kafka-with-skills',
              ],
            },
            {
              type: 'category',
              label: 'Concepts',
              link: {
                type: 'doc',
                id: 'products/kafka/concepts',
              },
              items: [
                {
                  type: 'category',
                  label: 'Core concepts',
                  items: [
                    'products/kafka/concepts/partition-segments',
                    'products/kafka/concepts/log-compaction',
                    'products/kafka/concepts/auth-types',
                    'products/kafka/concepts/acl',
                    'products/kafka/concepts/audit-logging',
                    'products/kafka/concepts/schema-registry-authorization',
                    'products/kafka/concepts/kafka-rest-api',
                    'products/kafka/concepts/kraft-mode',
                  ],
                },
                {
                  type: 'category',
                  label: 'Diskless topics',
                  link: {
                    type: 'doc',
                    id: 'products/kafka/diskless/concepts/diskless-topic-overview',
                  },
                  items: [
                    'products/kafka/diskless/concepts/diskless-topics-architecture',
                    'products/kafka/diskless/concepts/topics-vs-classic',
                    'products/kafka/diskless/concepts/batching-and-delivery',
                    'products/kafka/diskless/concepts/partitions-and-objects',
                    'products/kafka/diskless/concepts/limitations',
                  ],
                },
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
                {
                  type: 'category',
                  label: 'Operating Kafka with Aiven',
                  items: [
                    'products/kafka/concepts/upgrade-procedure',
                    'products/kafka/concepts/horizontal-vertical-scaling',
                    'products/kafka/concepts/configuration-backup',
                    'products/kafka/concepts/monitor-consumer-group',
                    'products/kafka/concepts/consumer-lag-predictor',
                    'products/kafka/concepts/follower-fetching',
                  ],
                },

                'products/kafka/concepts/governance-overview',
                'products/kafka/concepts/kafka-quotas',
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
                    'products/kafka/howto/connect-with-cpp',
                    'products/kafka/howto/connect-with-command-line',
                    'products/kafka/howto/connect-with-kafka-rest',
                    'products/kafka/howto/connect-with-klaw',
                    'products/kafka/howto/connect-with-nodejs',
                  ],
                },
                {
                  type: 'category',
                  label: 'Tools',
                  items: [
                    'products/kafka/howto/kafka-tools-config-file',
                    'products/kafka/howto/kafbat-ui',
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
                  label: 'Network and Security',
                  items: [
                    'products/kafka/howto/keystore-truststore',
                    'products/kafka/howto/manage-acls',
                    'products/kafka/howto/configure-audit-logging',
                    'products/kafka/howto/monitor-logs-acl-failure',
                    'products/kafka/howto/kafka-sasl-auth',
                    'products/kafka/howto/renew-ssl-certs',
                    'products/kafka/howto/enable-oidc',
                    'products/kafka/howto/kafka-oauth2-aws-iam',
                    'products/kafka/howto/kafka-custom-serde-encrypt',
                    'products/kafka/howto/ipv6-client-connectivity',
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
                    'products/kafka/howto/configure-custom-domain',
                    'products/kafka/howto/viewing-resetting-offset',
                    'products/kafka/howto/configure-log-cleaner',
                    'products/kafka/howto/prevent-full-disks',
                    'products/kafka/howto/optimizing-resource-usage',
                    'products/kafka/howto/enabled-consumer-lag-predictor',
                    'products/kafka/howto/manage-quotas',
                    'products/kafka/howto/enable-follower-fetching',
                    'products/kafka/howto/configure-preferred-zones',
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
                    'products/kafka/howto/integrate-external-kafka-cluster',
                  ],
                },
                {
                  type: 'category',
                  label: 'Topic and schema management',
                  items: [
                    'products/kafka/howto/create-topic',
                    'products/kafka/diskless/howto/create-diskless-topics-automatically',
                    'products/kafka/howto/create-topics-automatically',
                    'products/kafka/howto/get-topic-partition-details',
                    'products/kafka/howto/switch-topic-to-diskless',
                    'products/kafka/howto/schema-registry',
                    {
                      type: 'category',
                      label: 'Generate Java classes from schemas',
                      link: {
                        type: 'doc',
                        id: 'products/kafka/howto/generate-java-classes-from-schemas',
                      },
                      items: [
                        'products/kafka/howto/generate-avro-java-classes',
                        'products/kafka/howto/generate-protobuf-java-classes',
                        'products/kafka/howto/generate-json-java-classes',
                      ],
                    },
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
                    'products/kafka/howto/terraform-governance-approvals',
                    {
                      type: 'category',
                      label: 'Manage topic requests',
                      link: {
                        type: 'doc',
                        id: 'products/kafka/howto/manage-resource-requests',
                      },
                      items: [
                        'products/kafka/howto/request-access-topic',
                        'products/kafka/howto/approvals',
                        'products/kafka/howto/group-requests',

                        'products/kafka/howto/rotate-credentials',
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
                    'products/kafka/howto/view-kafka-storage-in-console',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Reference',
              items: [
                {
                  type: 'category',
                  label: 'Advanced parameters',
                  link: {
                    type: 'doc',
                    id: 'products/kafka/reference/advanced-params-index',
                  },
                  items: [
                    'products/kafka/reference/advanced-params-free-tier',
                    'products/kafka/reference/advanced-params-dev-tier',
                    'products/kafka/reference/advanced-params',
                    'products/kafka/reference/advanced-params-inkless',
                  ],
                },
                'products/kafka/reference/kafka-metrics-prometheus',
              ],
            },
            {
              type: 'category',
              label: 'Troubleshooting',
              items: [
                'products/kafka/troubleshooting/troubleshoot-consumer-disconnections',
                'products/kafka/troubleshooting/non-leader-for-partition',
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
                        'products/kafka/kafka-connect/howto/manage-connector-versions',
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
                            'products/kafka/kafka-connect/howto/configure-azure-key-vault',
                            'products/kafka/kafka-connect/howto/configure-hashicorp-vault',
                            'products/kafka/kafka-connect/howto/configure-env-secret-provider',
                          ],
                        },
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Source connectors',
                      items: [
                        // A
                        'products/kafka/kafka-connect/howto/amqp-source-connector',
                        'products/kafka/kafka-connect/howto/s3-source-connector',
                        'products/kafka/kafka-connect/howto/azure-blob-source',

                        // C
                        'products/kafka/kafka-connect/howto/couchbase-source',

                        // D (group)
                        {
                          type: 'category',
                          label: 'Debezium',
                          items: [
                            'products/kafka/kafka-connect/howto/debezium-source-connector-mongodb',
                            'products/kafka/kafka-connect/howto/debezium-source-connector-mysql',
                            'products/kafka/kafka-connect/howto/debezium-source-connector-oracle',
                            'products/kafka/kafka-connect/howto/debezium-source-connector-pg',
                            'products/kafka/kafka-connect/howto/kafka-connect-debezium-tls-pg',
                            'products/kafka/kafka-connect/howto/debezium-source-connector-pg-node-replacement',
                            'products/kafka/kafka-connect/howto/debezium-source-connector-sql-server',
                          ],
                        },

                        // G
                        'products/kafka/kafka-connect/howto/gcp-pubsub-lite-source',
                        'products/kafka/kafka-connect/howto/gcp-pubsub-source',

                        // J (group)
                        {
                          type: 'category',
                          label: 'JDBC',
                          items: [
                            'products/kafka/kafka-connect/howto/jdbc-source-connector-mysql',
                            'products/kafka/kafka-connect/howto/jdbc-source-connector-pg',
                            'products/kafka/kafka-connect/howto/jdbc-source-connector-sql-server',
                          ],
                        },

                        // M
                        'products/kafka/kafka-connect/howto/mongodb-poll-source-connector',
                        'products/kafka/kafka-connect/howto/mqtt-source-connector',

                        // Salesforce
                        'products/kafka/kafka-connect/howto/salesforce-source-connector',

                        // Stream Reactor
                        {
                          type: 'category',
                          label: 'Stream Reactor',
                          items: [
                            'products/kafka/kafka-connect/howto/cassandra-streamreactor-source',
                          ],
                        },
                      ],
                    },

                    {
                      type: 'category',
                      label: 'Sink connectors',
                      items: [
                        // A (subtree)
                        {
                          type: 'category',
                          label: 'Amazon S3 sink',
                          link: {
                            type: 'doc',
                            id: 'products/kafka/kafka-connect/howto/s3-sink',
                          },
                          items: [
                            'products/kafka/kafka-connect/howto/s3-sink-prepare',
                            'products/kafka/kafka-connect/howto/s3-sink-connector-aiven',
                            'products/kafka/kafka-connect/howto/s3-sink-connector-confluent',
                            'products/kafka/kafka-connect/howto/s3-iam-assume-role',
                            {
                              type: 'category',
                              label: 'Naming and data formats',
                              items: [
                                'products/kafka/kafka-connect/howto/s3-sink-additional-parameters',
                                'products/kafka/kafka-connect/howto/s3-sink-additional-parameters-confluent',
                              ],
                            },
                          ],
                        },

                        // A
                        'products/kafka/kafka-connect/howto/azure-blob-sink',

                        // C
                        'products/kafka/kafka-connect/howto/cassandra-streamreactor-sink',
                        'products/kafka/kafka-connect/howto/clickhouse-sink-connector',
                        'products/kafka/kafka-connect/howto/couchbase-sink',

                        // E
                        'products/kafka/kafka-connect/howto/elasticsearch-sink',

                        // G
                        'products/kafka/kafka-connect/howto/gcp-bigquery-sink',
                        'products/kafka/kafka-connect/howto/gcs-sink',
                        'products/kafka/kafka-connect/howto/gcp-pubsub-lite-sink',
                        'products/kafka/kafka-connect/howto/gcp-pubsub-sink',

                        // H
                        'products/kafka/kafka-connect/howto/http-sink',

                        // I
                        'products/kafka/kafka-connect/howto/ibm-mq-sink-connector',

                        {
                          type: 'category',
                          label: 'Iceberg sink connector',
                          link: {
                            type: 'doc',
                            id: 'products/kafka/kafka-connect/howto/iceberg-sink-connector',
                          },
                          items: [
                            'products/kafka/kafka-connect/howto/aws-glue-rest-catalog',
                            'products/kafka/kafka-connect/howto/aws-glue-catalog',
                            'products/kafka/kafka-connect/howto/jdbc-catalog-postgres',
                            'products/kafka/kafka-connect/howto/snowflake-open-catalog',
                          ],
                        },

                        'products/kafka/kafka-connect/howto/influx-sink',
                        'products/kafka/kafka-connect/howto/jdbc-sink',

                        // M
                        'products/kafka/kafka-connect/howto/mongodb-sink-lenses',
                        'products/kafka/kafka-connect/howto/mongodb-sink-mongo',
                        'products/kafka/kafka-connect/howto/mqtt-sink-connector',

                        // O
                        'products/kafka/kafka-connect/howto/opensearch-sink',

                        // R
                        'products/kafka/kafka-connect/howto/redis-streamreactor-sink',

                        // S
                        'products/kafka/kafka-connect/howto/salesforce-sink-connector',
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
                    'products/kafka/kafka-mirrormaker/concepts/configuration-layers',
                    'products/kafka/kafka-mirrormaker/concepts/permissions-internal-topics',
                  ],
                },
                {
                  type: 'category',
                  label: 'How to',
                  items: [
                    'products/kafka/kafka-mirrormaker/howto/setup-replication-flow',
                    'products/kafka/kafka-mirrormaker/howto/update-integration-configurations',
                    'products/kafka/kafka-mirrormaker/howto/monitor-replication-execution',
                    'products/kafka/kafka-mirrormaker/howto/remove-mirrormaker-prefix',
                    'products/kafka/kafka-mirrormaker/howto/datadog-customised-metrics',
                    'products/kafka/kafka-mirrormaker/howto/log-analysis-offset-sync-tool',
                    'products/kafka/kafka-mirrormaker/howto/exactly-once-delivery',
                    'products/kafka/kafka-mirrormaker/howto/mm2-rack-awareness',
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
                    'products/kafka/karapace/concepts/schema-references',
                    'products/kafka/karapace/concepts/acl-definition',
                    'products/kafka/karapace/concepts/kafka-rest-proxy-authorization',
                  ],
                },
                {
                  type: 'category',
                  label: 'How to',
                  items: [
                    'products/kafka/karapace/howto/enable-karapace',
                    'products/kafka/karapace/howto/register-schemas-with-references',
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
          label: 'Aiven for ClickHouse®',
          link: {
            type: 'doc',
            id: 'products/clickhouse',
          },
          items: [
            {
              type: 'category',
              label: 'Get started',
              link: {
                type: 'doc',
                id: 'products/clickhouse/get-started',
              },
              items: [
                'products/clickhouse/concepts/service-architecture',
                'products/clickhouse/concepts/columnar-databases',
                'products/clickhouse/concepts/olap',
              ],
            },
            {
              type: 'category',
              label: 'Connect to service',
              link: {
                type: 'doc',
                id: 'products/clickhouse/howto/list-connect-to-service',
              },
              items: [
                'products/clickhouse/reference/supported-interfaces-drivers',
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
              label: 'Query and analyze data',
              items: [
                {
                  type: 'category',
                  label: 'Databases, tables, and views',
                  link: {
                    type: 'doc',
                    id: 'products/clickhouse/concepts/databases-tables-views',
                  },
                  items: [
                    'products/clickhouse/howto/manage-databases-tables',
                    'products/clickhouse/reference/supported-table-engines',
                    'products/clickhouse/reference/supported-database-engines',
                    'products/clickhouse/howto/materialized-views',
                  ],
                },
                {
                  type: 'category',
                  label: 'Indexes and data types',
                  items: [
                    'products/clickhouse/concepts/indexing',
                    'products/clickhouse/concepts/choose-order-by-key',
                    'products/clickhouse/concepts/strings',
                  ],
                },
                {
                  type: 'category',
                  label: 'Run queries',
                  items: [
                    'products/clickhouse/howto/query-databases',
                    'products/clickhouse/howto/use-shards-with-distributed-table',
                    'products/clickhouse/howto/clickhouse-query-cache',
                    'products/clickhouse/howto/vector-similarity-index-cache',
                    'products/clickhouse/howto/create-dictionary',
                    'products/clickhouse/howto/sql-user-defined-functions',
                  ],
                },
                {
                  type: 'category',
                  label: 'Query external data',
                  link: {
                    type: 'doc',
                    id: 'products/clickhouse/concepts/federated-queries',
                  },
                  items: [
                    'products/clickhouse/howto/run-federated-queries',
                    'products/clickhouse/howto/copy-data-across-instances',
                    'products/clickhouse/reference/supported-table-functions',
                    'products/clickhouse/reference/s3-supported-file-formats',
                  ],
                },
                {
                  type: 'category',
                  label: 'Query Kafka topic data',
                  link: {
                    type: 'doc',
                    id: 'products/clickhouse/concepts/query-kafka-topic-data',
                  },
                  items: [
                    'products/clickhouse/howto/set-up-kafka-topic-querying',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Service management',
              link: {
                type: 'doc',
                id: 'products/clickhouse/concepts/service-management',
              },
              items: [
                'products/clickhouse/howto/secure-service',
                'products/clickhouse/howto/list-manage-cluster',
                'products/clickhouse/howto/manage-users-roles',
                'products/clickhouse/reference/advanced-params',
                'products/clickhouse/reference/limitations',
              ],
            },
            {
              type: 'category',
              label: 'Maintenance and lifecycle',
              items: [
                'products/clickhouse/reference/version-lifecycle',
                'products/clickhouse/howto/manage-clickhouse-versions',
                'products/clickhouse/reference/25-8-default-settings',
              ],
            },
            {
              type: 'category',
              label: 'High availability and disaster recovery',
              items: ['products/clickhouse/concepts/disaster-recovery'],
            },
            {
              type: 'category',
              label: 'Tiered storage',
              link: {
                type: 'doc',
                id: 'products/clickhouse/concepts/clickhouse-tiered-storage',
              },
              items: [
                'products/clickhouse/howto/enable-tiered-storage',
                'products/clickhouse/howto/configure-tiered-storage',
                'products/clickhouse/howto/check-data-tiered-storage',
                'products/clickhouse/howto/transfer-data-tiered-storage',
                'products/clickhouse/howto/local-cache-tiered-storage',
              ],
            },
            {
              type: 'category',
              label: 'Backup and restore',
              items: [
                'products/clickhouse/howto/configure-backup',
                'products/clickhouse/howto/restore-backup',
              ],
            },
            {
              type: 'category',
              label: 'Observability and monitoring',
              items: [
                {
                  type: 'category',
                  label: 'Grafana',
                  items: [
                    'products/clickhouse/howto/monitor-performance',
                    'products/clickhouse/howto/connect-to-grafana',
                  ],
                },
                'products/clickhouse/howto/fetch-query-statistics',
                {
                  type: 'category',
                  label: 'Metrics reference',
                  items: [
                    'products/clickhouse/reference/metrics-list',
                    'products/clickhouse/reference/clickhouse-metrics-datadog',
                    'products/clickhouse/reference/clickhouse-metrics-prometheus',
                    'products/clickhouse/reference/clickhouse-system-tables',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Integrations',
              link: {
                type: 'doc',
                id: 'products/clickhouse/concepts/data-integration-overview',
              },
              items: [
                'products/clickhouse/howto/data-service-integration',
                'products/clickhouse/howto/integration-databases',
                'products/clickhouse/howto/integrate-kafka',
                'products/clickhouse/reference/supported-input-output-formats',
                'products/clickhouse/howto/integrate-postgresql',
                'products/clickhouse/howto/connect-with-jdbc',
              ],
            },
          ],
        },
        {
          type: 'category',
          label: 'Aiven for DataHub',
          link: {
            type: 'doc',
            id: 'products/datahub',
          },
          items: [
            'products/datahub/get-started',
            'products/datahub/connect-datahub-to-services',
            'products/datahub/datahub-mcp-server',
            {
              type: 'category',
              label: 'Service management',
              items: [
                'products/datahub/manage-datahub-users',
                'products/datahub/enable-oidc-auth-datahub',
                {
                  type: 'category',
                  label: 'Notifications',
                  items: [
                    'products/datahub/configure-slack-notifications',
                    'products/datahub/configure-teams-notifications',
                  ],
                },
                {
                  type: 'category',
                  label: 'Maintenance and upgrades',
                  items: [
                    'products/datahub/upgrade-datahub-version',
                    'products/datahub/restore-datahub-indices',
                  ],
                },
              ],
            },
            'products/datahub/fork-datahub-service',
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
              label: 'Service management',
              items: [
                'products/dragonfly/concepts/ha-dragonfly',
                'products/dragonfly/howto/eviction-policy-df',
                'products/dragonfly/howto/compatibility-redisjson',
                'products/dragonfly/reference/advanced-params',
              ],
            },
            {
              type: 'category',
              label: 'Migrate',
              items: [
                'products/dragonfly/howto/migrate-aiven-caching-df-console',
                'products/dragonfly/howto/migrate-ext-redis-df-console',
              ],
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
            {
              type: 'category',
              label: 'Service management',
              items: [
                'products/grafana/howto/create-service',
                'products/grafana/howto/connect-service',
                'products/grafana/howto/power-cycle-service',
                'products/grafana/howto/rename-service',
                'products/grafana/howto/tag-service',
                'products/grafana/howto/fork-service',
                'products/grafana/howto/change-cloud-region',
                'products/grafana/reference/advanced-params',
                'products/grafana/howto/send-emails',
                'products/grafana/reference/plugins',
              ],
            },
            {
              type: 'category',
              label: 'Scaling and performance',
              link: {
                type: 'doc',
                id: 'products/grafana/scaling-performance',
              },
              items: [
                'products/grafana/howto/change-service-plan',
                'products/grafana/howto/prepare-for-high-load',
                'products/grafana/concepts/service-memory',
              ],
            },
            {
              type: 'category',
              label: 'Maintenance and lifecycle',
              link: {
                type: 'doc',
                id: 'products/grafana/maintenance-lifecycle',
              },
              items: ['products/grafana/howto/maintenance-updates'],
            },
            {
              type: 'category',
              label: 'Backups and migration',
              link: {
                type: 'doc',
                id: 'products/grafana/backups-migration',
              },
              items: [
                'products/grafana/howto/backup-to-another-region',
                'products/grafana/howto/track-restore-progress',
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
            {
              type: 'category',
              label: 'Security and access',
              items: [
                'products/grafana/howto/rotating-grafana-service-credentials',
                'products/grafana/howto/oauth-configuration',
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
            'products/metrics/concepts/storage-resource-scaling',
            'products/metrics/howto/storage-usage',
            {
              type: 'category',
              label: 'Service management',
              items: [
                'products/metrics/howto/create-service',
                'products/metrics/howto/connect-service',
                'products/metrics/howto/power-cycle-service',
                'products/metrics/howto/tag-service',
                'products/metrics/howto/change-cloud-region',
              ],
            },
            {
              type: 'category',
              label: 'Scaling and performance',
              link: {
                type: 'doc',
                id: 'products/metrics/scaling-performance',
              },
              items: [
                'products/metrics/howto/change-service-plan',
                'products/metrics/howto/prepare-for-high-load',
                'products/metrics/concepts/service-memory',
              ],
            },
            {
              type: 'category',
              label: 'Maintenance and lifecycle',
              link: {
                type: 'doc',
                id: 'products/metrics/maintenance-lifecycle',
              },
              items: [
                'products/metrics/howto/maintenance-updates',
                'products/metrics/howto/track-restore-progress',
              ],
            },
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
            {
              type: 'category',
              label: 'Get started',
              link: {
                type: 'doc',
                id: 'products/mysql/get-started',
              },
              items: [
                'products/mysql/concepts/mysql-free-tier',
                'products/mysql/reference/resource-capability',
              ],
            },
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
                'products/mysql/howto/connect-with-php',
                'products/mysql/howto/connect-with-java',
                'products/mysql/howto/connect-from-mysql-workbench',
                'products/mysql/howto/connect-with-dbeaver',
                'products/mysql/howto/connect-with-datagrip',
                'products/mysql/concepts/max-number-of-connections',
              ],
            },
            {
              type: 'category',
              label: 'Query and analyze data',
              items: [
                'products/mysql/howto/create-database',
                'products/mysql/howto/create-tables-without-primary-keys',
                'products/mysql/howto/create-missing-primary-keys',
                'products/mysql/howto/mysql-long-running-queries',
                'products/mysql/howto/enable-slow-queries',
                'products/mysql/howto/ai-insights',
                'products/mysql/howto/disable-foreign-key-checks',
              ],
            },
            {
              type: 'category',
              label: 'Service management',
              items: [
                'products/mysql/howto/create-service',
                'products/mysql/howto/connect-service',
                'products/mysql/howto/power-cycle-service',
                'products/mysql/howto/rename-service',
                'products/mysql/howto/tag-service',
                'products/mysql/howto/fork-service',
                'products/mysql/howto/change-cloud-region',
                'products/mysql/howto/manage-service-users',
                'products/mysql/reference/advanced-params',
              ],
            },
            {
              type: 'category',
              label: 'Scaling and performance',
              link: {
                type: 'doc',
                id: 'products/mysql/scaling-performance',
              },
              items: [
                'products/mysql/howto/change-service-plan',
                'products/mysql/howto/scale-disk-storage',
                'products/mysql/concepts/mysql-memory-usage',
                'products/mysql/concepts/mysql-tuning-and-concurrency',
                'products/mysql/howto/identify-disk-usage-issues',
                'products/mysql/howto/prevent-disk-full',
                'products/mysql/howto/reclaim-disk-space',
                'products/mysql/howto/prepare-for-high-load',
              ],
            },
            {
              type: 'category',
              label: 'Maintenance and lifecycle',
              link: {
                type: 'doc',
                id: 'products/mysql/maintenance-lifecycle',
              },
              items: [
                'products/mysql/howto/manage-mysql-version',
                'products/mysql/howto/maintenance-updates',
              ],
            },
            {
              type: 'category',
              label: 'High availability and  disaster recovery',
              items: [
                'products/mysql/concepts/high-availability',
                'products/mysql/concepts/mysql-replication',
                'products/mysql/howto/create-remote-replica',
              ],
            },
            {
              type: 'category',
              label: 'Backups and migration',
              link: {
                type: 'doc',
                id: 'products/mysql/backups-migration',
              },
              items: [
                {
                  type: 'category',
                  label: 'Backup and restore',
                  items: [
                    'products/mysql/concepts/mysql-backups',
                    'products/mysql/howto/use-incremental-backups',
                    'products/mysql/howto/migrate-database-mysqldump',
                    'products/mysql/howto/backup-to-another-region',
                    'products/mysql/howto/track-restore-progress',
                  ],
                },
                {
                  type: 'category',
                  label: 'Migration',
                  items: [
                    'products/mysql/howto/do-check-service-migration',
                    'products/mysql/howto/migrate-db-to-aiven-via-console',
                    'products/mysql/howto/migrate-from-external-mysql',
                  ],
                },
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
            {
              type: 'category',
              label: 'Get started',
              link: {
                id: 'products/opensearch/get-started',
                type: 'doc',
              },
              items: [
                'products/opensearch/concepts/opensearch-free-tier',
                'products/opensearch/howto/create-free-tier-opensearch',
                'products/opensearch/howto/sample-dataset',
                'products/opensearch/concepts/opensearch-vs-elasticsearch',
              ],
            },
            {
              type: 'category',
              label: 'Connect to service',
              link: {
                id: 'products/opensearch/howto/list-connect-to-service',
                type: 'doc',
              },
              items: [
                'products/opensearch/howto/opensearch-with-curl',
                'products/opensearch/howto/connect-with-nodejs',
                'products/opensearch/howto/connect-with-python',
                'products/opensearch/howto/upgrade-clients-to-opensearch',
              ],
            },
            {
              type: 'category',
              label: 'Indices and storage',
              items: [
                'products/opensearch/concepts/indices',
                'products/opensearch/concepts/when-create-index',
                'products/opensearch/concepts/shards-number',
                'products/opensearch/howto/reindex-opensearch',
                'products/opensearch/howto/set_index_retention_patterns',
                'products/opensearch/concepts/index-replication',
                'products/opensearch/concepts/cross-cluster-replication-opensearch',
                'products/opensearch/howto/setup-cross-cluster-replication-opensearch',
                'products/opensearch/howto/resolve-shards-too-large',
                'products/opensearch/howto/handle-low-disk-space',
                'products/opensearch/reference/low-space-watermarks',
              ],
            },
            {
              type: 'category',
              label: 'OpenSearch® Dashboards',
              link: {
                type: 'doc',
                id: 'products/opensearch/dashboards',
              },
              items: [
                'products/opensearch/dashboards/get-started',
                'products/opensearch/dashboards/howto/dev-tools-usage-example',
                'products/opensearch/dashboards/howto/opensearch-alerting-dashboard',
                'products/opensearch/howto/opensearch-alerting-api',
                'products/opensearch/howto/opensearch-dashboard-multi_tenancy',
                'products/opensearch/troubleshooting/troubleshooting-opensearch-dashboards',
              ],
            },
            {
              type: 'category',
              label: 'Search and aggregate data',
              link: {
                id: 'products/opensearch/howto/list-search-service',
                type: 'doc',
              },
              items: [
                'products/opensearch/concepts/aggregations',
                'products/opensearch/howto/opensearch-search-and-python',
                'products/opensearch/howto/opensearch-and-nodejs',
                'products/opensearch/howto/opensearch-aggregations-and-nodejs',
                'products/opensearch/howto/custom-dictionary-files',
                'products/opensearch/howto/enable-slow-query-log',
              ],
            },
            {
              type: 'category',
              label: 'Service management',
              items: [
                'products/opensearch/howto/create-service',
                'products/opensearch/howto/connect-service',
                'products/opensearch/howto/power-cycle-service',
                'products/opensearch/howto/rename-service',
                'products/opensearch/howto/tag-service',
                'products/opensearch/howto/fork-service',
                'products/opensearch/howto/change-cloud-region',
                'products/opensearch/reference/advanced-params',
                'products/opensearch/concepts/dedicated-node-roles',
                'products/opensearch/concepts/high-availability-for-opensearch',
                'products/opensearch/reference/plugins',
                'products/opensearch/reference/list-of-plugins-for-each-version',
                'products/opensearch/reference/opensearch-limitations',
              ],
            },
            {
              type: 'category',
              label: 'Scaling and performance',
              link: {
                type: 'doc',
                id: 'products/opensearch/scaling-performance',
              },
              items: [
                'products/opensearch/howto/change-service-plan',
                'products/opensearch/howto/scale-disk-storage',
                'products/opensearch/howto/prepare-for-high-load',
                'products/opensearch/concepts/service-memory',
              ],
            },
            {
              type: 'category',
              label: 'Maintenance and lifecycle',
              link: {
                type: 'doc',
                id: 'products/opensearch/maintenance-lifecycle',
              },
              items: [
                'products/opensearch/howto/os-version-upgrade',
                'products/opensearch/howto/maintenance-updates',
              ],
            },
            {
              type: 'category',
              label: 'Backups and migration',
              items: [
                'products/opensearch/howto/restore_opensearch_backup',
                'products/opensearch/howto/backup-to-another-region',
                'products/opensearch/howto/track-restore-progress',
                'products/opensearch/howto/import-opensearch-data-elasticsearch-dump-to-aiven',
                'products/opensearch/howto/import-opensearch-data-elasticsearch-dump-to-aws',
                {
                  type: 'category',
                  label: 'Manage custom repos',
                  link: {
                    id: 'products/opensearch/howto/manage-custom-repo/list-manage-custom-repo',
                    type: 'doc',
                  },
                  items: [
                    'products/opensearch/howto/custom-repositories',
                    'products/opensearch/howto/manage-custom-repo/custom-repositories-os-api',
                    'products/opensearch/howto/snapshot-credentials',
                  ],
                },
                'products/opensearch/howto/manage-snapshots',
                {
                  type: 'category',
                  label: 'Migrate snapshots to Aiven',
                  link: {
                    type: 'doc',
                    id: 'products/opensearch/howto/migrate-external-snapshots-aiven-opensearch',
                  },
                  items: [
                    'products/opensearch/howto/migrate-ism-policies',
                    'products/opensearch/howto/migrate-opendistro-security-config-aiven',
                  ],
                },
                'products/opensearch/howto/migrating_elasticsearch_data_to_aiven',
              ],
            },
            {
              type: 'category',
              label: 'Integrations',
              items: [
                'products/opensearch/howto/opensearch-log-integration',
                'products/opensearch/howto/os-metrics',
                'products/opensearch/howto/integrate-with-grafana',
              ],
            },
            {
              type: 'category',
              label: 'Security and access',
              items: [
                {
                  type: 'category',
                  label: 'Access control',
                  items: [
                    'products/opensearch/concepts/access_control',
                    'products/opensearch/howto/control_access_to_content',
                  ],
                },
                {
                  type: 'category',
                  label: 'OpenSearch Security',
                  link: {
                    type: 'doc',
                    id: 'products/opensearch/howto/list-opensearch-security',
                  },
                  items: [
                    'products/opensearch/concepts/os-security',
                    'products/opensearch/concepts/opensearch-security-considerations',
                    'products/opensearch/howto/enable-opensearch-security',
                    'products/opensearch/howto/saml-sso-authentication',
                    'products/opensearch/howto/oidc-authentication',
                    'products/opensearch/howto/jwt-authentication',
                    'products/opensearch/howto/audit-logs',
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
            {
              type: 'category',
              label: 'Get started',
              link: {
                type: 'doc',
                id: 'products/postgresql/get-started',
              },
              items: [
                'products/postgresql/reference/terminology',
                'products/postgresql/concepts/pg-free-tier',
                'products/postgresql/howto/pagila',
                'products/postgresql/reference/resource-capability',
              ],
            },
            {
              type: 'category',
              label: 'Connect to service',
              items: [
                {
                  type: 'category',
                  label: 'Connection methods',
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
                  label: 'Connection pooling',
                  items: [
                    'products/postgresql/concepts/pg-connection-pooling',
                    'products/postgresql/howto/manage-pool',
                    'products/postgresql/troubleshooting/troubleshooting-connection-pooling',
                    'products/postgresql/howto/pgbouncer-stats',
                  ],
                },
                {
                  type: 'category',
                  label: 'Connection management',
                  items: [
                    'products/postgresql/reference/pg-connection-limits',
                    'products/postgresql/reference/idle-connections',
                    'products/postgresql/reference/use-of-deprecated-tls-versions',
                    'products/postgresql/troubleshooting/pg-password-encryption-upgrade',
                    'products/postgresql/troubleshooting/troubleshooting-fatal-out-of-shared-mem',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Query and analyze data',
              items: [
                {
                  type: 'category',
                  label: 'PG Studio',
                  link: {
                    type: 'doc',
                    id: 'products/postgresql/howto/pg-studio/index',
                  },
                  items: [
                    'products/postgresql/howto/pg-studio/get-started',
                    'products/postgresql/howto/pg-studio/use-ai-assistant',
                    'products/postgresql/howto/pg-studio/write-run-queries',
                    'products/postgresql/howto/pg-studio/manage-queries',
                    'products/postgresql/howto/pg-studio/security-connections',
                  ],
                },
                {
                  type: 'category',
                  label: 'Data APIs',
                  link: {
                    type: 'doc',
                    id: 'products/postgresql/howto/data-apis/index',
                  },
                  items: [
                    'products/postgresql/howto/data-apis/get-started',
                    'products/postgresql/howto/data-apis/authentication',
                    'products/postgresql/howto/data-apis/use-endpoints',
                    'products/postgresql/howto/data-apis/manage',
                  ],
                },
                'products/postgresql/howto/ai-insights',
                'products/postgresql/howto/identify-pg-slow-queries',
                'products/postgresql/howto/optimize-pg-slow-queries',
                'products/postgresql/howto/pg-long-running-queries',
              ],
            },
            {
              type: 'category',
              label: 'Service management',
              items: [
                'products/postgresql/howto/create-service',
                'products/postgresql/howto/connect-service',
                'products/postgresql/howto/power-cycle-service',
                'products/postgresql/howto/rename-service',
                'products/postgresql/howto/tag-service',
                'products/postgresql/howto/fork-service',
                'products/postgresql/howto/migrate-cloud-region',
                'products/postgresql/howto/manage-service-users',
                'products/postgresql/reference/advanced-params',
              ],
            },
            {
              type: 'category',
              label: 'Database management',
              link: {
                type: 'doc',
                id: 'products/postgresql/database-management',
              },
              items: [
                'products/postgresql/howto/create-database',
                'products/postgresql/howto/enable-jit',
                'products/postgresql/howto/use-pg-repack-extension',
                'products/postgresql/howto/repair-pg-index',
                'products/postgresql/howto/check-avoid-transaction-id-wraparound',
              ],
            },
            {
              type: 'category',
              label: 'Scaling and performance',
              link: {
                type: 'doc',
                id: 'products/postgresql/scaling-performance',
              },
              items: [
                'products/postgresql/howto/change-service-plan',
                'products/postgresql/howto/scale-disk-storage',
                'products/postgresql/concepts/pg-shared-buffers',
                'products/postgresql/concepts/pg-disk-usage',
                'products/postgresql/howto/pg-object-size',
                'products/postgresql/howto/prevent-full-disk',
                'products/postgresql/howto/prepare-for-high-load',
              ],
            },
            {
              type: 'category',
              label: 'Maintenance and lifecycle',
              link: {
                type: 'doc',
                id: 'products/postgresql/maintenance-lifecycle',
              },
              items: [
                'products/postgresql/howto/upgrade',
                'products/postgresql/howto/maintenance-updates',
              ],
            },
            {
              type: 'category',
              label: 'High availability and disaster recovery',
              items: [
                'products/postgresql/concepts/high-availability',
                'products/postgresql/concepts/upgrade-failover',
                'products/postgresql/howto/pg-controlled-switchover',
                'products/postgresql/howto/create-read-replica',
                'products/postgresql/howto/pg-reads-failover-to-primary',
                {
                  type: 'category',
                  label: 'X-region disaster recovery',
                  link: {
                    type: 'doc',
                    id: 'products/postgresql/crdr',
                  },
                  items: [
                    'products/postgresql/crdr/crdr-overview',
                    'products/postgresql/crdr/enable-crdr',
                    {
                      type: 'category',
                      label: 'Failover and failback',
                      link: {
                        id: 'products/postgresql/crdr/failover/list-failover',
                        type: 'doc',
                      },
                      items: [
                        'products/postgresql/crdr/failover/crdr-failover-to-recovery',
                        'products/postgresql/crdr/failover/crdr-revert-to-primary',
                      ],
                    },
                    {
                      type: 'category',
                      label: 'Switchover and switchback',
                      link: {
                        id: 'products/postgresql/crdr/switchover/list-switchover',
                        type: 'doc',
                      },
                      items: [
                        'products/postgresql/crdr/switchover/crdr-switchover',
                        'products/postgresql/crdr/switchover/crdr-switchback',
                      ],
                    },
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Backups and migration',
              link: {
                type: 'doc',
                id: 'products/postgresql/backups-migration',
              },
              items: [
                'products/postgresql/concepts/pg-backups',
                'products/postgresql/howto/create-manual-backups',
                'products/postgresql/howto/restore-backup',
                'products/postgresql/howto/backup-to-another-region',
                'products/postgresql/howto/track-restore-progress',
                {
                  type: 'category',
                  label: 'Migrate',
                  items: [
                    'products/postgresql/howto/migrate-db-to-aiven-via-console',
                    'products/postgresql/concepts/aiven-db-migrate',
                    'products/postgresql/howto/migrate-aiven-db-migrate',
                    'products/postgresql/howto/run-aiven-db-migrate-python',

                    'products/postgresql/howto/migrate-pg-dump-restore',
                    'products/postgresql/howto/migrate-using-bucardo',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Observability and monitoring',
              items: [
                'products/postgresql/reference/pg-metrics',
                'products/postgresql/howto/report-metrics-grafana',
                'products/postgresql/howto/visualize-grafana',
                'products/postgresql/howto/monitor-database-with-datadog',
                'products/postgresql/howto/monitor-pgbouncer-with-datadog',
                'products/postgresql/howto/monitor-with-pgwatch2',

                'products/postgresql/reference/log-formats-supported',
                {
                  type: 'category',
                  label: 'pgaudit logging',
                  link: {
                    type: 'doc',
                    id: 'products/postgresql/howto/list-pgaudit',
                  },
                  items: [
                    'products/postgresql/concepts/pg-audit-logging',
                    'products/postgresql/howto/use-pg-audit-logging',
                  ],
                },
              ],
            },
            {
              type: 'category',
              label: 'Integrations and extensions',
              items: [
                {
                  type: 'category',
                  label: 'Supported extensions',
                  link: {
                    id: 'products/postgresql/reference/list-of-extensions',
                    type: 'doc',
                  },
                  items: [
                    'products/postgresql/howto/manage-extensions',
                    'products/postgresql/reference/list-of-extensions-for-each-version',
                    'products/postgresql/concepts/timescaledb',
                    'products/postgresql/howto/use-dblink-extension',
                    'products/postgresql/howto/use-pg-cron-extension',
                    'products/postgresql/howto/upgrade-postgis-topology-columns',
                  ],
                },
                {
                  type: 'category',
                  label: 'AI and vector search',
                  items: [
                    'products/postgresql/concepts/pgvector',
                    'products/postgresql/howto/use-pgvector',
                  ],
                },
                {
                  type: 'category',
                  label: 'Logical replication',
                  items: [
                    'products/postgresql/howto/setup-logical-replication',
                    'products/postgresql/howto/logical-replication-aws-aurora',
                    'products/postgresql/howto/logical-replication-aws-rds',
                    'products/postgresql/howto/logical-replication-gcp-cloudsql',
                  ],
                },
                'products/postgresql/howto/datasource-integration',
                'products/postgresql/howto/analyze-with-google-data-studio',
              ],
            },
            {
              type: 'category',
              label: 'User and schema',
              items: [
                'products/postgresql/concepts/dba-tasks-pg',
                'products/postgresql/howto/claim-public-schema-ownership',
                'products/postgresql/howto/readonly-user',
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
            {
              type: 'category',
              label: 'Get started',
              link: {
                type: 'doc',
                id: 'products/valkey/get-started',
              },
              items: [
                'products/valkey/concepts/valkey-free-tier',
                'products/valkey/reference/valkey-modules',
              ],
            },
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
                'products/valkey/howto/estimate-max-number-of-connections',
                'products/valkey/troubleshooting/troubleshoot-connection-issues',
              ],
            },
            {
              type: 'category',
              label: 'Query and analyze data',
              items: [
                'products/valkey/concepts/lua-scripts',
                'products/valkey/howto/benchmark-performance',
              ],
            },
            {
              type: 'category',
              label: 'Service management',
              items: [
                'products/valkey/howto/create-service',
                'products/valkey/howto/connect-service',
                'products/valkey/howto/power-cycle-service',
                'products/valkey/howto/rename-service',
                'products/valkey/howto/tag-service',
                'products/valkey/howto/fork-service',
                'products/valkey/howto/change-cloud-region',
                'products/valkey/howto/manage-service-users',
                'products/valkey/reference/advanced-params',
                'products/valkey/reference/restricted-commands',
              ],
            },
            {
              type: 'category',
              label: 'Scaling and performance',
              link: {
                type: 'doc',
                id: 'products/valkey/scaling-performance',
              },
              items: [
                'products/valkey/howto/change-service-plan',
                'products/valkey/howto/scale-disk-storage',
                'products/valkey/concepts/memory-usage',
                'products/valkey/troubleshooting/warning-overcommit_memory',
                'products/valkey/howto/prepare-for-high-load',
              ],
            },
            {
              type: 'category',
              label: 'Maintenance and lifecycle',
              link: {
                type: 'doc',
                id: 'products/valkey/maintenance-lifecycle',
              },
              items: [
                'products/valkey/howto/valkey-version-upgrade',
                'products/valkey/howto/maintenance-updates',
              ],
            },
            {
              type: 'category',
              label: 'High availability and disaster recovery',
              items: [
                'products/valkey/concepts/high-availability',
                'products/valkey/concepts/valkey-cluster',
                'products/valkey/concepts/read-replica',
                'products/valkey/howto/create-valkey-read-replica',
              ],
            },
            {
              type: 'category',
              label: 'Backups and migration',
              link: {
                type: 'doc',
                id: 'products/valkey/backups-migration',
              },
              items: [
                'products/valkey/howto/configure-backups',
                'products/valkey/howto/backup-to-another-region',
                'products/valkey/howto/track-restore-progress',
                'products/valkey/howto/migrate-redis-aiven-cli',
                'products/valkey/howto/migrate-redis-aiven-via-console',
                'products/valkey/howto/migrate-caching-valkey-to-aiven-for-valkey',
                'products/valkey/howto/migrate-dragonfly-to-valkey',
              ],
            },
            {
              type: 'category',
              label: 'Observability and monitoring',
              items: ['products/valkey/reference/valkey-metrics-in-prometheus'],
            },
            {
              type: 'category',
              label: 'Security and access',
              items: [
                'products/valkey/howto/configure-acl-permissions',
                'products/valkey/howto/manage-ssl-connectivity',
              ],
            },
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Service management',
      className: 'expandedSection',
      collapsed: false,
      collapsible: false,
      items: [
        'platform/howto/list-service',
        {
          type: 'category',
          label: 'Concepts',
          items: [
            'platform/concepts/service-memory-limits',
            'platform/concepts/out-of-memory-conditions',
            'platform/concepts/maintenance-window',
          ],
        },
        'platform/howto/controlled-upgrade',
        {
          type: 'category',
          label: 'Backup and restore',
          items: [
            'platform/concepts/service_backups',
            'platform/howto/restore_progress_updates',
            {
              type: 'category',
              label: 'Backup to another region',
              link: {
                type: 'doc',
                id: 'platform/concepts/backup-to-another-region',
              },
              items: [
                'platform/howto/btar/enable-backup-to-another-region',
                'platform/howto/btar/manage-backup-to-another-region',
                'platform/howto/btar/disable-backup-to-another-region',
              ],
            },
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

        'platform/howto/create_new_service',
        'platform/concepts/service-power-cycle',
        'platform/concepts/rename-services',
        'platform/howto/tag-resources',
        'platform/howto/create_new_service_user',
        'platform/concepts/service-forking',
        'platform/howto/prepare-for-high-load',
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
  ],
};

export default sidebars;
