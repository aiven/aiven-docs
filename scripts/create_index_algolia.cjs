const {algoliasearch} = require('algoliasearch');
const fs = require('fs');
const cheerio = require('cheerio');
const path = require('path');
const glob = require('glob');
const crypto = require('crypto');

require('dotenv').config({path: path.resolve(__dirname, '../.env')});
const ALGOLIA_APP_ID = process.env.ALGOLIA_APP_ID;
const ALGOLIA_API_KEY = process.env.ALGOLIA_API_KEY;
const ALGOLIA_INDEX_NAME = process.env.ALGOLIA_INDEX_NAME;

const client = algoliasearch(ALGOLIA_APP_ID, ALGOLIA_API_KEY);

// Function to extract data from HTML files
function extractDataFromHtml(filePath, buildDir, urlBasePath) {
  const html = fs.readFileSync(filePath, 'utf8');
  const $ = cheerio.load(html);
  const title = $('h1').text();
  const body = $(
    'article .theme-doc-markdown p, article .theme-doc-markdown li',
  ).text();

  let relativeFilePath = path.relative(buildDir, filePath);
  relativeFilePath = relativeFilePath.replace(path.sep, '/'); // Ensure forward slashes
  relativeFilePath = relativeFilePath.replace('index.html', ''); // Remove 'index.html'
  relativeFilePath = relativeFilePath.replace('.html', ''); // Remove '.html' from other pages
  const slug = urlBasePath + relativeFilePath; // Prepend the base URL;

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
const urlBasePath = 'https://aiven.io/docs/';

let pages = [];
const excludedPages = ['404.html', 'search.html'];

// Traverse the build directory and extract data from HTML files
glob.sync(buildDir + '/**/*.html').forEach((filePath) => {
  if (!excludedPages.includes(path.basename(filePath))) {
    const pageData = extractDataFromHtml(filePath, buildDir, urlBasePath);
    pages.push(pageData);
  }
});

async function pushToAlgolia() {
  const req = pages.map((page) => ({action: 'addObject', body: page}));

  try {
    const response = await client.batch({
      indexName: ALGOLIA_INDEX_NAME,
      batchWriteParams: {
        requests: req,
      },
    });
    console.log('Data pushed to index successfully:\n', response);
  } catch (error) {
    console.error('Error pushing data to index:\n', error);
  }
}

pushToAlgolia();
