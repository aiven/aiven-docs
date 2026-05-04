import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import MCPConfigToggle from '../MCPConfigToggle';
import CursorIcon from '@site/static/images/icons/cursor.svg';
import styles from './styles.module.css';

type CursorConfigTabProps = {
  baseUrl: string;
};

export default function CursorConfigTab({ baseUrl }: CursorConfigTabProps): JSX.Element {
  const [isReadOnly, setIsReadOnly] = useState(false);

  const url = isReadOnly ? `${baseUrl}?read_only=true` : baseUrl;
  const configJson = JSON.stringify({ mcpServers: { aiven: { type: 'http', url } } }, null, 2);

  const cursorConfig = { url, type: 'http' };
  const encodedConfig = typeof btoa !== 'undefined' ? btoa(JSON.stringify(cursorConfig)) : '';
  const deepLink = `cursor://anysphere.cursor-deeplink/mcp/install?name=aiven-mcp&config=${encodedConfig}`;

  return (
    <div className={styles.container}>
      <a href={deepLink} className={styles.button}>
        <CursorIcon />
        <span>Add to Cursor</span>
      </a>

      <div className={styles.manualSetup}>
        <p>To add the server manually:</p>
        <ol>
          <li>In your project root, create or edit the <code>.cursor/mcp.json</code> file.</li>
          <li>Add the following configuration:</li>
        </ol>
        <MCPConfigToggle onReadOnlyChange={setIsReadOnly} />
        <CodeBlock language="json" key={`cursor-config-${isReadOnly}`}>{configJson}</CodeBlock>
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
