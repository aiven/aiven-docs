import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import MCPConfigToggle, { buildMcpUrl, type MCPConfigState } from '../MCPConfigToggle';
import styles from './styles.module.css';

type MCPConfigSectionProps = {
  baseUrl: string;
  format: 'json' | 'bash';
  configTemplate: (url: string) => any;
};

export default function MCPConfigSection({ baseUrl, format, configTemplate }: MCPConfigSectionProps): JSX.Element {
  const [state, setState] = useState<MCPConfigState>({
    readOnly: false,
    scopes: [],
    marketplace: '',
    allowSecrets: false,
    writeAllowlist: [],
  });

  const url = buildMcpUrl(baseUrl, state);
  const config = configTemplate(url);
  const content = format === 'json' ? JSON.stringify(config, null, 2) : config;
  const cacheKey = `${format}-${state.readOnly}-${state.scopes.join(',')}-${state.marketplace}-${state.allowSecrets}-${state.writeAllowlist.join(',')}`;

  return (
    <div className={styles.container}>
      <MCPConfigToggle onChange={setState} />
      <CodeBlock language={format} key={cacheKey}>{content}</CodeBlock>
    </div>
  );
}
