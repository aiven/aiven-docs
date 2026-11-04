import { getChecksSorted, runChecks } from 'afdocs';
import { loadConfig } from 'afdocs/helpers';
import { publishAgentDocsReport } from '../tests/helpers/agent-docs-report.ts';

async function main() {
  try {
    console.log('Starting agent-friendly documentation checks...\n');

    const config = await loadConfig('tests');
    const report = await runChecks(config.url, {
      checkIds: config.checks,
      skipCheckIds: config.skipChecks,
      ...config.options,
      samplingStrategy:
        config.options?.samplingStrategy ??
        (config.pages?.length ? 'curated' : undefined),
      curatedPages: config.pages,
    });

    const resultsByCheck = new Map(
      report.results.map((result) => [result.id, result]),
    );

    // Generate and publish the AFDocs report
    await publishAgentDocsReport(report);

    // Check for failures
    let hasFailures = false;
    const failedChecks = [];

    for (const check of getChecksSorted()) {
      const result = resultsByCheck.get(check.id);
      if (!result) {
        continue;
      }

      if (result.status === 'fail' || result.status === 'error') {
        hasFailures = true;
        failedChecks.push(result);
        console.error(
          `[${result.status.toUpperCase()}] ${check.id}: ${result.message}`,
        );
      } else if (result.status === 'warn') {
        console.warn(`[WARN] ${check.id}: ${result.message}`);
      } else {
        console.log(`[${result.status.toUpperCase()}] ${check.id}`);
      }
    }

    console.log('\n' + '='.repeat(60));

    if (hasFailures) {
      console.error(
        `\n❌ Documentation checks failed: ${failedChecks.length} issue(s) found`,
      );
      process.exit(1);
    } else {
      console.log('\n✅ All documentation checks passed!');
      process.exit(0);
    }
  } catch (error) {
    console.error('Error running agent documentation checks:', error);
    process.exit(1);
  }
}

main();
