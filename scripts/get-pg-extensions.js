const axios = require('axios');
const fs = require('fs');

// Fetch PostgreSQL extensions and generate a Markdown table
async function fetchPostgreSQLExtensions() {
  const project = process.env.AIVEN_PROJECT;
  const service = process.env.AIVEN_SERVICE;

  if (!project || !service) {
    console.error(
      '⚠️ AIVEN_PROJECT or AIVEN_SERVICE environment variable is not set.',
    );
    process.exit(1);
  }

  const apiUrl = `https://api.aiven.io/v1/project/${project}/service/${service}/pg/available-extensions`;
  const apiToken = process.env.API_TOKEN;
  if (!apiToken) {
    console.error('⚠️ API_TOKEN environment variable is not set.');
    process.exit(1);
  }

  try {
    const response = await axios.get(apiUrl, {
      headers: {
        Authorization: `aivenv1 ${apiToken}`, // Updated to use the correct authorization format
      },
    });

    const extensions = response.data.extensions;
    if (!extensions || extensions.length === 0) {
      console.error('⚠️ No extensions found in the response.');
      return;
    }

    // Generate Markdown table
    const markdownTable = `
<!-- vale off -->
| Extension Name | Default Version | Description |
|----------------|-----------------|-------------|
${extensions
  .map(
    (ext) =>
      `| ${ext.name} | ${ext.default_version || 'N/A'} | ${
        ext.description || 'N/A'
      } |`,
  )
  .join('\n')}
`;

    // Write the Markdown table to a file
    const outputFileName = 'static/includes/pg-extensions.md';
    const outputDir = 'static/includes';

    // Ensure the directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, {recursive: true});
    }

    fs.writeFileSync(outputFileName, markdownTable.trim());
    console.log(`👌 PostgreSQL extensions table written to ${outputFileName}`);
  } catch (error) {
    console.error('⚠️ Error fetching PostgreSQL extensions:', error.message);
  }
}

// Execute the function
fetchPostgreSQLExtensions();
