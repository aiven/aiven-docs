//
// Generates a Markdown file from the given service's description.
// The output is meant to be included in docs pages such as docs/products/kafka/reference/advanced-params.md
//
const {program} = require('commander');
const axios = require('axios');
const fs = require('fs');
const handlebars = require('handlebars');

// Helper for formatting parameter details
handlebars.registerHelper('parameterDetailsHelper', function (options) {
  var name = options.hash.name;
  var parent = options.hash.parent;
  var hasParent = parent;
  var type = options.hash.type;
  var minimum = options.hash.minimum;
  var maximum = options.hash.maximum;
  var def = options.hash.def;
  var fullname = parent + '.' + name;
  var fullnameid = fullname.replace('.', '_');

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
  if (minimum || maximum || def) {
    const constraints = [];
    if (minimum) constraints.push('<li>min: <code>' + minimum + '</code></li>');
    if (maximum) constraints.push('<li>max: <code>' + maximum + '</code></li>');
    if (def) constraints.push('<li>default: <code>' + def + '</code></li>');

    html +=
      '<div className="constraints"><ul>' +
      constraints.join('') +
      '</ul></div>';
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
        {{parameterDetailsHelper name=@key type=type minimum=minimum maximum=maximum def=default}}
        {{#if title~}}<p className="title">{{title}}</p>{{~/if}}
        {{#if description~}}<div className="description"><p>{{description}}</p></div>{{~/if}}
        <table className="service-param-children">
          <tbody>
          {{#each properties}}
          <tr>
            <td>
              {{parameterDetailsHelper name=@key parent=@../key type=type minimum=minimum maximum=maximum def=default}}
              {{#if title~}}<p className="title">{{title}}</p>{{~/if}}
              {{#if description~}}<div className="description"><p>{{description}}</p></div>{{~/if}}
            </td>
          </tr>
          {{/each}}
          </tbody>
        </table>
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
