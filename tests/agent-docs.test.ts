import { getChecksSorted, runChecks, type CheckResult } from 'afdocs';
import { loadConfig } from 'afdocs/helpers';
import { beforeAll, describe, expect, it } from 'vitest';
import { publishAgentDocsReport } from './helpers/agent-docs-report';

describe('Agent-Friendly Documentation', () => {
  let resultsByCheck: Map<string, CheckResult>;

  beforeAll(async () => {
    const config = await loadConfig('tests');
    const report = await runChecks(config.url, {
      checkIds: config.checks,
      skipCheckIds: config.skipChecks,
      ...config.options,
      samplingStrategy: config.options?.samplingStrategy ??
        (config.pages?.length ? 'curated' : undefined),
      curatedPages: config.pages,
    });
    resultsByCheck = new Map(report.results.map(result => [result.id, result]));
    await publishAgentDocsReport(report);
  }, 120_000);

  for (const check of getChecksSorted()) {
    it(check.id, (context) => {
      const result = resultsByCheck.get(check.id);
      if (!result) {
        context.skip();
        return;
      }

      console.log(`[${result.status}] ${result.message}`);
      expect(['fail', 'error'], result.message).not.toContain(result.status);
    });
  }
});
