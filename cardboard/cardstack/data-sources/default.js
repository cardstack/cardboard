let sources = [
  {
    type: 'plugin-configs',
    id: '@cardstack/hub',
    attributes: {
      'plugin-config': {
        'application-card': { type: 'boards', id: 'community' }
      }
    },
    relationships: {
      'default-data-source': {
        data: { type: 'data-sources', id: 'default' }
      }
    }
  }
];

if (process.env.HUB_ENVIRONMENT === 'production') {
  sources.push({
    type: 'data-sources',
    id: 'default',
    attributes: {
      'source-type': '@cardstack/git',
      params: {
        branchPrefix: process.env.GIT_BRANCH_PREFIX,
        remote: {
          url: 'git@github.com:cardstack/cardboard-data.git',
          privateKey: process.env.GIT_PRIVATE_KEY,
        }
      }
    }
  });
} else {
  sources.push({
    type: 'data-sources',
    id: 'default',
    attributes: {
      'source-type': '@cardstack/ephemeral'
    }
  });
}

module.exports = sources;
