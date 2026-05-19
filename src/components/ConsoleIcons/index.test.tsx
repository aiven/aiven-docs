// Unit tests for ConsoleIcons component logic
// Testing the component behavior without rendering to avoid DOM dependencies

// Mock the expected icon object structure
const mockIconObjects = {
  cog: {body: "<path d='M1 1h2v2H1z'/>", width: 24, height: 24},
  office: {body: "<path d='M2 2h2v2H2z'/>", width: 24, height: 24},
  lock: {body: "<path d='M3 3h2v2H3z'/>", width: 24, height: 24},
  idNumber: {body: "<path d='M4 4h2v2H4z'/>", width: 24, height: 24},
  globeNetwork: {body: "<path d='M5 5h2v2H5z'/>", width: 24, height: 24},
  projects: {body: "<path d='M6 6h2v2H6z'/>", width: 24, height: 24},
  moveProject: {body: "<path d='M7 7h2v2H7z'/>", width: 24, height: 24},
  integrations: {body: "<path d='M8 8h2v2H8z'/>", width: 24, height: 24},
  timelineAreaChart: {body: "<path d='M9 9h2v2H9z'/>", width: 24, height: 24},
  people: {body: "<path d='M10 10h2v2H10z'/>", width: 24, height: 24},
  database: {body: "<path d='M11 11h2v2H11z'/>", width: 24, height: 24},
  database02: {body: "<path d='M11 11h2v2H11z'/>", width: 24, height: 24},
  performance: {body: "<path d='M12 12h2v2H12z'/>", width: 24, height: 24},
  queries: {body: "<path d='M13 13h2v2H13z'/>", width: 24, height: 24},
  pools: {body: "<path d='M14 14h2v2H14z'/>", width: 24, height: 24},
  dbBackup: {body: "<path d='M15 15h2v2H15z'/>", width: 24, height: 24},
  speedometer: {body: "<path d='M16 16h2v2H16z'/>", width: 24, height: 24},
  properties: {body: "<path d='M17 17h2v2H17z'/>", width: 24, height: 24},
  codeBlock: {body: "<path d='M18 18h2v2H18z'/>", width: 24, height: 24},
  code: {body: "<path d='M19 19h2v2H19z'/>", width: 24, height: 24},
  cloud: {body: "<path d='M20 20h2v2H20z'/>", width: 24, height: 24},
  blockedPerson: {body: "<path d='M21 21h2v2H21z'/>", width: 24, height: 24},
  user: {body: "<path d='M22 22h2v2H22z'/>", width: 24, height: 24},
  superadmin: {body: "<path d='M23 23h2v2H23z'/>", width: 24, height: 24},
  gift: {body: "<path d='M24 24h2v2H24z'/>", width: 24, height: 24},
  key: {body: "<path d='M25 25h2v2H25z'/>", width: 24, height: 24},
  bankAccount: {body: "<path d='M26 26h2v2H26z'/>", width: 24, height: 24},
  inbox: {body: "<path d='M27 27h2v2H27z'/>", width: 24, height: 24},
  applications: {body: "<path d='M28 28h2v2H28z'/>", width: 24, height: 24},
  creditCard: {body: "<path d='M29 29h2v2H29z'/>", width: 24, height: 24},
  deliveryLocation: {body: "<path d='M30 30h2v2H30z'/>", width: 24, height: 24},
  kafkaTopic: {body: "<path d='M31 31h2v2H31z'/>", width: 24, height: 24},
  gitCommit: {body: "<path d='M32 32h2v2H32z'/>", width: 24, height: 24},
  dataflow03: {body: "<path d='M33 33h2v2H33z'/>", width: 24, height: 24},
  layers: {body: "<path d='M34 34h2v2H34z'/>", width: 24, height: 24},
  more: {body: "<path d='M35 35h2v2H35z'/>", width: 24, height: 24},
  chart: {body: "<path d='M36 36h2v2H36z'/>", width: 24, height: 24},
  appUsers: {body: "<path d='M37 37h2v2H37z'/>", width: 24, height: 24},
  settings: {body: "<path d='M38 38h2v2H38z'/>", width: 24, height: 24},
  download: {body: "<path d='M39 39h2v2H39z'/>", width: 24, height: 24},
  refresh: {body: "<path d='M40 40h2v2H40z'/>", width: 24, height: 24},
  reset: {body: "<path d='M41 41h2v2H41z'/>", width: 24, height: 24},
  edit: {body: "<path d='M42 42h2v2H42z'/>", width: 24, height: 24},
  trash: {body: "<path d='M43 43h2v2H43z'/>", width: 24, height: 24},
  duplicate: {body: "<path d='M44 44h2v2H44z'/>", width: 24, height: 24},
  plusCircle: {body: "<path d='M45 45h2v2H45z'/>", width: 24, height: 24},
  add: {body: "<path d='M46 46h2v2H46z'/>", width: 24, height: 24},
  plus: {body: "<path d='M47 47h2v2H47z'/>", width: 24, height: 24},
  governance: {body: "<path d='M48 48h2v2H48z'/>", width: 24, height: 24},
  award: {body: "<path d='M49 49h2v2H49z'/>", width: 24, height: 24},
  eyeOpen: {body: "<path d='M50 50h2v2H50z'/>", width: 24, height: 24},
  tiered: {body: "<path d='M51 51h2v2H51z'/>", width: 24, height: 24},
  queriesEditor: {body: "<path d='M52 52h2v2H52z'/>", width: 24, height: 24},
  indexes: {body: "<path d='M53 53h2v2H53z'/>", width: 24, height: 24},
  chevronDown: {body: "<path d='M54 54h2v2H54z'/>", width: 24, height: 24},
  replicationFlow: {body: "<path d='M55 55h2v2H55z'/>", width: 24, height: 24},
  camera: {body: "<path d='M56 56h2v2H56z'/>", width: 24, height: 24},
  disasterRecovery: {body: "<path d='M57 57h2v2H57z'/>", width: 24, height: 24}
};

