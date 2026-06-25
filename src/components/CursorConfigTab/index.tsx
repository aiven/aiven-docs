import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import MCPConfigToggle, { buildMcpUrl, type MCPConfigState } from '../MCPConfigToggle';
import CursorIcon from '@site/static/images/icons/cursor.svg';
import styles from './styles.module.css';

type CursorConfigTabProps = {
  baseUrl: string;
};

export default function CursorConfigTab({ baseUrl }: CursorConfigTabProps): JSX.Element {
  const [state, setState] = useState<MCPConfigState>({ readOnly: false, scopes: [], marketplace: '', allowSecrets: false });

  const url = buildMcpUrl(baseUrl, state);
  const configJson = JSON.stringify({ mcpServers: { aiven: { type: 'http', url } } }, null, 2);

  const cursorConfig = { url, type: 'http' };
  const encodedConfig = typeof btoa !== 'undefined' ? btoa(JSON.stringify(cursorConfig)) : '';
  const deepLink = `cursor://anysphere.cursor-deeplink/mcp/install?name=aiven-mcp&config=${encodedConfig}`;
  const cacheKey = `${state.readOnly}-${state.scopes.join(',')}-${state.marketplace}-${state.allowSecrets}`;

  return (
    <div className={styles.container}>
      <p>For one-click installation:</p>
      <a href={deepLink} className={`aiven-btn-link ${styles.button}`} key={`cursor-deeplink-${cacheKey}`}>
        <CursorIcon />
        <span>Add to Cursor</span>
      </a>

      <div className={styles.manualSetup}>
        <p>To add the server manually:</p>
        <ol>
          <li>In your project root, create or edit the <code>.cursor/mcp.json</code> file.</li>
          <li>Choose your options below, then copy the generated configuration into the file:</li>
        </ol>
        <MCPConfigToggle onChange={setState} />
        <CodeBlock language="json" key={`cursor-config-${cacheKey}`}>{configJson}</CodeBlock>
        <ol start={3}>
          <li>Save the file.</li>
          <li>Restart Cursor.</li>
          <li>Open <strong>Settings</strong> &gt; <strong>Tools &amp; MCP</strong>.</li>
          <li>Select <strong>aiven</strong> and click <strong>Connect</strong>.</li>
        </ol>
      </div>
    </div>
  );
}
