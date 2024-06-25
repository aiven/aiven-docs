//
// Generates a Markdown file from the given service's description.
// The output is meant to be included in docs pages such as docs/products/m3db/reference/advanced-params.md
//

const axios = require('axios');
const fs = require('fs');
const handlebars = require('handlebars');

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
{{~#each user_config_schema.properties}}
<tr>
  <td>
    <p class="name">
      <b>{{@key}}</b>&nbsp;<code class="type">{{type}}</code>
      {{#if (or minimum maximum)}}
        <div class="constraints">
          {{#if minimum}}
            min: <code>{{minimum}}</code>
          {{/if}}
          {{#if maximum}}
            max: <code>{{maximum}}</code>
          {{/if}}
        </div>
      {{/if}}
    </p>
    {{#if title~}}<p class="title">{{title}}</p>{{~/if}}
    <div class="description">{{description}}</div>
    <table class="service-param-children">
      {{#each properties}}
      <tr>
        <td>
          <p class="name">
            <b>{{@key}}</b>&nbsp;<code class="type">{{type}}</code>
            {{#if (or minimum maximum)}}
            <div class="constraints">
              {{#if minimum}}
                min: <code>{{minimum}}</code>
              {{/if}}
              {{#if maximum}}
                max: <code>{{maximum}}</code>
              {{/if}}
            </div>
            {{/if}}
          </p>
          {{#if title~}}<p class="title">{{title}}</p>{{~/if}}
          <div class="description">{{description}}</div>
        </td>
      </tr>
      {{/each}}
</table>
  </td>
</tr>
{{/each}}
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
