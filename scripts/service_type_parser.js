//
// Generates a Markdown file from the given service's description.
// The output is meant to be included in docs pages such as docs/products/kafka/reference/advanced-params.md
//
const {program} = require('commander');
const axios = require('axios');
const fs = require('fs');
const handlebars = require('handlebars');

// Helper for escaping HTML entities
handlebars.registerHelper('escapeHtml', function(text) {
  if (!text) return '';
  return text.replace(/</g, '&lt;').replace(/>/g, '&gt;');
});

// Helper for formatting parameter details
handlebars.registerHelper('parameterDetailsHelper', function (options) {
  var name = options.hash.name;
  var parent = options.hash.parent;
  var hasParent = parent;
  var type = options.hash.type;
  var minimum = options.hash.minimum;
  var maximum = options.hash.maximum;
  var def = options.hash.def;
  var restart_warning = options.hash.restart_warning;
  var fullname = parent + '.' + name;
  var fullnameid = fullname.replace(/\./g, '_');

  var html = '<div className="param">';
  var nestedParamName = '<strong>' + fullname + '</strong>';
  var paramName = '<strong>' + name + '</strong>';

  // Common part of the HTML
  html +=
    '<p className="name">' +
    '<Link id="' +
    (hasParent ? fullnameid : name) +
    '"/>';
  html +=
    '<Link to="#' +
    (hasParent ? fullnameid : name) +
    '">' +
    (hasParent ? nestedParamName : paramName) +
    '</Link>';
  html += '</p>';

  html += '<p><code className="type">' + type + '</code></p>';
  html += '</div>';
  if (minimum || maximum || def || restart_warning) {
    const constraints = [];
    if (minimum) constraints.push('<li>min: <code>' + minimum + '</code></li>');
    if (maximum) constraints.push('<li>max: <code>' + maximum + '</code></li>');
    if (def) constraints.push('<li>default: <code>' + def + '</code></li>');
    if (restart_warning) {
      constraints.push('<li><span class="badge badge--warning">Service restart</span></li>');
    }

    html +=
      '<div className="constraints"><ul>' +
      constraints.join('') +
      '</ul></div>';
  }

  return new handlebars.SafeString(html);
});

// Helper to recursively render nested properties
handlebars.registerHelper('renderNestedProperties', function(properties, parentKey) {
  if (!properties) return '';
  
  let html = '';
  for (const [key, value] of Object.entries(properties)) {
    const fullParent = parentKey ? `${parentKey}.${key}` : key;
    
    html += '<tr><td>';
    
    // Render parameter details
    const detailsHelper = handlebars.helpers.parameterDetailsHelper;
    html += detailsHelper({
      hash: {
        name: key,
        parent: parentKey,
        type: value.type,
        minimum: value.minimum,
        maximum: value.maximum,
        def: value.default,
        restart_warning: value['x-aiven-change-requires-restart']
      }
    });
    
    // Render title and description
    if (value.title) {
      html += `<p className="title">${value.title}</p>`;
    }
    if (value.description) {
      const escapedDescription = value.description.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      html += `<div className="description"><p>${escapedDescription}</p></div>`;
    }
    
    // Recursively render nested properties
    if (value.properties && Object.keys(value.properties).length > 0) {
      html += '<table className="service-param-children"><tbody>';
      html += handlebars.helpers.renderNestedProperties(value.properties, fullParent);
      html += '</tbody></table>';
    }
    
    html += '</td></tr>';
  }
  
  return new handlebars.SafeString(html);
});

// Replaces specific Unicode characters
function replaceUnicode(content) {
  const codeMappings = {
    '&#x27;': "'",
    '&#x60;': '`',
  };

  let replacedContent = content.replace(/&#x[0-9a-fA-F]+;/g, (match) => {
    return codeMappings[match] || match;
  });
  replacedContent = replacedContent.replace(/{/g, '\\{');
  replacedContent = replacedContent.replace(/}/g, '\\}');

  return replacedContent;
}

// Reads JSON file from the specified filepath
function readJsonFile(filepath) {
  try {
    const fileContent = fs.readFileSync(filepath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('⚠️ Error reading JSON file:', error.message);
    process.exitCode = 1;
    return null;
  }
}

async function fetchData(serviceName, outputFileName, filepath) {
  // Read from the URL or a local file
  let data;
  let selectedService;
  try {
    if (filepath) {
      data = readJsonFile(filepath);
      if (!data) {
        return;
      }
    } else {
      // Fetch from remote API
      const response = await axios.get('https://api.aiven.io/v1/service_types');
      data = response.data;
    }
    selectedService = data.service_types[serviceName];

    if (!selectedService) {
      console.error(`🤷‍♂️ Service '${serviceName}' not found.`);
      process.exitCode = 1;
      return;
    }

    const templateSource = `
<!-- vale off -->
import Link from '@docusaurus/Link'

<table className="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>
  {{~#each user_config_schema.properties}}
    <tr>
      <td>
        {{parameterDetailsHelper name=@key type=type minimum=minimum maximum=maximum def=default restart_warning=x-aiven-change-requires-restart}}
        {{#if title~}}<p className="title">{{escapeHtml title}}</p>{{~/if}}
        {{#if description~}}<div className="description"><p>{{escapeHtml description}}</p></div>{{~/if}}
        {{#if properties}}
        <table className="service-param-children">
          <tbody>
          {{{renderNestedProperties properties @key}}}
          </tbody>
        </table>
        {{/if}}
      </td>
    </tr>
  {{/each}}
  </tbody>
</table>
    `;

    const template = handlebars.compile(templateSource);
    let markdownOutput = template({...selectedService});
    markdownOutput = replaceUnicode(markdownOutput);
    // Write the output to the specified file
    fs.writeFileSync(outputFileName, markdownOutput);

    console.log(`👌 Markdown content written to ${outputFileName}`);
  } catch (error) {
    console.error('⚠️ Error processing data:', error.message);
  }
}

program
  .argument('<serviceName>', 'Name of the service')
  .argument('<outputFileName>', 'Output file name for the Markdown content')
  .option(
    '--filepath <filepath>',
    'Path to the JSON file containing service data. If unspecified, the script fetches data on the remote defintion.',
  )
  .action((serviceName, outputFileName, options) => {
    fetchData(serviceName, outputFileName, options.filepath);
  });

// Parse the command-line arguments
program.parse(process.argv);
