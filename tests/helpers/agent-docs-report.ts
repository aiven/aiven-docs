import { appendFile, mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { computeScore, type ReportResult } from 'afdocs';

export async function publishAgentDocsReport(
  report: ReportResult,
  outputDirectory = 'reports/agent-docs',
): Promise<void> {
  const score = computeScore(report);
  await mkdir(outputDirectory, { recursive: true });
  await writeFile(
    join(outputDirectory, 'report.json'),
    JSON.stringify({ report, score }, null, 2) + '\n',
  );

  const summary = [
    '## AFDocs agent-friendliness',
    '',
    `URL: ${report.url}`,
    `Scan time: ${report.timestamp}`,
    '',
    `Score: ${score.overall}/100 (${score.grade})`,
    '',
    `${report.summary.pass} passed, ${report.summary.warn} warnings, ` +
      `${report.summary.fail} failed, ${report.summary.error} errors, ` +
      `${report.summary.skip} skipped.`,
    '',
    '| Category | Score | Grade |',
    '| --- | --- | --- |',
    ...Object.entries(score.categoryScores).map(([category, result]) =>
      `| ${category} | ${result.score === null ? 'N/A' : `${result.score}/100`} | ${result.grade ?? 'N/A'} |`,
    ),
    '',
    'N/A indicates insufficient data for a category score.',
    '',
  ].join('\n');

  console.log(summary);
  if (process.env.GITHUB_STEP_SUMMARY) {
    await appendFile(process.env.GITHUB_STEP_SUMMARY, summary);
  }
}
