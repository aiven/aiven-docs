import React, { useState } from 'react';
import styles from './styles.module.css';

export const SCOPE_OPTIONS = ['pg', 'kafka', 'integrations'] as const;
export type Scope = typeof SCOPE_OPTIONS[number];
type ScopeChoice = Scope | 'all';

const SCOPE_LABELS: Record<ScopeChoice, string> = {
  all: 'All',
  pg: 'PostgreSQL',
  kafka: 'Kafka',
  integrations: 'Integrations',
};

const ALL_CHOICES: ScopeChoice[] = ['all', ...SCOPE_OPTIONS];

type WriteToolGroup = {
  label: string;
  tools: { name: string; label: string }[];
};

// Write/destructive tools that `read_only=true` would otherwise block. Grouped to match
// the docs' per-service sections so customers can carve out exceptions (e.g. allow topic
// creation while keeping everything else read-only).
export const WRITE_TOOL_GROUPS: WriteToolGroup[] = [
  {
    label: 'Core',
    tools: [
      { name: 'aiven_service_create', label: 'Create service' },
      { name: 'aiven_service_update', label: 'Update service' },
    ],
  },
  {
    label: 'PostgreSQL',
    tools: [
      { name: 'aiven_pg_write', label: 'Run write SQL (DML/DDL)' },
      { name: 'aiven_pg_bouncer_create', label: 'Create connection pool' },
      { name: 'aiven_pg_bouncer_update', label: 'Update connection pool' },
      { name: 'aiven_pg_bouncer_delete', label: 'Delete connection pool' },
    ],
  },
  {
    label: 'Kafka',
    tools: [
      { name: 'aiven_kafka_topic_create', label: 'Create topic' },
      { name: 'aiven_kafka_topic_update', label: 'Update topic' },
      { name: 'aiven_kafka_topic_delete', label: 'Delete topic' },
      { name: 'aiven_kafka_topic_message_produce', label: 'Produce messages' },
      { name: 'aiven_kafka_connect_create_connector', label: 'Create connector' },
      { name: 'aiven_kafka_connect_edit_connector', label: 'Edit connector' },
      { name: 'aiven_kafka_connect_pause_connector', label: 'Pause connector' },
      { name: 'aiven_kafka_connect_resume_connector', label: 'Resume connector' },
      { name: 'aiven_kafka_connect_restart_connector', label: 'Restart connector' },
      { name: 'aiven_kafka_connect_delete_connector', label: 'Delete connector' },
    ],
  },
  {
    label: 'Integrations',
    tools: [
      { name: 'aiven_service_integration_create', label: 'Create integration' },
      { name: 'aiven_service_integration_update', label: 'Update integration' },
      { name: 'aiven_service_integration_delete', label: 'Delete integration' },
    ],
  },
  {
    label: 'Application',
    tools: [
      { name: 'aiven_application_deploy', label: 'Deploy application' },
      { name: 'aiven_application_redeploy', label: 'Redeploy application' },
    ],
  },
];

export const MARKETPLACE_OPTIONS = ['aws', 'azure', 'gcp'] as const;
export type Marketplace = typeof MARKETPLACE_OPTIONS[number];

const MARKETPLACE_LABELS: Record<'' | Marketplace, string> = {
  '': 'None (Aiven)',
  aws: 'AWS Marketplace',
  azure: 'Azure Marketplace',
  gcp: 'Google Cloud Marketplace',
};

export type MCPConfigState = {
  readOnly: boolean;
  scopes: Scope[];
  marketplace: '' | Marketplace;
  allowSecrets: boolean;
  writeAllowlist: string[];
};

type MCPConfigToggleProps = {
  onChange?: (state: MCPConfigState) => void;
};

