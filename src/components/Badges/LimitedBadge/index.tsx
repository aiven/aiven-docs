import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import stylesGeneric from '../styles.module.css';

export default function LimitedBadge(): JSX.Element {
  return (
    <span className={clsx(stylesGeneric.badge, styles.badge)}>
      Limited availability
    </span>
  );
}
