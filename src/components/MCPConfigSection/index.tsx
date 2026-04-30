import React, { useState } from 'react';
import CodeBlock from '@theme/CodeBlock';
import MCPConfigToggle from '../MCPConfigToggle';
import styles from './styles.module.css';

type MCPConfigSectionProps = {
  baseUrl: string;
  format: 'json' | 'bash';
  configTemplate: (url: string) => any;
};

export default function MCPConfigSection({ baseUrl, format, configTemplate }: MCPConfigSectionProps): JSX.Element {
  const [isReadOnly, setIsReadOnly] = useState(false);

  const url = isReadOnly ? `${baseUrl}?read_only=true` : baseUrl;
  const config = configTemplate(url);
  const content = format === 'json' ? JSON.stringify(config, null, 2) : config;

  return (
    <div className={styles.container}>
      <MCPConfigToggle onReadOnlyChange={setIsReadOnly} />
      <CodeBlock language={format} key={`${format}-${isReadOnly}`}>{content}</CodeBlock>
    </div>
  );
}
