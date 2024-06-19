import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import {ConsoleIcon} from '../ConsoleIcons';

export default function Card({
  iconName,
  title,
  description,
  link,
}): JSX.Element {
  return (
    <div className={styles.card}>
      <Link to="{link}">
        <div className={styles.icon}>
          <ConsoleIcon name={iconName} />
        </div>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
      </Link>
    </div>
  );
}
