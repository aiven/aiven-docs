import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import {ConsoleIcon} from '../ConsoleIcons';

type CardProps = {
  iconName?: string;
  iconComponent?: React.ComponentType;
  /** When set, overrides default teal for icons that respect `color` / currentColor (e.g. ConsoleIcon). */
  iconColor?: string;
  title: string;
  description: string;
  to: string;
};

export default function Card({
  iconName,
  iconComponent: IconComponent,
  iconColor,
  title,
  description,
  to,
}: CardProps): JSX.Element {
  const iconStyle =
    iconColor !== undefined
      ? ({'--card-icon-color': iconColor} as React.CSSProperties)
      : undefined;

  return (
    <div className={styles.card}>
      <Link to={to} className="aiven-card-link">
        <div className={styles.icon} style={iconStyle}>
          {IconComponent ? (
            <IconComponent />
          ) : (
            iconName && <ConsoleIcon name={iconName} />
          )}
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </Link>
    </div>
  );
}
