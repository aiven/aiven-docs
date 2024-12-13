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
    case 'organization':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.office} /> <b>Organization</b>
        </>
      );
    case 'organizations':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.office} /> <b>Organizations</b>
        </>
      );
    case 'authenticationpolicy':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.lock} /> <b>Authentication</b>
        </>
      );
    case 'idp':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.idNumber} />{' '}
          <b>Identity providers</b>
        </>
      );
    case 'domains':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.globeNetwork} /> <b>Domains</b>
        </>
      );
    case 'projects':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.projects} /> <b>Projects</b>
        </>
      );
    case 'projectsettings':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.cog} /> <b>Settings</b>
        </>
      );
    case 'moveproject':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.moveProject} />{' '}
          <b>Move project</b>
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
    case 'serviceusers':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.people} /> <b>Users</b>
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
    case 'generativeai':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.performance} />{' '}
          <b>Generative AI</b>
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
    case 'databasesandtables':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.database} />{' '}
          <b>Databases and tables</b>
        </>
      );
    case 'pools':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.pools} />{' '}
          <b>Connection pools</b>
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
    case 'bringyourowncloud':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.cloud} />{' '}
          <b>Bring your own cloud</b>
        </>
      );
    case 'eventlog':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.properties} /> <b>Event log</b>
        </>
      );
    case 'projectpermissions':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.people} /> <b>Permissions</b>
        </>
      );
    case 'orgpermissions':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.blockedPerson} /> <b>Permissions</b>
        </>
      );
    case 'users':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.user} /> <b>Users</b>
        </>
      );
    case 'makesuperadmin':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.superadmin} />{' '}
          <b>Make super admin</b>
        </>
      );
    case 'viewuserprofile':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.user} /> <b>View profile</b>
        </>
      );
    case 'userinformation':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.user} />{' '}
          <b>User information</b>
        </>
      );
    case 'authenticationmethod':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.key} /> <b>Authentication</b>
        </>
      );
    case 'groups':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.people} /> <b>Groups</b>
        </>
      );
    case 'billing':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.bankAccount} /> <b>Billing</b>
        </>
      );
    case 'billinggroups':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.applications} />{' '}
          <b>Billing groups</b>
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
    case 'actions':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.more} /> <b>Actions</b>
        </>
      );
    case 'applicationusers':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.appUsers} />{' '}
          <b>Application users</b>
        </>
      );
    case 'viewappuserprofile':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.appUsers} />{' '}
          <b>View profile</b>
        </>
      );
    case 'filterlist':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.settings} /> <b>Filter list</b>
        </>
      );
    case 'download':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.download} /> <b>Download</b>
        </>
      );
    case 'resetpassword':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.refresh} />{' '}
          <b>Reset password</b>
        </>
      );
    case 'reset':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.reset} />{' '}
          <b>Reset credentials</b>
        </>
      );
    case 'replacefile':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.refresh} /> <b>Replace file</b>
        </>
      );
    case 'editaclrules':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.edit} /> <b>Edit ACL rules </b>
        </>
      );
    case 'edittopic':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.edit} /> <b>Edit topic </b>
        </>
      );
    case 'deletetopic':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.trash} /> <b>Delete topic</b>
        </>
      );
    case 'deleteacl':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.trash} /> <b>Delete ACL</b>
        </>
      );
    case 'deletedatabase':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.trash} />{' '}
          <b>Delete database</b>
        </>
      );
    case 'deletetable':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.trash} /> <b>Delete table</b>
        </>
      );
    case 'edit':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.edit} /> <b>Edit</b>
        </>
      );
    case 'duplicateuser':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.duplicate} />{' '}
          <b>Duplicate user</b>
        </>
      );
    case 'deleteuser':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.trash} /> <b>Delete user</b>
        </>
      );
    case 'addconfigoptions':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.plusCircle} />{' '}
          <b>Add configuration options</b>
        </>
      );
    case 'addnew':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.add} /> <b>Add new</b>
        </>
      );
    case 'plus':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.plus} /> <b>Plus</b>
        </>
      );
    case 'addadvancedconfiguration':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.plusCircle} />{' '}
          <b>Add Advanced Configuration</b>
        </>
      );
    case 'kafkaTopic':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.kafkaTopic} />{' '}
          <b>Kafka Topic</b>
        </>
      );
    case 'tieredstorage':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.tiered} />{' '}
          <b>Tiered storage</b>
        </>
      );
    case 'editdatabase':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.edit} /> <b>Edit database</b>
        </>
      );
    case 'editconfig':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.edit} /> <b>Edit</b>
        </>
      );
    case 'governance':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.governance} />
          <b>Apache Kafka governance</b>
        </>
      );
    case 'grouprequests':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.people} />{' '}
          <b>Group requests</b>
        </>
      );
    case 'approvals':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.award} /> <b>Approvals</b>
        </>
      );
    case 'showpassword':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.eyeOpen} />{' '}
          <b>Show password</b>
        </>
      );
    case 'viewdetails':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.eyeOpen} /> <b>View details</b>
        </>
      );
    case 'activatetieredstorage':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.database02} />{' '}
          <b>Activate tiered storage</b>
        </>
      );
    case 'tieredstorage':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.layers} />{' '}
          <b>Tiered storage</b>
        </>
      );
    case 'queryeditor':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.queries} /> <b>Query editor</b>
        </>
      );
    case 'replicationflow':
      return (
        <>
          <ConsoleIconWrapper icon={ConsoleIcons.replicationFlow} />
          <b>Replication flow</b>
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
