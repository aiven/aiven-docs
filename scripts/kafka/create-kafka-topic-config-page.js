//
// Generates a Markdown file that describes the available configuration based on the kafka policies per kafka product.
// The output is meant to be included in docs pages such as docs/products/kafka/reference/advanced-params.md
//
const { program } = require('commander');

const {
  fetchPolicies,
  getKafkaConfigPageHandlebarsTemplate,
  mapPoliciesIntoConfigs,
  createMarkdownFileFromHandlebarsTemplate
} = require('./shared.js');

async function createKafkaTopicConfigPage(product, outputFileName) {
  const policies = await fetchPolicies(product);

  const configsFromPolicies = mapPoliciesIntoConfigs(policies, 'topic');

  const template = getKafkaConfigPageHandlebarsTemplate();
  const context = { configs: configsFromPolicies };
  createMarkdownFileFromHandlebarsTemplate(template, context, outputFileName);
}

program
  .argument('<product>', 'Policies are defined different per kafka product. Specifies the product for which to get available configs')
  .argument('<outputFileName>', 'Output file name for the Markdown content')
  .action((product, outputFileName) => {
    createKafkaTopicConfigPage(product, outputFileName);
  });

program.parse(process.argv);
