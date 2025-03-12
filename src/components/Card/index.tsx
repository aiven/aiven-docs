import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import {ConsoleIcon} from '../ConsoleIcons';

type CardProps = {
  iconName?: string;
  iconComponent?: React.ComponentType;
  title: string;
  description: string;
  to: string;
};

export default function Card({
  iconName,
  iconComponent: IconComponent,
  title,
  description,
  to,
}: CardProps): JSX.Element {
  return (
    <div className={styles.card}>
      <Link to={to}>
        <div className={styles.icon}>
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
