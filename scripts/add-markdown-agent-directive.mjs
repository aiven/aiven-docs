import fs from 'node:fs/promises';
import path from 'node:path';

const BUILD_DIR = 'build';
const baseUrl = process.env.BASEURL || '/docs/';
const llmsTxtUrl = `${baseUrl.replace(/\/$/, '')}/llms.txt`;
const DIRECTIVE = `> For the complete documentation index, see [llms.txt](${llmsTxtUrl}).\n\n`;

async function findMarkdownFiles(dir) {
  let entries;
  try {
    entries = await fs.readdir(dir, {withFileTypes: true});
  } catch (err) {
    throw new Error(`Failed to read directory ${dir}: ${err.message}`, {cause: err});
  }

  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await findMarkdownFiles(fullPath)));
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath);
    }
  }

  return files;
}

async function main() {
  const files = await findMarkdownFiles(BUILD_DIR);
  let modified = 0;

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');

    if (!content.startsWith(DIRECTIVE)) {
      await fs.writeFile(file, DIRECTIVE + content);
      modified++;
    }
  }

  console.log(`Added directive to ${modified}/${files.length} markdown files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
