module.exports = [{
  path: '/articles/:friendly_id',
  query: {
    filter: {
      type: { exact: 'articles' },
      slug: { exact: ':friendly_id' }
    }
  },
},{
  path: '/:type/:id',
  query: {
    filter: {
      type: { exact: ':type' },
      id: { exact: ':id' }
    }
  },
},{
  path: '/',
  query: {
    filter: {
      type: { exact: 'boards' },
      id: { exact: 'community' }
    }
  },
}];
