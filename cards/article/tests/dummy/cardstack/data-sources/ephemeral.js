/* eslint-env node */

module.exports = [
  {
    type: 'plugin-configs',
    id: '@cardstack/hub',
    relationships: {
      'default-data-source': {
        data: { type: 'data-sources', id: 0 }
      }
    }
  },
  {
    type: 'data-sources',
    id: 0,
    attributes: {
      'source-type': '@cardstack/ephemeral',
    }
  },
  {
    type: 'data-sources',
    id: 'github',
    attributes: {
      'source-type': '@cardstack/github-auth',
      params: {
        permissions: [
          { repo: 'cardstack/cardboard-data', permission: 'read' },
          { repo: 'cardstack/cardboard-data', permission: 'write' },
        ]
      }
    }
  },
  {
    type: 'grants',
    id: 'wide-open',
    attributes: {
      'may-create-resource': true,
      'may-read-resource': true,
      'may-update-resource': true,
      'may-delete-resource': true,
      'may-write-fields': true,
      'may-read-fields': true
    },
    relationships: {
      who: {
        data: [{
          type: 'groups',
          id: 'everyone'
        }]
      }
    }
  }
];
