import React from 'react';
import clsx from 'clsx';
import {Tooltip} from 'react-tooltip';
import styles from './styles.module.css';
import stylesGeneric from '../styles.module.css';

export default function LimitedBadge(): JSX.Element {
  const tooltipId = 'limited-badge-tooltip';

  return (
    <>
      <a
        href="/docs/platform/concepts/service-and-feature-releases"
        data-tooltip-id={tooltipId}
        data-tooltip-content="You can try limited availability features and services by contacting the sales team."
        data-tooltip-place="top"
        className={clsx(stylesGeneric.badge, styles.badge)}>
        Limited availability
      </a>
      <Tooltip id={tooltipId} />
    </>
  );
}