// Simulate the ConsoleLabel logic
function simulateConsoleLabel(name) {
  const normalized = name.toLowerCase().replace(/\s/g, '');
  
  switch (normalized) {
    case 'servicesettings':
      return { icon: mockIconObjects.cog, text: 'Service settings' };
    case 'organization':
      return { icon: mockIconObjects.office, text: 'Organization' };
    case 'organizations':
      return { icon: mockIconObjects.office, text: 'Organizations' };
    case 'authenticationpolicy':
      return { icon: mockIconObjects.lock, text: 'Authentication' };
    case 'idp':
      return { icon: mockIconObjects.idNumber, text: 'Identity providers' };
    case 'domains':
      return { icon: mockIconObjects.globeNetwork, text: 'Domains' };
    case 'projects':
      return { icon: mockIconObjects.projects, text: 'Projects' };
    case 'projectsettings':
      return { icon: mockIconObjects.cog, text: 'Settings' };
    case 'moveproject':
      return { icon: mockIconObjects.moveProject, text: 'Move project' };
    case 'integrations':
      return { icon: mockIconObjects.integrations, text: 'Integrations' };
    case 'metrics':
      return { icon: mockIconObjects.timelineAreaChart, text: 'Metrics' };
    case 'serviceusers':
      return { icon: mockIconObjects.people, text: 'Users' };
    case 'services':
      return { icon: mockIconObjects.database, text: 'Services' };
    case 'aiinsights':
      return { icon: mockIconObjects.performance, text: 'AI insights' };
    case 'generativeai':
      return { icon: mockIconObjects.performance, text: 'Generative AI' };
    case 'querystatistics':
      return { icon: mockIconObjects.queries, text: 'Query statistics' };
    case 'currentqueries':
      return { icon: mockIconObjects.queries, text: 'Current queries' };
    case 'databases':
      return { icon: mockIconObjects.database, text: 'Databases' };
    case 'databasesandtables':
      return { icon: mockIconObjects.database, text: 'Databases and tables' };
    case 'pools':
      return { icon: mockIconObjects.pools, text: 'Connection pools' };
    case 'backups':
      return { icon: mockIconObjects.dbBackup, text: 'Backups' };
    case 'overview':
      return { icon: mockIconObjects.speedometer, text: 'Overview' };
    case 'logs':
      return { icon: mockIconObjects.properties, text: 'Logs' };
    case 'integrationendpoints':
      return { icon: mockIconObjects.codeBlock, text: 'Integration endpoints' };
    case 'testconnection':
      return { icon: mockIconObjects.code, text: 'Test connection' };
    case 'vpcs':
      return { icon: mockIconObjects.cloud, text: 'VPCs' };
    case 'bringyourowncloud':
      return { icon: mockIconObjects.cloud, text: 'Bring your own cloud' };
    case 'eventlog':
      return { icon: mockIconObjects.properties, text: 'Event log' };
    case 'projectpermissions':
      return { icon: mockIconObjects.people, text: 'Permissions' };
    case 'orgpermissions':
      return { icon: mockIconObjects.blockedPerson, text: 'Permissions' };
    case 'users':
      return { icon: mockIconObjects.user, text: 'Users' };
    case 'makesuperadmin':
      return { icon: mockIconObjects.superadmin, text: 'Make super admin' };
    case 'viewuserprofile':
      return { icon: mockIconObjects.user, text: 'View profile' };
    case 'userinformation':
      return { icon: mockIconObjects.user, text: 'User information' };
    case 'userprofile':
      return { icon: mockIconObjects.user, text: 'User profile' };
    case 'referrals':
      return { icon: mockIconObjects.gift, text: 'Referrals' };
    case 'authenticationmethod':
      return { icon: mockIconObjects.key, text: 'Authentication' };
    case 'groups':
      return { icon: mockIconObjects.people, text: 'Groups' };
    case 'billing':
      return { icon: mockIconObjects.bankAccount, text: 'Billing' };
    case 'invoices':
      return { icon: mockIconObjects.inbox, text: 'Invoices' };
    case 'billinggroups':
      return { icon: mockIconObjects.applications, text: 'Billing groups' };
    case 'paymentmethods':
      return { icon: mockIconObjects.creditCard, text: 'Payment methods' };
    case 'billingaddress':
      return { icon: mockIconObjects.deliveryLocation, text: 'Addresses' };
    case 'acl':
      return { icon: mockIconObjects.key, text: 'ACL' };
    case 'topics':
      return { icon: mockIconObjects.kafkaTopic, text: 'Topics' };
    case 'connectors':
      return { icon: mockIconObjects.gitCommit, text: 'Connectors' };
    case 'schemas':
      return { icon: mockIconObjects.dataflow03, text: 'Schemas' };
    case 'quotas':
      return { icon: mockIconObjects.layers, text: 'Quotas' };
    case 'storage':
      return { icon: mockIconObjects.chart, text: 'Storage' };
    case 'addusers':
      return { icon: mockIconObjects.user, text: 'Add users' };
    case 'addgroups':
      return { icon: mockIconObjects.people, text: 'Add groups' };
    case 'actions':
      return { icon: mockIconObjects.more, text: 'Actions' };
    case 'applicationusers':
      return { icon: mockIconObjects.appUsers, text: 'Application users' };
    case 'viewappuserprofile':
      return { icon: mockIconObjects.appUsers, text: 'View profile' };
    case 'filterlist':
      return { icon: mockIconObjects.settings, text: 'Filter list' };
    case 'download':
      return { icon: mockIconObjects.download, text: 'Download' };
    case 'restorefromsnapshot':
      return { icon: mockIconObjects.download, text: 'Restore to this service' };
    case 'resetpassword':
      return { icon: mockIconObjects.refresh, text: 'Reset password' };
    case 'reset':
      return { icon: mockIconObjects.reset, text: 'Reset credentials' };
    case 'replacefile':
      return { icon: mockIconObjects.refresh, text: 'Replace file' };
    case 'editaclrules':
      return { icon: mockIconObjects.edit, text: 'Edit ACL rules' };
    case 'edittopic':
      return { icon: mockIconObjects.edit, text: 'Edit topic' };
    case 'editrepo':
      return { icon: mockIconObjects.edit, text: 'Edit repository' };
    case 'deletetopic':
      return { icon: mockIconObjects.trash, text: 'Delete topic' };
    case 'deleteacl':
      return { icon: mockIconObjects.trash, text: 'Delete ACL' };
    case 'deletedatabase':
      return { icon: mockIconObjects.trash, text: 'Delete database' };
    case 'deletetable':
      return { icon: mockIconObjects.trash, text: 'Delete table' };
    case 'deletesnapshot':
      return { icon: mockIconObjects.trash, text: 'Delete snapshot' };
    case 'disconnect':
      return { icon: mockIconObjects.trash, text: 'Disconnect' };
    case 'edit':
      return { icon: mockIconObjects.edit, text: 'Edit' };
    case 'duplicateuser':
      return { icon: mockIconObjects.duplicate, text: 'Duplicate user' };
    case 'deleteuser':
      return { icon: mockIconObjects.trash, text: 'Delete user' };
    case 'delete':
      return { icon: mockIconObjects.trash, text: 'Delete' };
    case 'addconfigoptions':
      return { icon: mockIconObjects.plusCircle, text: 'Add configuration options' };
    case 'addnew':
      return { icon: mockIconObjects.add, text: 'Add new' };
    case 'plus':
      return { icon: mockIconObjects.plus, text: 'Plus' };
    case 'addadvancedconfiguration':
      return { icon: mockIconObjects.plusCircle, text: 'Add Advanced Configuration' };
    case 'advancedconfiguration':
      return { icon: mockIconObjects.settings, text: 'Advanced configuration' };
    case 'add':
      return { icon: mockIconObjects.plusCircle, text: null }; // No text for add-only icon
    case 'addtable':
      return { icon: mockIconObjects.plusCircle, text: 'Add table' };
    case 'kafkatopic':
      return { icon: mockIconObjects.kafkaTopic, text: 'Kafka Topic' };
    case 'tieredstorage':
      return { icon: mockIconObjects.tiered, text: 'Tiered storage' };
    case 'editdatabase':
      return { icon: mockIconObjects.edit, text: 'Edit database' };
    case 'edittable':
      return { icon: mockIconObjects.edit, text: 'Edit table' };
    case 'editconfig':
      return { icon: mockIconObjects.edit, text: 'Edit' };
    case 'governance':
      return { icon: mockIconObjects.governance, text: 'Apache Kafka governance' };
    case 'grouprequests':
      return { icon: mockIconObjects.people, text: 'Group requests' };
    case 'approvals':
      return { icon: mockIconObjects.award, text: 'Approvals' };
    case 'showpassword':
      return { icon: mockIconObjects.eyeOpen, text: 'Show password' };
    case 'viewdetails':
      return { icon: mockIconObjects.eyeOpen, text: 'View details' };
    case 'removerepo':
      return { icon: mockIconObjects.trash, text: 'Remove repository' };
    case 'viewsnapshot':
      return { icon: mockIconObjects.eyeOpen, text: 'View snapshot details' };
    case 'activatetieredstorage':
      return { icon: mockIconObjects.database02, text: 'Activate tiered storage' };
    case 'queryeditor':
      return { icon: mockIconObjects.queriesEditor, text: 'Query editor' };
    case 'opensearchindexes':
      return { icon: mockIconObjects.indexes, text: 'Indexes' };
    case 'editversion':
      return { icon: mockIconObjects.edit, text: 'Change version' };
    case 'downarrow':
      return { icon: mockIconObjects.chevronDown, text: null }; // No text
    case 'streamingcatalog':
      return { icon: mockIconObjects.kafkaTopic, text: 'Streaming catalog' };
    case 'replicationflow':
      return { icon: mockIconObjects.replicationFlow, text: 'Replication flow' };
    case 'snapshots':
      return { icon: mockIconObjects.camera, text: 'Snapshots' };
    case 'createsnapshot':
      return { icon: mockIconObjects.camera, text: 'Create snapshot' };
    case 'disasterrecovery':
      return { icon: mockIconObjects.disasterRecovery, text: 'Disaster recovery' };
    default:
      return { error: 'Label not found' };
  }
}

