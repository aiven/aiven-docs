const handlebars = require('handlebars');
const fs = require('fs');

const AIVEN_API_BASE_URL = 'https://api.aiven.io/v1';
const AIVEN_API_SERVICE_TYPES_LIST_URL = `${AIVEN_API_BASE_URL}/service_types`;
const AIVEN_API_POLICY_LIST_URL = `${AIVEN_API_BASE_URL}/kafka/policies`;

const UNQUOTED_INTEGER = /("[a-zA-Z0-9-_]+"):(-?[0-9._]+)/g;

function parseResponseData(text) {
  return JSON.parse(text.replaceAll(UNQUOTED_INTEGER, '$1:"$2"'));
}

async function fetchUserConfigSchema() {
  const response = await fetch(AIVEN_API_SERVICE_TYPES_LIST_URL);
  const responseData = parseResponseData(await response.text());
  const schema = responseData.service_types?.kafka?.user_config_schema;
  if (!schema) {
    throw Error('Unexpected response data');
  }

  return schema;
}

async function fetchPolicies(product) {
  const response = await fetch(`${AIVEN_API_POLICY_LIST_URL}?product=${product}`);
  const responseData = parseResponseData(await response.text());
  const policies = responseData.policies;
  if (!policies) {
    throw Error('Unexpected response data');
  }

  return policies;
}

function mapPoliciesIntoConfigs(policies, resourceType) {
  return policies
    .filter((policy) => policy.resource_type === resourceType)
    .map((policy) => {
      return {
        path: policy.config_name,
        name: policy.config_name,
        docs: policy.config_description,
        type: policy.config_type,
        enum: policy.config_type === 'string' ? policy.config_options : undefined,
        itemsType: undefined,
        default: undefined,
        required: undefined,
        restart_warning: undefined,
        maxItems: undefined,
        maxLength: undefined,
        minimum: policy.config_type === 'integer' ? policy.config_options.at(0) : undefined,
        maximum: policy.config_type === 'integer' && policy.config_options.length === 2 ? policy.config_options.at(1) : undefined,
        orBetween: policy.config_type === 'integer' && policy.config_options.length === 3 ? [policy.config_options.at(1), policy.config_options.at(2)] : undefined,
     };
   });
}

function getKafkaConfigPageHandlebarsTemplate() {
  return `
<!-- vale off -->
import Link from '@docusaurus/Link'

<table className="service-param">
  <tbody>
    {{#each configs}}
      <tr>
        <td>
            <div className="param">
              <p className="name">
                <Link id="{{this.path}}" to="#{{this.path}}">
                  <strong>{{this.path}}</strong>
                </Link>
              </p>
              <p>
                <code className="type" title="{{this.type}}">{{this.type}}</code>
              </p>
            </div>

            <div className="constraints">
              <ul>
                {{#if this.orBetween}}
                  <li>range: <code>{{this.minimum}}</code> or between <code>{{this.orBetween.[0]}}</code> and <code>{{this.orBetween.[1]}}</code></li>
                {{/if}}
                {{#if this.minimum}}
                  <li>min: <code>{{this.minimum}}</code></li>
                {{/if}}
                {{#if this.maximum}}
                  <li>max: <code>{{this.maximum}}</code></li>
                {{/if}}
                {{#if this.maxItems}}
                  <li>maxItems: <code>{{this.maxItems}}</code></li>
                {{/if}}
                {{#if this.maxLength}}
                  <li>maxLength: <code>{{this.maxLength}}</code></li>
                {{/if}}
                {{#if this.enum}}
                  <li>enum: <code>{{this.enum}}</code></li>
                {{/if}}
                {{#if this.default}}
                  <li>default: <code>{{this.default}}</code></li>
                {{/if}}
                {{#if this.required}}
                  <li>required: <code>{{this.required}}</code></li>
                {{/if}}
                {{#if this.restart_warning}}
                  <li><span class="badge badge--warning">Service restart</span></li>
                {{/if}}
              </ul>
            </div>

            {{#if this.docs}}
              <div className="description">
                <p>{{this.docs}}</p>
              </div>
            {{/if}}
        </td>
      </tr>
    {{/each}}
  </tbody>
</table>
`;
}

function createMarkdownFileFromHandlebarsTemplate(template, context, outputFileName) {
  try {
    const renderMarkdown = handlebars.compile(template);
    const markdown = renderMarkdown(context);
    fs.writeFileSync(outputFileName, markdown);
    console.log(`👌 Markdown content written to ${outputFileName}`);
  } catch (error) {
    console.error('⚠️ Error processing data:', error.message);
  }
}

module.exports = {
  createMarkdownFileFromHandlebarsTemplate,
  getKafkaConfigPageHandlebarsTemplate,
  fetchPolicies,
  fetchUserConfigSchema,
  mapPoliciesIntoConfigs
};