export default function MCPConfigToggle({ onChange }: MCPConfigToggleProps): JSX.Element {
  const [readOnly, setReadOnly] = useState(false);
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [marketplace, setMarketplace] = useState<'' | Marketplace>('');
  const [allowSecrets, setAllowSecrets] = useState(false);
  const [writeAllowlist, setWriteAllowlist] = useState<string[]>([]);

  const emit = (next: MCPConfigState) => onChange?.(next);

  const handleReadOnly = (checked: boolean) => {
    setReadOnly(checked);
    if (!checked) {
      setWriteAllowlist([]);
      emit({ readOnly: checked, scopes, marketplace, allowSecrets, writeAllowlist: [] });
      return;
    }
    emit({ readOnly: checked, scopes, marketplace, allowSecrets, writeAllowlist });
  };

  const handleScope = (choice: ScopeChoice, checked: boolean) => {
    let next: Scope[];
    if (choice === 'all') {
      next = [];
    } else if (checked) {
      next = [...scopes, choice];
    } else {
      next = scopes.filter((s) => s !== choice);
    }
    setScopes(next);
    emit({ readOnly, scopes: next, marketplace, allowSecrets, writeAllowlist });
  };

  const handleMarketplace = (value: '' | Marketplace) => {
    setMarketplace(value);
    emit({ readOnly, scopes, marketplace: value, allowSecrets, writeAllowlist });
  };

  const handleAllowSecrets = (checked: boolean) => {
    setAllowSecrets(checked);
    emit({ readOnly, scopes, marketplace, allowSecrets: checked, writeAllowlist });
  };

  const handleWriteAllowlist = (toolName: string, checked: boolean) => {
    const next = checked
      ? [...writeAllowlist, toolName]
      : writeAllowlist.filter((t) => t !== toolName);
    setWriteAllowlist(next);
    emit({ readOnly, scopes, marketplace, allowSecrets, writeAllowlist: next });
  };

  const isChecked = (choice: ScopeChoice): boolean =>
    choice === 'all' ? scopes.length === 0 : scopes.includes(choice);

  // Core/Application tools aren't gated by services_scope, so their write exceptions
  // always show. Other groups only show when their scope is selected (or no scope filter).
  const GROUP_SCOPE: Record<string, Scope | null> = {
    Core: null,
    PostgreSQL: 'pg',
    Kafka: 'kafka',
    Integrations: 'integrations',
    Application: null,
  };
  const visibleWriteGroups = WRITE_TOOL_GROUPS.filter((group) => {
    const groupScope = GROUP_SCOPE[group.label];
    return groupScope === null || scopes.length === 0 || scopes.includes(groupScope);
  });

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <label className={styles.option}>
          <input
            type="checkbox"
            checked={readOnly}
            onChange={(e) => handleReadOnly(e.target.checked)}
            className={styles.checkbox}
          />
          <span>Read-only mode (no create, update, or delete)</span>
        </label>
      </div>
      {!readOnly && (
        <p className={styles.warning} role="alert">
          ⚠ With read-only mode disabled, the assistant can create, modify, and delete services and data.
          {' '}
          <a href="#security-and-responsibility">Review security and responsibility</a>.
        </p>
      )}

      <details className={styles.disclosure}>
        <summary className={styles.summary}>Advanced settings</summary>
        <div className={styles.disclosureBody}>
          {readOnly && (
            <details className={styles.disclosure}>
              <summary className={styles.summary}>
                Allow specific write tools in read-only mode
                {writeAllowlist.length > 0 ? ` (${writeAllowlist.length} selected)` : ''}
              </summary>
              <div className={styles.disclosureBody}>
                <p className={styles.hint}>
                  Everything stays read-only except the tools you check below — for example,
                  allow topic creation while blocking every other write.
                </p>
                {visibleWriteGroups.map((group) => (
                  <div key={group.label} className={styles.writeGroup}>
                    <span className={styles.writeGroupLabel}>{group.label}</span>
                    <div className={styles.scopeRow}>
                      {group.tools.map((tool) => (
                        <label key={tool.name} className={styles.option}>
                          <input
                            type="checkbox"
                            checked={writeAllowlist.includes(tool.name)}
                            onChange={(e) => handleWriteAllowlist(tool.name, e.target.checked)}
                            className={styles.checkbox}
                          />
                          <span>{tool.label}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </details>
          )}

          <div className={styles.separator} aria-hidden="true" />

          <div className={styles.section}>
            <span className={styles.sectionLabel}>Available tools</span>
            <div className={styles.scopeRow}>
              {ALL_CHOICES.map((choice) => (
                <label key={choice} className={styles.option}>
                  <input
                    type="checkbox"
                    checked={isChecked(choice)}
                    onChange={(e) => handleScope(choice, e.target.checked)}
                    className={styles.checkbox}
                  />
                  <span>{SCOPE_LABELS[choice]}</span>
                </label>
              ))}
            </div>
          </div>

          <div className={styles.separator} aria-hidden="true" />

          <div className={styles.section}>
            <span className={styles.sectionLabel}>Development</span>
            <label className={styles.option}>
              <input
                type="checkbox"
                checked={allowSecrets}
                onChange={(e) => handleAllowSecrets(e.target.checked)}
                className={styles.checkbox}
              />
              <span>Allow connection credentials (development only)</span>
            </label>
          </div>
          {allowSecrets && (
            <p className={styles.warning} role="alert">
              ⚠ This shares PostgreSQL and Kafka connection credentials with the AI agent,
              including URIs, passwords, and certificates, so it can connect to your services.
              Do not enable it in production.{' '}
              <a href="#security-and-responsibility">Review the security implications</a>.
            </p>
          )}

          <div className={styles.separator} aria-hidden="true" />

          <div className={styles.section}>
            <span className={styles.sectionLabel}>Marketplace</span>
            <select
              value={marketplace}
              onChange={(e) => handleMarketplace(e.target.value as '' | Marketplace)}
              className={styles.select}
            >
              {(['', ...MARKETPLACE_OPTIONS] as const).map((value) => (
                <option key={value} value={value}>{MARKETPLACE_LABELS[value]}</option>
              ))}
            </select>
          </div>
          <p className={styles.hint}>
            Select your marketplace only if you subscribed to Aiven through AWS, Azure, or Google
            Cloud Marketplace. This helps you sign in to the correct console.
          </p>
        </div>
      </details>
    </div>
  );
}

export function buildMcpUrl(baseUrl: string, state: MCPConfigState): string {
  // The marketplace tenant is a path segment (e.g. `/mcp/gcp`); scopes and read-only are
  // query parameters.
  const url = state.marketplace ? `${baseUrl}/${state.marketplace}` : baseUrl;
  const params = new URLSearchParams();
  if (state.scopes.length > 0) params.set('services_scope', state.scopes.join(','));
  if (state.readOnly) params.set('read_only', 'true');
  if (state.readOnly && state.writeAllowlist.length > 0) {
    params.set('write_allowlist', state.writeAllowlist.join(','));
  }
  if (state.allowSecrets) params.set('allow_secrets', 'true');
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}
