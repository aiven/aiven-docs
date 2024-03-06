import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import stylesGeneric from '../styles.module.css';
import {Tooltip} from 'react-tooltip';

export default function ProBadge(): JSX.Element {
  return (
    <>
      <a
        data-tooltip-id="my-tooltip"
        data-tooltip-content="This feature is part of Aiven Enterprise."
        data-tooltip-offset={-3}>
        <span className={clsx(stylesGeneric.badge, styles.badge)}>Pro</span>
      </a>
      <Tooltip id="my-tooltip" className={stylesGeneric.aivenTooltip} />
    </>
  );
}
