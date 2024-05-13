import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import stylesGeneric from '../styles.module.css';
import {Tooltip} from 'react-tooltip';

export default function EarlyBadge(): JSX.Element {
  return (
    <>
      <a
        data-tooltip-id="my-tooltip"
        data-tooltip-content="This feature is in preview."
        data-tooltip-offset={-3}>
        <span className={clsx(stylesGeneric.badge, styles.badge)}>
          Early availabilty
        </span>
      </a>
      <Tooltip id="my-tooltip" className={stylesGeneric.aivenTooltip} />
    </>
  );
}
