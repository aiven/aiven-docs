import fs from 'node:fs/promises';

const LLMS_FILE = 'build/llms.txt';
const baseUrl = process.env.BASEURL || '/docs/';
const FULL_INDEX_URL = `https://aiven.io${baseUrl.replace(/\/$/, '')}/llms-full.txt`;
const MAX_CHARS = 48000;
const FOOTER_HEADING = '## Full documentation index';
const FOOTER = [
  '',
  FOOTER_HEADING,
  '',
  `- ${FULL_INDEX_URL}`,
  '',
].join('\n');
const maxBodyChars = MAX_CHARS - FOOTER.length;

function removeExistingFooter(content) {
  const footerStart = content.indexOf(`\n${FOOTER_HEADING}\n`);

  if (footerStart === -1) {
    return content;
  }

  return content.slice(0, footerStart).trimEnd() + '\n';
}

/** Markdown headings in llms.txt (e.g. ## docs, #### cloudlogging). */
function isSectionHeader(line) {
  return /^#{1,6}\s/.test(line);
}

/** Drop trailing section headers that have no links/content below them after truncation. */
function trimTrailingOrphanHeaders(lines) {
  const trimmed = [...lines];

  while (trimmed.length > 0) {
    while (trimmed.length > 0 && trimmed[trimmed.length - 1].trim() === '') {
      trimmed.pop();
    }

    if (trimmed.length === 0 || !isSectionHeader(trimmed[trimmed.length - 1])) {
      break;
    }

    trimmed.pop();
  }

  return trimmed;
}

async function main() {
  if (maxBodyChars <= 0) {
    throw new Error('MAX_CHARS is too small to fit the required footer.');
  }

  let content;
  try {
    content = await fs.readFile(LLMS_FILE, 'utf8');
  } catch (err) {
    throw new Error(`Failed to read "${LLMS_FILE}": ${err.message}`, {cause: err});
  }

  const lines = removeExistingFooter(content).split('\n');

  const includedLines = [];
  let charCount = 0;

  for (const line of lines) {
    const lineLength = line.length + 1;

    if (charCount + lineLength > maxBodyChars) {
      break;
    }

    includedLines.push(line);
    charCount += lineLength;
  }

  const bodyLines = trimTrailingOrphanHeaders(includedLines);
  const finalContent = `${bodyLines.join('\n')}${FOOTER}`;

  try {
    await fs.writeFile(LLMS_FILE, finalContent);
  } catch (err) {
    throw new Error(`Failed to write "${LLMS_FILE}": ${err.message}`, {cause: err});
  }

  console.log(`Limited ${LLMS_FILE} to ${finalContent.length} characters (max ${MAX_CHARS}).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
