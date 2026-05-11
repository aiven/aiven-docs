import fs from 'node:fs/promises';

const LLMS_FILE = 'build/llms.txt';
const baseUrl = process.env.BASEURL || '/docs/';
const FULL_INDEX_URL = `https://aiven.io${baseUrl.replace(/\/$/, '')}/llms-full.txt`;
const MAX_CHARS = 48000;
const FOOTER = [
  '',
  '## Full documentation index',
  '',
  `- ${FULL_INDEX_URL}`,
  '',
].join('\n');
const maxBodyChars = MAX_CHARS - FOOTER.length;

if (maxBodyChars <= 0) {
  throw new Error('MAX_CHARS is too small to fit the required footer.');
}

const content = await fs.readFile(LLMS_FILE, 'utf8');
const lines = content.split('\n');

const trimmedLines = [];
let charCount = 0;

for (const line of lines) {
  const lineLength = line.length + 1;

  if (charCount + lineLength > maxBodyChars) {
    break;
  }

  trimmedLines.push(line);
  charCount += lineLength;
}

const finalContent = `${trimmedLines.join('\n')}${FOOTER}`;

await fs.writeFile(LLMS_FILE, finalContent);

console.log(`Trimmed ${LLMS_FILE} to ${finalContent.length} characters.`);
