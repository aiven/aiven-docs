import React from 'react';
import {Tooltip} from 'react-tooltip';
import styles from './styles.module.css';
import * as AquariumIcons from '@aivenio/aquarium/icons/index';
import {Icon} from '@iconify/react';

interface RequirementItem {
  icon: keyof typeof AquariumIcons;
  label: string;
  values: string[];
}

interface RequirementsInlineProps {
  items: RequirementItem[];
}

export default function RequirementsInline({
  items,
}: RequirementsInlineProps): JSX.Element {
  return (
    <div className={styles.panel}>
      {items.map((item, index) => (
        <div key={index} className={styles.row}>
          <Icon
            icon={AquariumIcons[item.icon]}
            height={20}
            className={styles.icon}
          />
          <span className={styles.label}>{item.label}</span>
          <span className={styles.separator}>:</span>
          <span className={styles.values}>{item.values.join(', ')}</span>
        </div>
      ))}
    </div>
  );
}
