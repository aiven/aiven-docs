//
// Generates a Markdown file from the given service's description.
// The output is meant to be included in docs pages such as docs/products/m3db/reference/advanced-params.md
//

const axios = require('axios');
const fs = require('fs');
const handlebars = require('handlebars');

handlebars.registerHelper('parameterDetailsHelper', function (options) {
  var name = options.hash.name;
  var parent = options.hash.parent;
  var type = options.hash.type;
  var minimum = options.hash.minimum;
  var maximum = options.hash.maximum;
  var def = options.hash.def;

  var html = '<div class="param">';
  if (parent) {
    html += '<p class="name"><strong>' + parent + '.' + name + '</strong></p>';
  } else {
    html += '<p class="name"><strong>' + name + '</strong></p>';
  }
  html += '<p><code class="type">' + type + '</code></p>';
  html += '</div>';
  if (minimum || maximum || def) {
    html += '<div class="constraints"><ul>';
    if (minimum) {
      html += '<li>min: <code>' + minimum + '</code></li>';
    }
    if (maximum) {
      html += '<li>max: <code>' + maximum + '</code></li>';
    }
    if (def) {
      html += '<li>default: <code>' + def + '</code></li>';
    }
    html += '</ul></div>';
  }

  return new handlebars.SafeString(html);
});

handlebars.registerHelper('or', function (a, b) {
  return a || b;
});

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

async function fetchData(serviceName, outputFileName) {
  try {
    const response = await axios.get('https://api.aiven.io/v1/service_types');
    const data = response.data;

    // Find the service by name
    const selectedService = data.service_types[serviceName];

    if (!selectedService) {
      console.error(`🤷‍♂️ Service '${serviceName}' not found.`);
      process.exitCode = 1;
      return;
    }

    const templateSource = `
<!-- vale off -->
<table class="service-param">
  <thead>
    <tr><th>Parameter</th></tr>
  </thead>
  <tbody>
  {{~#each user_config_schema.properties}}
    <tr>
      <td>
        {{parameterDetailsHelper name=@key type=type minimum=minimum maximum=maximum def=default}}
        {{#if title~}}<p class="title">{{title}}</p>{{~/if}}
        {{#if description~}}<div class="description"><p>{{description}}</p></div>{{~/if}}
        <table class="service-param-children">
          <tbody>
          {{#each properties}}
          <tr>
            <td>
              {{parameterDetailsHelper name=@key parent=@../key type=type minimum=minimum maximum=maximum def=default}}
              {{#if title~}}<p class="title">{{title}}</p>{{~/if}}
              {{#if description~}}<div class="description"><p>{{description}}</p></div>{{~/if}}
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
    console.error('⚠️ Error fetching data:', error.message);
  }
}

// Read the service name and output file name from the command-line arguments
const [, , serviceName, outputFileName] = process.argv;

// Check if both service name and output file name are provided
if (!serviceName || !outputFileName) {
  console.error('⚠️ Provide a _service name_ AND an output file name.');
} else {
  // Call the async function with the provided service name and output file name
  fetchData(serviceName, outputFileName);
}
