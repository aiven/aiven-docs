import React from 'react';
import {Tooltip} from 'react-tooltip';
import styles from './styles.module.css';
import * as AquariumIcons from '@aivenio/aquarium/icons/index';
import {Icon} from '@iconify/react';

interface RequirementValue {
  text: string;
  tooltip?: string;
  href?: string;
}

interface RequirementItem {
  icon: keyof typeof AquariumIcons;
  label: string;
  values: (string | RequirementValue)[];
}

interface RequirementsPanelProps {
  items: RequirementItem[];
}

export default function RequirementsPanel({
  items,
}: RequirementsPanelProps): JSX.Element {
  return (
    <div className={styles.panel}>
      {items.map((item, itemIndex) => {
        const tooltipId = `requirement-tooltip-${itemIndex}`;

        return (
          <div key={itemIndex} className={styles.item}>
            <div className={styles.header}>
              <div className={styles.iconLabel}>
                <Icon
                  icon={AquariumIcons[item.icon]}
                  height={20}
                  className={styles.icon}
                />
                <span className={styles.label}>{item.label}</span>
              </div>
            </div>
            <div className={styles.values}>
              {item.values.map((value, valueIndex) => {
                const isObject = typeof value === 'object';
                const text = isObject ? value.text : value;
                const tooltip = isObject ? value.tooltip : undefined;
                const href = isObject ? value.href : undefined;
                const valueTooltipId = tooltip
                  ? `${tooltipId}-${valueIndex}`
                  : undefined;

                const content = (
                  <span
                    className={styles.value}
                    data-tooltip-id={valueTooltipId}
                    data-tooltip-content={tooltip}
                    data-tooltip-place="top">
                    {text}
                  </span>
                );

                return (
                  <div key={valueIndex} className={styles.valueRow}>
                    {href ? (
                      <a href={href} className={styles.link}>
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                    {tooltip && <Tooltip id={valueTooltipId} />}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
