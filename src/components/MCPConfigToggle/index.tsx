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
};

type MCPConfigToggleProps = {
  onChange?: (state: MCPConfigState) => void;
};

export default function MCPConfigToggle({ onChange }: MCPConfigToggleProps): JSX.Element {
  const [readOnly, setReadOnly] = useState(true);
  const [scopes, setScopes] = useState<Scope[]>([]);
  const [marketplace, setMarketplace] = useState<'' | Marketplace>('');
  const [allowSecrets, setAllowSecrets] = useState(false);

  const emit = (next: MCPConfigState) => onChange?.(next);

  const handleReadOnly = (checked: boolean) => {
    setReadOnly(checked);
    emit({ readOnly: checked, scopes, marketplace, allowSecrets });
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
    emit({ readOnly, scopes: next, marketplace, allowSecrets });
  };

  const handleMarketplace = (value: '' | Marketplace) => {
    setMarketplace(value);
    emit({ readOnly, scopes, marketplace: value, allowSecrets });
  };

  const handleAllowSecrets = (checked: boolean) => {
    setAllowSecrets(checked);
    emit({ readOnly, scopes, marketplace, allowSecrets: checked });
  };

  const isChecked = (choice: ScopeChoice): boolean =>
    choice === 'all' ? scopes.length === 0 : scopes.includes(choice);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <span className={styles.sectionLabel}>Permissions</span>
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
          ⚠ Write mode lets the assistant create, modify, and delete services and data.
          {' '}
          <a href="#security-and-responsibility">Review security and responsibility</a>.
        </p>
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

      <details className={styles.disclosure}>
        <summary className={styles.summary}>Subscribed through a cloud marketplace?</summary>
        <div className={styles.disclosureBody}>
          <label className={styles.option}>
            <span>Marketplace</span>
            <select
              value={marketplace}
              onChange={(e) => handleMarketplace(e.target.value as '' | Marketplace)}
              className={styles.select}
            >
              {(['', ...MARKETPLACE_OPTIONS] as const).map((value) => (
                <option key={value} value={value}>{MARKETPLACE_LABELS[value]}</option>
              ))}
            </select>
          </label>
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
  if (state.allowSecrets) params.set('allow_secrets', 'true');
  const qs = params.toString();
  return qs ? `${url}?${qs}` : url;
}
