import React from 'react';
import styles from './styles.module.css';

type McpClientTabLabelProps = {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
};

export default function McpClientTabLabel({ icon: Icon, label }: McpClientTabLabelProps): JSX.Element {
  return (
    <span className={styles.tabLabel}>
      <Icon className={styles.icon} />
      <span>{label}</span>
    </span>
  );
}
