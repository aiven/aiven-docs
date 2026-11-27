const fs = require('fs').promises;
const https = require('https');
const path = require('path');

const tenant = process.env.TENANT_ID;

if (!tenant) {
  console.error('❌ Error: TENANT_ID environment variable is not set.');
  process.exit(1);
}

// API endpoint
const apiEndpoint = `https://api.aiven.io/v1/tenants/${tenant}/pg-available-extensions`;

// Output Markdown file path (relative path)
const markdownFilePath = path.join(
  __dirname,
  '../static/includes/pg-extensions.md',
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

// Whether the API response includes the fields that describe how extensions are installed
function hasInstallationMethod(pgVersions) {
  return pgVersions.some(
    (pgVersion) =>
      Array.isArray(pgVersion.extensions) &&
      pgVersion.extensions.some(
        (extension) => typeof extension.extwlist === 'boolean',
      ),
  );
}

// Installation method of an extension, as described in
// docs/products/postgresql/reference/list-of-extensions.md#installation-methods
function installationMethod(extension) {
  return extension.extwlist ? 'Extension allowlist' : 'Trusted';
}

// Function to generate a Markdown table for a specific PostgreSQL version
function generateMarkdownTableForVersion(pgVersion, showInstallationMethod) {
  let markdown = `## PostgreSQL ${pgVersion.version} extensions\n\n`;
  if (showInstallationMethod) {
    markdown +=
      '| Extension name | Default version | Supported versions | Installation method |\n';
    markdown +=
      '|----------------|-----------------|--------------------|---------------------|\n';
  } else {
    markdown += '| Extension name | Default version | Supported versions |\n';
    markdown += '|----------------|-----------------|--------------------|\n';
  }

  if (!pgVersion.extensions || !Array.isArray(pgVersion.extensions)) {
    console.error(
      `⚠️ Unexpected API response structure for version ${pgVersion.version}. "extensions" field is missing or not an array.`,
    );
    return markdown;
  }

  pgVersion.extensions.forEach((extension) => {
    const defaultVersion = extension.default_version || 'N/A';
    const versions = extension.versions && Array.isArray(extension.versions)
      ? extension.versions.join(', ')
      : 'N/A';
    if (showInstallationMethod) {
      markdown += `| ${extension.name} | ${defaultVersion} | ${versions} | ${installationMethod(extension)} |\n`;
    } else {
      markdown += `| ${extension.name} | ${defaultVersion} | ${versions} |\n`;
    }
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

    if (!json.pg || !Array.isArray(json.pg)) {
      console.error(
        '⚠️ Unexpected API response structure. "pg" field is missing or not an array.',
      );
      return;
    }

    // Filter out PostgreSQL 12 and sort remaining versions in decreasing order
    const filteredVersions = json.pg.filter(
      (pgVersion) => pgVersion.version !== '12',
    );
    filteredVersions.sort(
      (a, b) => parseFloat(b.version) - parseFloat(a.version),
    );

    const showInstallationMethod = hasInstallationMethod(filteredVersions);

    let markdownContent = '<!-- vale off -->\n\n';

    if (showInstallationMethod) {
      markdownContent +=
        'For what each installation method means, see\n' +
        '[Installation methods](/docs/products/postgresql/reference/list-of-extensions#installation-methods).\n\n';
    }

    filteredVersions.forEach((pgVersion) => {
      markdownContent += generateMarkdownTableForVersion(
        pgVersion,
        showInstallationMethod,
      );
      markdownContent += '\n'; // Add spacing between tables
    });

    await fs.writeFile(markdownFilePath, markdownContent, 'utf8');
    console.log(`👌 Markdown content written to ${markdownFilePath}`);
  } catch (err) {
    console.error('Error:', err.message);
  }
}

generateMarkdown();
