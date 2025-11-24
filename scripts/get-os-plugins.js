const fs = require('fs').promises;
const https = require('https');
const path = require('path');

const tenant = process.env.TENANT_ID;

if (!tenant) {
  console.error('❌ Error: TENANT_ID environment variable is not set.');
  process.exit(1);
}

// API endpoint
const apiEndpoint = `https://api.aiven.io/v1/tenants/${tenant}/os-available-plugins`;

// Output Markdown file path (relative path)
const markdownFilePath = path.join(
  __dirname,
  '../static/includes/os-plugins.md',
);

// Helper function to fetch data from the API
function fetchData(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = '';
        res.on('data', (chunk) => (data += chunk));
        res.on('end', () => resolve(data));
        res.on('error', (err) => reject(err));
      })
      .on('error', (err) => reject(err));
  });
}

// Function to generate a Markdown table for a specific OpenSearch version
function generateMarkdownTableForVersion(osVersion) {
  let markdown = `## OpenSearch ${osVersion.version} plugins\n\n`;
  markdown += '| Plugin name | Default version | Supported versions |\n';
  markdown += '|-------------|-----------------|--------------------|\n';

  if (!osVersion.plugins || !Array.isArray(osVersion.plugins)) {
    console.error(
      `⚠️ Unexpected API response structure for version ${osVersion.version}. "plugins" field is missing or not an array.`,
    );
    return markdown;
  }

  osVersion.plugins.forEach((plugin) => {
    const defaultVersion = plugin.default_version || 'N/A';
    const versions =
      plugin.versions && Array.isArray(plugin.versions)
        ? plugin.versions.join(', ')
        : 'N/A';
    markdown += `| ${plugin.name} | ${defaultVersion} | ${versions} |\n`;
  });

  return markdown;
}

// Main function to fetch data and write Markdown
async function generateMarkdown() {
  try {
    const data = await fetchData(apiEndpoint);
    const json = JSON.parse(data);

    if (json.errors && json.errors.length > 0) {
      console.error('API returned errors:', json.errors);
      return;
    }

    if (!json.os || !Array.isArray(json.os)) {
      console.error(
        '⚠️ Unexpected API response structure. "os" field is missing or not an array.',
      );
      return;
    }

    // Sort versions in decreasing order
    json.os.sort((a, b) => parseFloat(b.version) - parseFloat(a.version));

    let markdownContent = '<!-- vale off -->\n\n';

    json.os.forEach((osVersion) => {
      markdownContent += generateMarkdownTableForVersion(osVersion);
      markdownContent += '\n'; // Add spacing between tables
    });

    await fs.writeFile(markdownFilePath, markdownContent, 'utf8');
    console.log(`👌 Markdown content written to ${markdownFilePath}`);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

generateMarkdown();
