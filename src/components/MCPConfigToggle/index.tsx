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

export type MCPConfigState = {
  readOnly: boolean;
  scopes: Scope[];
};

type MCPConfigToggleProps = {
  onChange?: (state: MCPConfigState) => void;
};

export default function MCPConfigToggle({ onChange }: MCPConfigToggleProps): JSX.Element {
  const [readOnly, setReadOnly] = useState(true);
  const [scopes, setScopes] = useState<Scope[]>([]);

  const emit = (next: MCPConfigState) => onChange?.(next);

  const handleReadOnly = (checked: boolean) => {
    setReadOnly(checked);
    emit({ readOnly: checked, scopes });
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
    emit({ readOnly, scopes: next });
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
    </div>
  );
}

export function buildMcpUrl(baseUrl: string, state: MCPConfigState): string {
  const params = new URLSearchParams();
  if (state.scopes.length > 0) params.set('services_scope', state.scopes.join(','));
  if (state.readOnly) params.set('read_only', 'true');
  const qs = params.toString();
  return qs ? `${baseUrl}?${qs}` : baseUrl;
}
