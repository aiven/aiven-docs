//
// Generates a Markdown file that describes the available configuration based on the kafka policies per kafka product.
// The output is meant to be included in docs pages such as docs/products/kafka/reference/advanced-params.md
//
const { program } = require('commander');

const {
  fetchPolicies,
  fetchUserConfigSchema,
  mapPoliciesIntoConfigs,
  getKafkaConfigPageHandlebarsTemplate,
  createMarkdownFileFromHandlebarsTemplate
} = require('./shared.js');

function mapUserConfigSchemaIntoConfigs(userConfigSchema) {
  const configs = [];

  const _mapUserConfigObjectSchemaIntoConfig = (schema, path = '') => {
    Object.entries(schema.properties)
      .forEach(([schemaName, schema]) => {
        const schemaPath = path ? `${path}.${schemaName}` : schemaName;
        const schemaType = schema.items?.type ? `array[${schema.items.type}]` : schema.type;
        const schemaEnum = schema.enum?.map(String);

        let schemaDocs = schema.description ? schema.description : schema.title
        schemaDocs = schemaDocs.replaceAll(/\${/g, '');
        schemaDocs = schemaDocs.replaceAll(/}/g, '');

        configs.push({
          path: schemaPath,
          name: schemaName,
          docs: schemaDocs,
          type: schemaType,
          enum: schemaEnum,
          default: schema.default,
          required: schema.required,
          restart_warning: schema['x-aiven-change-requires-restart'],
          maxItems: schema.maxItems,
          maxLength: schema.maxLength,
          minimum: schema.minimum,
          maximum: schema.maximum,
          orBetween: undefined,
        });

        if (schema.items && schema.items.properties) {
          return _mapUserConfigObjectSchemaIntoConfig(schema.items, `${schemaPath}.[0]`);
        }

        if (schema.properties) {
          return _mapUserConfigObjectSchemaIntoConfig(schema, schemaPath);
        }
    });
  };

  _mapUserConfigObjectSchemaIntoConfig(userConfigSchema);

  return configs;
}

function mapPolicyOverridesIntoConfigs(userSchemaConfigs, policyConfigs) {
  const configs = [];

  userSchemaConfigs.forEach((config) => {
    const isKafkaConfig = config.path.startsWith("kafka.");

    if (!isKafkaConfig) {
      configs.push(config);
      return;
    }

    const configOverride = policyConfigs.find((policyConfig) => policyConfig.name === config.name);
    if (configOverride) {
      configs.push({
        ...configOverride,
        path: config.path,
      });
    }
  });

  return configs;
}

async function createKafkaClusterConfigPage(product, outputFileName) {
  const userConfig = await fetchUserConfigSchema();
  const policies = await fetchPolicies(product);

  const configsFromUserConfigSchema = mapUserConfigSchemaIntoConfigs(userConfig);
  const configsFromPolicies = mapPoliciesIntoConfigs(policies, 'cluster');

  const configsWithPolicyOverrides = mapPolicyOverridesIntoConfigs(
    configsFromUserConfigSchema,
    configsFromPolicies
  );

  const template = getKafkaConfigPageHandlebarsTemplate();
  const context = { configs: configsWithPolicyOverrides };
  createMarkdownFileFromHandlebarsTemplate(template, context, outputFileName);
}

program
  .argument('<product>', 'Policies are defined different per kafka product. Specifies the product for which to get available configs')
  .argument('<outputFileName>', 'Output file name for the Markdown content')
  .action((product, outputFileName) => {
    createKafkaClusterConfigPage(product, outputFileName);
  });

program.parse(process.argv);
