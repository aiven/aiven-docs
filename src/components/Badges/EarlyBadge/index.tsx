import React from 'react';
import clsx from 'clsx';
import {Tooltip} from 'react-tooltip';
import styles from './styles.module.css';
import stylesGeneric from '../styles.module.css';

export default function EarlyBadge(): JSX.Element {
  const tooltipId = 'early-badge-tooltip';

  return (
    <>
      <a
        href="/docs/platform/concepts/service-and-feature-releases"
        data-tooltip-id={tooltipId}
        data-tooltip-content="Early availability features and services are available for testing and may change."
        data-tooltip-place="top"
        className={clsx(stylesGeneric.badge, styles.badge)}>
        Early availability
      </a>
      <Tooltip id={tooltipId} />
    </>
  );
}