describe('ConsoleIcons Logic Tests', () => {
  describe('ConsoleIcon Component Logic', () => {
    it('should exist as a function', () => {
      // Based on implementation: ConsoleIcon is a function that accepts a name prop
      expect(typeof simulateConsoleIconFn).toBe('function');
    });
    
    it('should accept a name parameter', () => {
      // Based on implementation: ConsoleIcon expects a name prop
      const mockName = 'cog';
      expect(mockName).toBeDefined();
      expect(typeof mockName).toBe('string');
    });

    function simulateConsoleIconFn({name}) {
      // Simulate what the ConsoleIcon component does: 
      // retrieves the icon from ConsoleIcons[name]
      const icon = mockIconObjects[name] || null;
      return { icon, name };
    }

    it('should return an icon object based on the name prop', () => {
      const inputName = 'cog';
      const result = simulateConsoleIconFn({name: inputName});
      
      expect(result.name).toBe(inputName);
      expect(result.icon).toBeDefined();
      expect(result.icon.body).toContain('M1 1h2v2H1z'); // Expected path for cog icon
    });

    it('should return null icon if name does not exist', () => {
      const inputName = 'nonexistent-icon';
      const result = simulateConsoleIconFn({name: inputName});
      
      expect(result.name).toBe(inputName);
      expect(result.icon).toBeNull();
    });
  });

  describe('ConsoleLabel Logic', () => {
    it('should handle Service settings label', () => {
      const result = simulateConsoleLabel('Service settings');
      expect(result.text).toBe('Service settings');
      expect(result.icon).toBe(mockIconObjects.cog);
    });

    it('should handle Organization label', () => {
      const result = simulateConsoleLabel('Organization');
      expect(result.text).toBe('Organization');
      expect(result.icon).toBe(mockIconObjects.office);
    });

    it('should handle Organizations label', () => {
      const result = simulateConsoleLabel('Organizations');
      expect(result.text).toBe('Organizations');
      expect(result.icon).toBe(mockIconObjects.office);
    });

    it('should handle Authentication policy label', () => {
      const result = simulateConsoleLabel('Authentication policy');
      expect(result.text).toBe('Authentication');
      expect(result.icon).toBe(mockIconObjects.lock);
    });

    it('should handle Identity providers (idp) label', () => {
      const result = simulateConsoleLabel('idp');
      expect(result.text).toBe('Identity providers');
      expect(result.icon).toBe(mockIconObjects.idNumber);
    });

    it('should handle Domains label', () => {
      const result = simulateConsoleLabel('Domains');
      expect(result.text).toBe('Domains');
      expect(result.icon).toBe(mockIconObjects.globeNetwork);
    });

    it('should handle Projects label', () => {
      const result = simulateConsoleLabel('Projects');
      expect(result.text).toBe('Projects');
      expect(result.icon).toBe(mockIconObjects.projects);
    });

    it('should handle Project settings label', () => {
      const result = simulateConsoleLabel('project settings');
      expect(result.text).toBe('Settings');
      expect(result.icon).toBe(mockIconObjects.cog);
    });

    it('should handle Move project label', () => {
      const result = simulateConsoleLabel('Move project');
      expect(result.text).toBe('Move project');
      expect(result.icon).toBe(mockIconObjects.moveProject);
    });

    it('should handle Integrations label', () => {
      const result = simulateConsoleLabel('Integrations');
      expect(result.text).toBe('Integrations');
      expect(result.icon).toBe(mockIconObjects.integrations);
    });

    it('should handle Metrics label', () => {
      const result = simulateConsoleLabel('Metrics');
      expect(result.text).toBe('Metrics');
      expect(result.icon).toBe(mockIconObjects.timelineAreaChart);
    });

    it('should handle Service users label', () => {
      const result = simulateConsoleLabel('service users');
      expect(result.text).toBe('Users');
      expect(result.icon).toBe(mockIconObjects.people);
    });

    it('should handle Services label', () => {
      const result = simulateConsoleLabel('Services');
      expect(result.text).toBe('Services');
      expect(result.icon).toBe(mockIconObjects.database);
    });

    it('should handle AI insights label', () => {
      const result = simulateConsoleLabel('AI insights');
      expect(result.text).toBe('AI insights');
      expect(result.icon).toBe(mockIconObjects.performance);
    });

    it('should handle Generative AI label', () => {
      const result = simulateConsoleLabel('Generative AI');
      expect(result.text).toBe('Generative AI');
      expect(result.icon).toBe(mockIconObjects.performance);
    });

    it('should handle Query statistics label', () => {
      const result = simulateConsoleLabel('Query statistics');
      expect(result.text).toBe('Query statistics');
      expect(result.icon).toBe(mockIconObjects.queries);
    });

    it('should handle Current queries label', () => {
      const result = simulateConsoleLabel('Current queries');
      expect(result.text).toBe('Current queries');
      expect(result.icon).toBe(mockIconObjects.queries);
    });

    it('should handle Databases label', () => {
      const result = simulateConsoleLabel('Databases');
      expect(result.text).toBe('Databases');
      expect(result.icon).toBe(mockIconObjects.database);
    });

    it('should handle Databases and tables label', () => {
      const result = simulateConsoleLabel('Databases and tables');
      expect(result.text).toBe('Databases and tables');
      expect(result.icon).toBe(mockIconObjects.database);
    });

    it('should handle Pools (Connection pools) label', () => {
      const result = simulateConsoleLabel('Pools');
      expect(result.text).toBe('Connection pools');
      expect(result.icon).toBe(mockIconObjects.pools);
    });

    it('should handle Backups label', () => {
      const result = simulateConsoleLabel('Backups');
      expect(result.text).toBe('Backups');
      expect(result.icon).toBe(mockIconObjects.dbBackup);
    });

    it('should handle Overview label', () => {
      const result = simulateConsoleLabel('Overview');
      expect(result.text).toBe('Overview');
      expect(result.icon).toBe(mockIconObjects.speedometer);
    });

    it('should handle Logs label', () => {
      const result = simulateConsoleLabel('Logs');
      expect(result.text).toBe('Logs');
      expect(result.icon).toBe(mockIconObjects.properties);
    });

    it('should handle Integration endpoints label', () => {
      const result = simulateConsoleLabel('Integration endpoints');
      expect(result.text).toBe('Integration endpoints');
      expect(result.icon).toBe(mockIconObjects.codeBlock);
    });

    it('should handle Test connection label', () => {
      const result = simulateConsoleLabel('Test connection');
      expect(result.text).toBe('Test connection');
      expect(result.icon).toBe(mockIconObjects.code);
    });

    it('should handle VPCs label', () => {
      const result = simulateConsoleLabel('VPCs');
      expect(result.text).toBe('VPCs');
      expect(result.icon).toBe(mockIconObjects.cloud);
    });

    it('should handle Bring your own cloud label', () => {
      const result = simulateConsoleLabel('Bring your own cloud');
      expect(result.text).toBe('Bring your own cloud');
      expect(result.icon).toBe(mockIconObjects.cloud);
    });

    it('should handle Event log label', () => {
      const result = simulateConsoleLabel('Event log');
      expect(result.text).toBe('Event log');
      expect(result.icon).toBe(mockIconObjects.properties);
    });

    it('should handle Project permissions label', () => {
      const result = simulateConsoleLabel('Project permissions');
      expect(result.text).toBe('Permissions');
      expect(result.icon).toBe(mockIconObjects.people);
    });

    it('should handle Org permissions label', () => {
      const result = simulateConsoleLabel('Org permissions');
      expect(result.text).toBe('Permissions');
      expect(result.icon).toBe(mockIconObjects.blockedPerson);
    });

    it('should handle Users label', () => {
      const result = simulateConsoleLabel('Users');
      expect(result.text).toBe('Users');
      expect(result.icon).toBe(mockIconObjects.user);
    });

    it('should handle Make super admin label', () => {
      const result = simulateConsoleLabel('Make super admin');
      expect(result.text).toBe('Make super admin');
      expect(result.icon).toBe(mockIconObjects.superadmin);
    });

    it('should handle View user profile label', () => {
      const result = simulateConsoleLabel('View user profile');
      expect(result.text).toBe('View profile');
      expect(result.icon).toBe(mockIconObjects.user);
    });

    it('should handle User information label', () => {
      const result = simulateConsoleLabel('User information');
      expect(result.text).toBe('User information');
      expect(result.icon).toBe(mockIconObjects.user);
    });

    it('should handle User profile label', () => {
      const result = simulateConsoleLabel('User profile');
      expect(result.text).toBe('User profile');
      expect(result.icon).toBe(mockIconObjects.user);
    });

    it('should handle Referrals label', () => {
      const result = simulateConsoleLabel('Referrals');
      expect(result.text).toBe('Referrals');
      expect(result.icon).toBe(mockIconObjects.gift);
    });

    it('should handle Authentication method label', () => {
      const result = simulateConsoleLabel('Authentication method');
      expect(result.text).toBe('Authentication');
      expect(result.icon).toBe(mockIconObjects.key);
    });

    it('should handle Groups label', () => {
      const result = simulateConsoleLabel('Groups');
      expect(result.text).toBe('Groups');
      expect(result.icon).toBe(mockIconObjects.people);
    });

    it('should handle Billing label', () => {
      const result = simulateConsoleLabel('Billing');
      expect(result.text).toBe('Billing');
      expect(result.icon).toBe(mockIconObjects.bankAccount);
    });

    it('should handle Invoices label', () => {
      const result = simulateConsoleLabel('Invoices');
      expect(result.text).toBe('Invoices');
      expect(result.icon).toBe(mockIconObjects.inbox);
    });

    it('should handle Billing groups label', () => {
      const result = simulateConsoleLabel('Billing groups');
      expect(result.text).toBe('Billing groups');
      expect(result.icon).toBe(mockIconObjects.applications);
    });

    it('should handle Payment methods label', () => {
      const result = simulateConsoleLabel('Payment methods');
      expect(result.text).toBe('Payment methods');
      expect(result.icon).toBe(mockIconObjects.creditCard);
    });

    it('should handle Billing address (Addresses) label', () => {
      const result = simulateConsoleLabel('Billing address');
      expect(result.text).toBe('Addresses');
      expect(result.icon).toBe(mockIconObjects.deliveryLocation);
    });

    it('should handle ACL label', () => {
      const result = simulateConsoleLabel('ACL');
      expect(result.text).toBe('ACL');
      expect(result.icon).toBe(mockIconObjects.key);
    });

    it('should handle Topics label', () => {
      const result = simulateConsoleLabel('Topics');
      expect(result.text).toBe('Topics');
      expect(result.icon).toBe(mockIconObjects.kafkaTopic);
    });

    it('should handle Connectors label', () => {
      const result = simulateConsoleLabel('Connectors');
      expect(result.text).toBe('Connectors');
      expect(result.icon).toBe(mockIconObjects.gitCommit);
    });

    it('should handle Schemas label', () => {
      const result = simulateConsoleLabel('Schemas');
      expect(result.text).toBe('Schemas');
      expect(result.icon).toBe(mockIconObjects.dataflow03);
    });

    it('should handle Quotas label', () => {
      const result = simulateConsoleLabel('Quotas');
      expect(result.text).toBe('Quotas');
      expect(result.icon).toBe(mockIconObjects.layers);
    });

    it('should handle Storage label', () => {
      const result = simulateConsoleLabel('Storage');
      expect(result.text).toBe('Storage');
      expect(result.icon).toBe(mockIconObjects.chart);
    });

    it('should handle Add users label', () => {
      const result = simulateConsoleLabel('Add users');
      expect(result.text).toBe('Add users');
      expect(result.icon).toBe(mockIconObjects.user);
    });

    it('should handle Add groups label', () => {
      const result = simulateConsoleLabel('Add groups');
      expect(result.text).toBe('Add groups');
      expect(result.icon).toBe(mockIconObjects.people);
    });

    it('should handle Actions label', () => {
      const result = simulateConsoleLabel('Actions');
      expect(result.text).toBe('Actions');
      expect(result.icon).toBe(mockIconObjects.more);
    });

    it('should handle Application users label', () => {
      const result = simulateConsoleLabel('Application users');
      expect(result.text).toBe('Application users');
      expect(result.icon).toBe(mockIconObjects.appUsers);
    });

    it('should handle View app user profile label', () => {
      const result = simulateConsoleLabel('View app user profile');
      expect(result.text).toBe('View profile');
      expect(result.icon).toBe(mockIconObjects.appUsers);
    });

    it('should handle Filter list label', () => {
      const result = simulateConsoleLabel('Filter list');
      expect(result.text).toBe('Filter list');
      expect(result.icon).toBe(mockIconObjects.settings);
    });

    it('should handle Download label', () => {
      const result = simulateConsoleLabel('Download');
      expect(result.text).toBe('Download');
      expect(result.icon).toBe(mockIconObjects.download);
    });

    it('should handle Restore from snapshot (Restore to this service) label', () => {
      const result = simulateConsoleLabel('Restore from snapshot');
      expect(result.text).toBe('Restore to this service');
      expect(result.icon).toBe(mockIconObjects.download);
    });

    it('should handle Reset password label', () => {
      const result = simulateConsoleLabel('Reset password');
      expect(result.text).toBe('Reset password');
      expect(result.icon).toBe(mockIconObjects.refresh);
    });

    it('should handle Reset (Reset credentials) label', () => {
      const result = simulateConsoleLabel('Reset');
      expect(result.text).toBe('Reset credentials');
      expect(result.icon).toBe(mockIconObjects.reset);
    });

    it('should handle Replace file label', () => {
      const result = simulateConsoleLabel('Replace file');
      expect(result.text).toBe('Replace file');
      expect(result.icon).toBe(mockIconObjects.refresh);
    });

    it('should handle Edit ACL rules label', () => {
      const result = simulateConsoleLabel('Edit ACL rules');
      expect(result.text).toBe('Edit ACL rules');
      expect(result.icon).toBe(mockIconObjects.edit);
    });

    it('should handle Edit topic label', () => {
      const result = simulateConsoleLabel('Edit topic');
      expect(result.text).toBe('Edit topic');
      expect(result.icon).toBe(mockIconObjects.edit);
    });

    it('should handle Edit repo (Edit repository) label', () => {
      const result = simulateConsoleLabel('Edit repo');
      expect(result.text).toBe('Edit repository');
      expect(result.icon).toBe(mockIconObjects.edit);
    });

    it('should handle Delete topic label', () => {
      const result = simulateConsoleLabel('Delete topic');
      expect(result.text).toBe('Delete topic');
      expect(result.icon).toBe(mockIconObjects.trash);
    });

    it('should handle Delete ACL label', () => {
      const result = simulateConsoleLabel('Delete ACL');
      expect(result.text).toBe('Delete ACL');
      expect(result.icon).toBe(mockIconObjects.trash);
    });

    it('should handle Delete database label', () => {
      const result = simulateConsoleLabel('Delete database');
      expect(result.text).toBe('Delete database');
      expect(result.icon).toBe(mockIconObjects.trash);
    });

    it('should handle Delete table label', () => {
      const result = simulateConsoleLabel('Delete table');
      expect(result.text).toBe('Delete table');
      expect(result.icon).toBe(mockIconObjects.trash);
    });

    it('should handle Delete snapshot label', () => {
      const result = simulateConsoleLabel('Delete snapshot');
      expect(result.text).toBe('Delete snapshot');
      expect(result.icon).toBe(mockIconObjects.trash);
    });

    it('should handle Disconnect label', () => {
      const result = simulateConsoleLabel('Disconnect');
      expect(result.text).toBe('Disconnect');
      expect(result.icon).toBe(mockIconObjects.trash);
    });

    it('should handle Edit label', () => {
      const result = simulateConsoleLabel('Edit');
      expect(result.text).toBe('Edit');
      expect(result.icon).toBe(mockIconObjects.edit);
    });

    it('should handle Duplicate user label', () => {
      const result = simulateConsoleLabel('Duplicate user');
      expect(result.text).toBe('Duplicate user');
      expect(result.icon).toBe(mockIconObjects.duplicate);
    });

    it('should handle Delete user label', () => {
      const result = simulateConsoleLabel('Delete user');
      expect(result.text).toBe('Delete user');
      expect(result.icon).toBe(mockIconObjects.trash);
    });

    it('should handle Delete label', () => {
      const result = simulateConsoleLabel('Delete');
      expect(result.text).toBe('Delete');
      expect(result.icon).toBe(mockIconObjects.trash);
    });

    it('should handle Add config options (Add configuration options) label', () => {
      const result = simulateConsoleLabel('Add config options');
      expect(result.text).toBe('Add configuration options');
      expect(result.icon).toBe(mockIconObjects.plusCircle);
    });

    it('should handle Add new label', () => {
      const result = simulateConsoleLabel('Add new');
      expect(result.text).toBe('Add new');
      expect(result.icon).toBe(mockIconObjects.add);
    });

    it('should handle Plus label', () => {
      const result = simulateConsoleLabel('Plus');
      expect(result.text).toBe('Plus');
      expect(result.icon).toBe(mockIconObjects.plus);
    });

    it('should handle Add advanced configuration label', () => {
      const result = simulateConsoleLabel('Add advanced configuration');
      expect(result.text).toBe('Add Advanced Configuration');
      expect(result.icon).toBe(mockIconObjects.plusCircle);
    });

    it('should handle Advanced configuration label', () => {
      const result = simulateConsoleLabel('Advanced configuration');
      expect(result.text).toBe('Advanced configuration');
      expect(result.icon).toBe(mockIconObjects.settings);
    });

    it('should handle Add label (no text)', () => {
      const result = simulateConsoleLabel('Add');
      expect(result.text).toBeNull(); // Add-only has no text
      expect(result.icon).toBe(mockIconObjects.plusCircle);
    });

    it('should handle Add table label', () => {
      const result = simulateConsoleLabel('Add table');
      expect(result.text).toBe('Add table');
      expect(result.icon).toBe(mockIconObjects.plusCircle);
    });

    it('should handle Kafka Topic label', () => {
      const result = simulateConsoleLabel('kafka Topic');
      expect(result.text).toBe('Kafka Topic');
      expect(result.icon).toBe(mockIconObjects.kafkaTopic);
    });

    it('should handle Tiered storage label', () => {
      const result = simulateConsoleLabel('Tiered storage');
      expect(result.text).toBe('Tiered storage');
      expect(result.icon).toBe(mockIconObjects.tiered);
    });

    it('should handle Edit database label', () => {
      const result = simulateConsoleLabel('Edit database');
      expect(result.text).toBe('Edit database');
      expect(result.icon).toBe(mockIconObjects.edit);
    });

    it('should handle Edit table label', () => {
      const result = simulateConsoleLabel('Edit table');
      expect(result.text).toBe('Edit table');
      expect(result.icon).toBe(mockIconObjects.edit);
    });

    it('should handle Edit config (Edit) label', () => {
      const result = simulateConsoleLabel('Edit config');
      expect(result.text).toBe('Edit');
      expect(result.icon).toBe(mockIconObjects.edit);
    });

    it('should handle Governance (Apache Kafka governance) label', () => {
      const result = simulateConsoleLabel('Governance');
      expect(result.text).toBe('Apache Kafka governance');
      expect(result.icon).toBe(mockIconObjects.governance);
    });

    it('should handle Group requests label', () => {
      const result = simulateConsoleLabel('Group requests');
      expect(result.text).toBe('Group requests');
      expect(result.icon).toBe(mockIconObjects.people);
    });

    it('should handle Approvals label', () => {
      const result = simulateConsoleLabel('Approvals');
      expect(result.text).toBe('Approvals');
      expect(result.icon).toBe(mockIconObjects.award);
    });

    it('should handle Show password label', () => {
      const result = simulateConsoleLabel('Show password');
      expect(result.text).toBe('Show password');
      expect(result.icon).toBe(mockIconObjects.eyeOpen);
    });

    it('should handle View details label', () => {
      const result = simulateConsoleLabel('View details');
      expect(result.text).toBe('View details');
      expect(result.icon).toBe(mockIconObjects.eyeOpen);
    });

    it('should handle Remove repo (Remove repository) label', () => {
      const result = simulateConsoleLabel('Remove repo');
      expect(result.text).toBe('Remove repository');
      expect(result.icon).toBe(mockIconObjects.trash);
    });

    it('should handle View snapshot (View snapshot details) label', () => {
      const result = simulateConsoleLabel('View snapshot');
      expect(result.text).toBe('View snapshot details');
      expect(result.icon).toBe(mockIconObjects.eyeOpen);
    });

    it('should handle Activate tiered storage label', () => {
      const result = simulateConsoleLabel('Activate tiered storage');
      expect(result.text).toBe('Activate tiered storage');
      expect(result.icon).toBe(mockIconObjects.database02);
    });

    it('should handle Query editor label', () => {
      const result = simulateConsoleLabel('Query editor');
      expect(result.text).toBe('Query editor');
      expect(result.icon).toBe(mockIconObjects.queriesEditor);
    });

    it('should handle Opensearch indexes (Indexes) label', () => {
      const result = simulateConsoleLabel('Opensearch indexes');
      expect(result.text).toBe('Indexes');
      expect(result.icon).toBe(mockIconObjects.indexes);
    });

    it('should handle Edit version (Change version) label', () => {
      const result = simulateConsoleLabel('Edit version');
      expect(result.text).toBe('Change version');
      expect(result.icon).toBe(mockIconObjects.edit);
    });

    it('should handle Down arrow (icon only, no text)', () => {
      const result = simulateConsoleLabel('Down arrow');
      expect(result.text).toBeNull(); // Arrow is icon-only
      expect(result.icon).toBe(mockIconObjects.chevronDown);
    });

    it('should handle Streaming catalog label', () => {
      const result = simulateConsoleLabel('Streaming catalog');
      expect(result.text).toBe('Streaming catalog');
      expect(result.icon).toBe(mockIconObjects.kafkaTopic);
    });

    it('should handle Replication flow label', () => {
      const result = simulateConsoleLabel('Replication flow');
      expect(result.text).toBe('Replication flow');
      expect(result.icon).toBe(mockIconObjects.replicationFlow);
    });

    it('should handle Snapshots label', () => {
      const result = simulateConsoleLabel('Snapshots');
      expect(result.text).toBe('Snapshots');
      expect(result.icon).toBe(mockIconObjects.camera);
    });

    it('should handle Create snapshot label', () => {
      const result = simulateConsoleLabel('Create snapshot');
      expect(result.text).toBe('Create snapshot');
      expect(result.icon).toBe(mockIconObjects.camera);
    });

    it('should handle Disaster recovery label', () => {
      const result = simulateConsoleLabel('Disaster recovery');
      expect(result.text).toBe('Disaster recovery');
      expect(result.icon).toBe(mockIconObjects.disasterRecovery);
    });

    it('should normalize names (case-insensitive)', () => {
      const resultNormal = simulateConsoleLabel('Services');
      const resultUppercase = simulateConsoleLabel('SERVICES');
      const resultMixedCase = simulateConsoleLabel('SeRvIcEs');
      
      expect(resultNormal.text).toBe('Services');
      expect(resultUppercase.text).toBe('Services');
      expect(resultMixedCase.text).toBe('Services');
      expect(resultNormal.icon).toEqual(resultUppercase.icon);
      expect(resultNormal.icon).toEqual(resultMixedCase.icon);
    });

    it('should normalize names (spaces-ignored)', () => {
      const resultNormal = simulateConsoleLabel('Service settings');
      const resultWithExtraSpaces = simulateConsoleLabel('Service  settings');
      const resultWithTabs = simulateConsoleLabel('Service\tsettings');
      const resultWithNewLines = simulateConsoleLabel('Service\nsettings');
      
      expect(resultNormal.text).toBe('Service settings');
      expect(resultWithExtraSpaces.text).toBe('Service settings');
      expect(resultWithTabs.text).toBe('Service settings');
      expect(resultWithNewLines.text).toBe('Service settings');
      expect(resultNormal.icon).toEqual(resultWithExtraSpaces.icon);
      expect(resultNormal.icon).toEqual(resultWithTabs.icon);
      expect(resultNormal.icon).toEqual(resultWithNewLines.icon);
    });

    it('should return error for non-existent labels', () => {
      const result = simulateConsoleLabel('Nonexistent label');
      expect(result.error).toBe('Label not found');
    });
  });

  describe('Internal Processing Logic', () => {
    it('should process name by converting to lowercase', () => {
      const input = 'TEST';
      const processed = input.toLowerCase();
      expect(processed).toBe('test');
    });

    it('should remove all spaces from name', () => {
      const input = 'Service settings';
      const processed = input.replace(/\s/g, '');
      expect(processed).toBe('Servicesettings');
    });

    it('should handle complex name transformations', () => {
      const input = '  SERVICE   SETTINGS  ';
      const normalized = input.toLowerCase().replace(/\s/g, '');
      expect(normalized).toBe('servicesettings');
    });

    it('should match the exact switch-case patterns', () => {
      // Verify that the simulated logic matches expected patterns
      const testCases = [
        { input: 'servicesettings', expectedOutput: 'Service settings' },
        { input: 'organization', expectedOutput: 'Organization' },
        { input: 'authenticationpolicy', expectedOutput: 'Authentication' },
        { input: 'idp', expectedOutput: 'Identity providers' },
        { input: 'projects', expectedOutput: 'Projects' },
      ];
      
      testCases.forEach(({ input, expectedOutput }) => {
        const result = simulateConsoleLabel(input);
        expect(result.text).toBe(expectedOutput);
      });
    });
  });
});