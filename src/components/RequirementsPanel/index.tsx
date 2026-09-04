import React from 'react';
import styles from './styles.module.css';
import * as AquariumIcons from '@aivenio/aquarium/icons/index';
import {Icon} from '@iconify/react';

const LABEL_ICON_MAP: Record<string, keyof typeof AquariumIcons> = {
  Permissions: 'people',
  Availability: 'roadmap',
  Plans: 'container',
  Cloud: 'cloud',
};

function getIconForLabel(label: string): keyof typeof AquariumIcons {
  return LABEL_ICON_MAP[label] || 'infoSign';
}

function renderPermissionValue(value: string): JSX.Element | string {
  // Split by backticks and render code segments
  const parts = value.split(/(`[^`]+`)/);
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={i} className={styles.inlineCode}>
              {part.slice(1, -1)}
            </code>
          );
        }
        return <span key={i}>{part}</span>;
      })}
    </>
  );
}

function formatPermissionValues(values: string[]): JSX.Element {
  if (values.length === 0) {
    return <></>;
  }

  if (values.length === 1) {
    return <>{renderPermissionValue(values[0])}</>;
  }

  if (values.length === 2) {
    return (
      <>
        {renderPermissionValue(values[0])} or {renderPermissionValue(values[1])}
      </>
    );
  }

  return (
    <>
      {values.slice(0, -1).map((v, i) => (
        <span key={i}>{renderPermissionValue(v)}, </span>
      ))}
      or {renderPermissionValue(values[values.length - 1])}
    </>
  );
}

function isPermissionsLabel(label: string): boolean {
  return label === 'Permissions' || label === 'Required roles or permissions';
}

interface RequirementItem {
  icon?: keyof typeof AquariumIcons;
  label: string;
  values: string[];
}

interface RequirementsPanelProps {
  items: RequirementItem[];
}

export default function RequirementsPanel({
  items,
}: RequirementsPanelProps): JSX.Element {
  return (
    <div className={styles.panel}>
      {items.map((item, index) => {
        const iconToUse = item.icon || getIconForLabel(item.label);
        return (
          <div key={index} className={styles.row}>
            <Icon
              icon={AquariumIcons[iconToUse]}
              height={20}
              className={styles.icon}
            />
            {item.label === 'Permissions' ? (
              <span className={styles.label}>
                Required roles or permissions
              </span>
            ) : item.label === 'Availability' ? (
              <span className={styles.label}>Availability</span>
            ) : item.label === 'Service plans' ? (
              <span className={styles.label}>Supported service plans</span>
            ) : item.label === 'Cloud' ? (
              <span className={styles.label}>Supported clouds</span>
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
        );
      })}
    </div>
  );
}
