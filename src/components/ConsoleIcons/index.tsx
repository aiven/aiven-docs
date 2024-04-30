import React, {ReactElement} from 'react';
import {Icon} from '@iconify/react';
import * as ConsoleIcons from '@aivenio/aquarium/icons/index';

// See the icons in https://aquarium-library.aiven.io/?path=/docs/data-display-icons--docs

// To use this component, type the label you see in the UI.
// For example, to insert the Event logs icon and label, use:
// <ConsoleLabel name="Event logs"/>

// The name parameter is case insensitive and ignores spaces.

function ConsoleIconWrapper({icon}): ReactElement {
  return <Icon height={22} className="icon" icon={icon} />;
}

export function ConsoleIcon({name}): ReactElement {
  let icon = ConsoleIcons[name];
  return <Icon height={22} className="icon" icon={icon} />;
}

export default function ConsoleLabel({name}): ReactElement {
  switch (name.toLowerCase().replace(/\s/g, '')) {
    case 'servicesettings':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.cog} /> <b>Service settings</b>
        </>
      );
    case 'projectsettings':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.cog} /> <b>Settings</b>
        </>
      );
    case 'integrations':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.integrations} />{' '}
          <b>Integrations</b>
        </>
      );
    case 'metrics':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.timelineAreaChart} />{' '}
          <b>Metrics</b>
        </>
      );
    case 'services':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.database} /> <b>Services</b>
        </>
      );
    case 'aiinsights':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.performance} />{' '}
          <b>AI insights</b>
        </>
      );
    case 'querystatistics':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.queries} />{' '}
          <b>Query statistics</b>
        </>
      );
    case 'currentqueries':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.queries} />{' '}
          <b>Current queries</b>
        </>
      );
    case 'databases':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.database} /> <b>Databases</b>
        </>
      );
    case 'pools':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.pools} /> <b>Pools</b>
        </>
      );
    case 'backups':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.dbBackup} /> <b>Backups</b>
        </>
      );
    case 'overview':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.speedometer} /> <b>Overview</b>
        </>
      );
    case 'logs':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.properties} /> <b>Logs</b>
        </>
      );
    case 'integrationendpoints':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.codeBlock} />{' '}
          <b>Integration endpoints</b>
        </>
      );
    case 'vpcs':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.cloud} /> <b>VPCs</b>
        </>
      );
    case 'eventlog':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.properties} /> <b>Event log</b>
        </>
      );
    case 'members':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.people} /> <b>Members</b>
        </>
      );
    case 'users':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.people} /> <b>Users</b>
        </>
      );
    case 'billing':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.bankAccount} /> <b>Billing</b>
        </>
      );
    case 'acl':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.key} /> <b>ACL</b>
        </>
      );
    case 'topics':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.kafkaTopic} /> <b>Topics</b>
        </>
      );
    case 'connectors':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.gitCommit} /> <b>Connectors</b>
        </>
      );
    case 'schemas':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.dataflow03} /> <b>Schemas</b>
        </>
      );
    case 'quotas':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.layers} /> <b>Quotas</b>
        </>
      );
    case 'storage':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.chart} /> <b>Storage</b>
        </>
      );
    case 'addusers':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.user} /> <b>Add users</b>
        </>
      );
    case 'addgroups':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.people} /> <b>Add groups</b>
        </>
      );
    default:
      return (
        <span style={{padding: 2, backgroundColor: 'red', color: '#ffffff'}}>
          Label not found
        </span>
      );
  }
}
