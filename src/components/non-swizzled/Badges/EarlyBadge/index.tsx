import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import stylesGeneric from '../styles.module.css';

export default function EarlyBadge(): JSX.Element {
  return (
    <span className={clsx(stylesGeneric.badge, styles.badge)}>
      Early availability
    </span>
  );
}
