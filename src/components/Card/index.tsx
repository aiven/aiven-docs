import React from 'react';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import {ConsoleIcon} from '../ConsoleIcons';

type CardProps = {
  iconName?: string;
  iconComponent?: React.ComponentType;
  /** When set, overrides default teal for icons that respect `color` / currentColor (e.g. ConsoleIcon). */
  iconColor?: string;
  /** Solid pill behind the title (product highlight “option 1”). Expect a CSS color, e.g. hex. */
  titleHighlight?: string;
  /** Omit the icon row (e.g. product grid using text highlight only). */
  hideIcon?: boolean;
  title: string;
  description: string;
  to: string;
};

export default function Card({
  iconName,
  iconComponent: IconComponent,
  iconColor,
  titleHighlight,
  hideIcon,
  title,
  description,
  to,
}: CardProps): JSX.Element {
  const iconStyle =
    iconColor !== undefined
      ? ({'--card-icon-color': iconColor} as React.CSSProperties)
      : undefined;

  const showIcon = !hideIcon && (IconComponent || iconName);

  const titleEl =
    titleHighlight !== undefined ? (
      <span
        className={styles.titlePill}
        style={
          {'--card-title-pill-bg': titleHighlight} as React.CSSProperties
        }>
        {title}
      </span>
    ) : (
      title
    );

  return (
    <div className={styles.card}>
      <Link to={to} className="aiven-card-link">
        {showIcon ? (
          <div className={styles.icon} style={iconStyle}>
            {IconComponent ? (
              <IconComponent />
            ) : (
              iconName && <ConsoleIcon name={iconName} />
            )}
          </div>
        ) : null}
        <div className={styles.title}>{titleEl}</div>
        <div className={styles.description}>{description}</div>
      </Link>
    </div>
  );
}
