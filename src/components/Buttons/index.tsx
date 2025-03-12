import React, {ReactElement} from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

export default function Button({children, to}): ReactElement {
  return (
    <p>
      <Link to={to} className={clsx(styles.button, styles.buttonPrimary)}>
        {children}
      </Link>
    </p>
  );
}

export function ButtonSecondary({children, to}): ReactElement {
  return (
    <p>
      <Link to={to} className={clsx(styles.button, styles.buttonSecondary)}>
        {children}
      </Link>
    </p>
  );
}
