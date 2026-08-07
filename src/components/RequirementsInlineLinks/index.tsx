import React from 'react';
import {Tooltip} from 'react-tooltip';
import styles from './styles.module.css';
import * as AquariumIcons from '@aivenio/aquarium/icons/index';
import {Icon} from '@iconify/react';

const PERMISSIONS_DOC_LINK = '/docs/platform/concepts/permissions';
const AVAILABILITY_DOC_LINK =
  '/docs/platform/concepts/service-and-feature-releases';

function formatPermissionValues(values: string[]): string {
  if (values.length === 0) {
    return '';
  }

  if (values.length === 1) {
    return values[0];
  }

  if (values.length === 2) {
    return `${values[0]} or ${values[1]}`;
  }

  return `${values.slice(0, -1).join(', ')}, or ${values[values.length - 1]}`;
}

function isPermissionsLabel(label: string): boolean {
  return label === 'Permissions' || label === 'Required role';
}

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
          {item.label === 'Permissions' ? (
            <a href={PERMISSIONS_DOC_LINK} className={styles.labelLink}>
              Required roles or permissions
            </a>
          ) : item.label === 'Availability' ? (
            <a href={AVAILABILITY_DOC_LINK} className={styles.labelLink}>
              Availability
            </a>
          ) : (
            <span className={styles.label}>{item.label}</span>
          )}
          <span className={styles.separator}>:</span>
          <span className={styles.values}>
            {isPermissionsLabel(item.label)
              ? formatPermissionValues(item.values)
              : item.values.join(', ')}
          </span>
        </div>
      ))}
    </div>
  );
}
