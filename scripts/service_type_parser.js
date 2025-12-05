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

// Helper to render title and description intelligently
handlebars.registerHelper('renderTitleDescription', function(title, description) {
  if (!title && !description) return '';
  
  const titleStr = title ? String(title) : '';
  const descStr = description ? String(description) : '';
  
  if (!titleStr && !descStr) return '';
  if (!titleStr) {
    const escaped = descStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return new handlebars.SafeString(`<div className="description"><p>${escaped}</p></div>`);
  }
  if (!descStr) {
    const escaped = titleStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return new handlebars.SafeString(`<p className="title">${escaped}</p>`);
  }
  
  // Both exist - check for duplicates or overlap
  const titleTrimmed = titleStr.trim();
  const descTrimmed = descStr.trim();
  
  // If identical, show only title
  if (titleTrimmed === descTrimmed) {
    const escaped = titleStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return new handlebars.SafeString(`<p className="title">${escaped}</p>`);
  }
  
  // Check if one contains the other
  const titleLower = titleTrimmed.toLowerCase();
  const descLower = descTrimmed.toLowerCase();
  
  // If title contains description, use only title
  if (titleLower.includes(descLower)) {
    const escaped = titleStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return new handlebars.SafeString(`<p className="title">${escaped}</p>`);
  }
  
  // If description contains title, use only description
  if (descLower.includes(titleLower)) {
    const escaped = descStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return new handlebars.SafeString(`<div className="description"><p>${escaped}</p></div>`);
  }
  
  // Check for significant word overlap (more than 50% of title words in description)
  const titleWords = titleLower.split(/\s+/).filter(w => w.length > 3); // Filter out short words
  const descWords = descLower.split(/\s+/);
  
  if (titleWords.length > 0) {
    const matchingWords = titleWords.filter(word => descWords.includes(word));
    const overlapRatio = matchingWords.length / titleWords.length;
    
    // If more than 60% overlap, the description is likely an expansion of the title
    if (overlapRatio > 0.6) {
      const escaped = descStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
      return new handlebars.SafeString(`<div className="description"><p>${escaped}</p></div>`);
    }
  }
  
  // Both are different and needed
  const escapedTitle = titleStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  const escapedDesc = descStr.replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return new handlebars.SafeString(
    `<p className="title">${escapedTitle}</p><div className="description"><p>${escapedDesc}</p></div>`
  );
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
    
    html += '\n          <tr><td>';
    
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
    
    // Render title and description intelligently
    html += handlebars.helpers.renderTitleDescription(value.title, value.description);
    
    // Close the td/tr before nested table
    html += '</td></tr>';
    
    // Recursively render nested properties
    if (value.properties && Object.keys(value.properties).length > 0) {
      html += '\n          <tr><td><table className="service-param-children"><tbody>';
      html += handlebars.helpers.renderNestedProperties(value.properties, fullParent);
      html += '\n          </tbody></table></td></tr>';
    }
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
        {{{renderTitleDescription title description}}}
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
