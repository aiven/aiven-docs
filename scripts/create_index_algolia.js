const algoliasearch = require('algoliasearch');
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');
const glob = require('glob');
const crypto = require('crypto');

// Load environment variables
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

// Connect and authenticate with your Algolia app
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);
const index = client.initIndex(ALGOLIA_INDEX_NAME);

// Function to extract data from HTML files
function extractDataFromHtml(filePath, buildDir, urlBasePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html);
  // Extract title and body
  const title = $('h1').text();
  const body = $(
    'article .theme-doc-markdown p, article .theme-doc-markdown li',
  ).text();

  // Construct the slug based on the file path
  let relativeFilePath = path.relative(buildDir, filePath);
  relativeFilePath = relativeFilePath.replace(path.sep, '/'); // Ensure forward slashes
  relativeFilePath = relativeFilePath.replace('index.html', ''); // Remove 'index.html'
  relativeFilePath = relativeFilePath.replace('.html', ''); // Remove '.html' from other pages
  const slug = urlBasePath + relativeFilePath; // Prepend the base URL

  // Use SHA-256 hash of the relative file path as the objectID
  const hash = crypto.createHash('sha256');
  hash.update(relativeFilePath);
  const objectID = hash.digest('hex');

  return {
    objectID,
    title,
    body,
    slug,
    facetingType: 'documentation',
    popularity: 4,
    _type: 'documentation',
    __i18n_lang: 'en',
    isHidden: false,
    endDate_timestemp: 4845516771877, // 100 years from now
  };
}

// Define based path
const buildDir = path.join(__dirname, '..', 'build');
const urlBasePath = 'https://avnsmarketingtest.net/docs/'; // TODO: Change to aiven.io/docs/ when we go live

let pages = [];
// Define a list of pages to exclude
const excludedPages = ['404.html', 'search.html'];

// Traverse the build directory and extract data from HTML files
glob.sync(buildDir + '/**/*.html').forEach((filePath) => {
  // Check if the current file is in the list of excluded pages
  if (!excludedPages.includes(path.basename(filePath))) {
    const pageData = extractDataFromHtml(filePath, buildDir, urlBasePath);
    pages.push(pageData);
  }
});

// Push the data to Algolia
index
  .saveObjects(pages, {autoGenerateObjectIDIfNotExist: true})
  .then(({objectIDs}) => {
    console.log(objectIDs);
  })
  .catch((err) => {
    console.error(err);
  });
