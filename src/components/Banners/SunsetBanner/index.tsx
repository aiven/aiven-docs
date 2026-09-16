import React from 'react';
import styles from './styles.module.css';

type Props = {
  /** Full product name with trademark symbol, used on first mention. */
  productName: string;
};

export default function SunsetBanner({productName}: Props): JSX.Element {
  return (
    <div className={styles.banner} role="note">
      <svg
        className={styles.icon}
        aria-hidden="true"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg">
        <path
          d="M12 3v5M6.5 8.5 8.9 10.9M17.5 8.5 15.1 10.9M12 17a5 5 0 0 1 5 5H7a5 5 0 0 1 5-5ZM2.5 22h19"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div>
        <p className={styles.title}>{productName} is being sunset</p>
        <p className={styles.text}>
          New service creation is no longer available. Existing services remain
          available during the sunset period.
        </p>
      </div>
    </div>
  );
}
