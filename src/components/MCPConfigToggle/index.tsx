import React, { useState } from 'react';
import styles from './styles.module.css';

type MCPConfigToggleProps = {
  onReadOnlyChange?: (isReadOnly: boolean) => void;
};

export default function MCPConfigToggle({ onReadOnlyChange }: MCPConfigToggleProps): JSX.Element {
  const [isReadOnly, setIsReadOnly] = useState(false);

  const handleChange = (checked: boolean) => {
    setIsReadOnly(checked);
    onReadOnlyChange?.(checked);
  };

  return (
    <div className={styles.container}>
      <label className={styles.label}>
        <input
          type="checkbox"
          checked={isReadOnly}
          onChange={(e) => handleChange(e.target.checked)}
          className={styles.checkbox}
        />
        Install in read-only mode
      </label>
      <p className={styles.description}>Allows only read-only operations, such as listing services, viewing metrics, and running read-only queries.</p>
    </div>
  );
}
