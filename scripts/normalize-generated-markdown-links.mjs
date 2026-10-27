import fs from 'node:fs/promises';
import path from 'node:path';

const BUILD_DIR = 'build';
const baseUrl = process.env.BASEURL || '/docs/';
const basePath = new URL(baseUrl, 'https://aiven.io').pathname.replace(/\/+$/, '');

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
  if (!basePath || basePath === '/') {
    console.log('Skipped Markdown link normalization because BASEURL has no path prefix.');
    return;
  }

  const escapedBasePath = basePath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const duplicateAbsolutePrefix = new RegExp(
    `(https://aiven\\.io${escapedBasePath})${escapedBasePath}(?=/|[?#)\\s]|$)`,
    'g',
  );
  const duplicateRootRelativePrefix = new RegExp(
    `(^|[\\s(\\[<])(${escapedBasePath})${escapedBasePath}(?=/|[?#)\\s]|$)`,
    'gm',
  );

  const files = await findMarkdownFiles(BUILD_DIR);
  let modified = 0;

  for (const file of files) {
    const content = await fs.readFile(file, 'utf8');
    const normalized = content
      .replace(duplicateAbsolutePrefix, '$1')
      .replace(duplicateRootRelativePrefix, '$1$2');

    if (normalized !== content) {
      await fs.writeFile(file, normalized);
      modified++;
    }
  }

  console.log(`Normalized duplicated base URL prefixes in ${modified}/${files.length} markdown files.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
