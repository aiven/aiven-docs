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

// Helper function to extract major.minor version from a single version string
function getMajorMinorVersion(version) {
  if (!version) return 'N/A';
  const parts = version.split('.');
  if (parts.length >= 2) {
    return `${parts[0]}.${parts[1]}`;
  }
  return version;
}

// Helper function to process version(s) - handles single version, array, or comma-separated string
function processVersions(versionData) {
  if (!versionData) return 'N/A';

  // If it's an array, process each version
  if (Array.isArray(versionData)) {
    return versionData.map((v) => getMajorMinorVersion(v)).join(', ');
  }

  // If it's a string that might contain commas, split and process each
  if (typeof versionData === 'string') {
    if (versionData.includes(',')) {
      return versionData
        .split(',')
        .map((v) => getMajorMinorVersion(v.trim()))
        .join(', ');
    }
    return getMajorMinorVersion(versionData);
  }

  return 'N/A';
}

// Function to generate a Markdown table for a specific OpenSearch version
function generateMarkdownTableForVersion(osVersion) {
  let markdown = `## OpenSearch ${osVersion.version} plugins\n\n`;
  markdown += '| Plugin name | Supported version |\n';
  markdown += '|-------------|-------------------|\n';

  if (!osVersion.plugins || !Array.isArray(osVersion.plugins)) {
    console.error(
      `⚠️ Unexpected API response structure for version ${osVersion.version}. "plugins" field is missing or not an array.`,
    );
    return markdown;
  }

  osVersion.plugins.forEach((plugin) => {
    const versions = processVersions(plugin.version || plugin.versions);
    markdown += `| ${plugin.name} | ${versions} |\n`;
  });

  return markdown;
}

// Main function to fetch data and write Markdown
async function generateMarkdown() {
  try {
    const data = await fetchData(apiEndpoint);
    const json = JSON.parse(data);

    if (json.errors && json.errors.length > 0) {
      console.error('❌ API returned errors:', json.errors);
      return;
    }

    if (!json.opensearch || !Array.isArray(json.opensearch)) {
      console.error(
        '⚠️ Unexpected API response structure. "opensearch" field is missing or not an array.',
      );
      return;
    }

    // Filter out OpenSearch version 3
    const filteredVersions = json.opensearch.filter(
      (osVersion) => osVersion.version !== '3',
    );

    // Sort versions in decreasing order
    filteredVersions.sort(
      (a, b) => parseFloat(b.version) - parseFloat(a.version),
    );

    let markdownContent = '<!-- vale off -->\n\n';

    filteredVersions.forEach((osVersion) => {
      markdownContent += generateMarkdownTableForVersion(osVersion);
      markdownContent += '\n'; // Add spacing between tables
    });

    await fs.writeFile(markdownFilePath, markdownContent, 'utf8');
    console.log(`👌 Markdown content written to ${markdownFilePath}`);
  } catch (err) {
    console.error('❌ Error:', err.message);
  }
}

generateMarkdown();
