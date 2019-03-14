const JSONAPIFactory = require('@cardstack/test-support/jsonapi-factory');

let factory = new JSONAPIFactory();
factory.addResource('content-types', 'articles')
  .withAttributes({
    defaultIncludes: ['cover-image', 'theme', 'category'],
    fieldsets: {
      embedded: [
        { field: 'cover-image', format: 'embedded'},
        { field: 'cover-image.file', format: 'embedded'},
        { field: 'theme', format: 'embedded' },
        { field: 'category', format: 'embedded' },
      ],
      isolated: [
        { field: 'theme', format: 'embedded' },
        { field: 'category', format: 'embedded' },
        { field: 'cover-image', format: 'embedded'},
        { field: 'cover-image.file', format: 'embedded'},
      ]
    }
  })
  .withRelated('fields', [
    factory.addResource('fields', 'slug').withAttributes({
      editorOptions: { headerSection: true, sortOrder: 150 },
      caption: 'URL Path',
      editorComponent: 'field-editors/url-path',
      fieldType: '@cardstack/core-types::string'
    }),

    factory.addResource('fields', 'title').withAttributes({
      editorOptions: { headerSection: true, sortOrder: 10 },
      fieldType: '@cardstack/core-types::string'
    }),

    factory.addResource('fields', 'subhead').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),

    factory.addResource('fields', 'description').withAttributes({
      fieldType: '@cardstack/core-types::string',
      editorComponent: 'field-editors/string-text-area'
    }),

    factory.addResource('fields', 'body').withAttributes({
      fieldType: '@cardstack/mobiledoc'
    }),

    factory.addResource('fields', 'created-date').withAttributes({
      editorOptions: { headerSection: true, sortOrder: 120, hideTitle: true },
      editorComponent: 'field-editors/created-date',
      fieldType: '@cardstack/core-types::date',
    }),

    factory.addResource('fields', 'published-date').withAttributes({
      fieldType: '@cardstack/core-types::date',
      editorOptions: { headerSection: true, sortOrder: 30 },
      caption: 'Published',
      editorComponent: 'field-editors/publish-toggle'
    }),

    factory.addResource('fields', 'cover-image').withAttributes({
      fieldType: '@cardstack/core-types::belongs-to',
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'cardstack-images' }]),

    factory.addResource('fields', 'author').withAttributes({
      fieldType: '@cardstack/core-types::belongs-to',
      editorOptions: { hideFromEditor: true },
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'github-users' }]),

    factory.addResource('fields', 'category').withAttributes({
      fieldType: '@cardstack/core-types::belongs-to',
      editorOptions: { displayFieldName: 'name' },
      editorComponent: 'field-editors/dropdown-choices-editor'
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'categories' }]),

    factory.addResource('fields', 'theme').withAttributes({
      // TODO we'll need to add a custom theme picker field editor component
      editorComponent: 'field-editors/dropdown-choices-editor',
      editorOptions: { displayFieldName: 'name' },
      fieldType: '@cardstack/core-types::belongs-to'
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'themes' }]),

    factory.addResource('fields', 'readers').withAttributes({
      editorOptions: { hideFromEditor: true },
      fieldType: '@cardstack/core-types::belongs-to'
    })
    .withRelated('related-types', [{ type: 'content-types', id: 'groups' }]),

    factory.addResource('computed-fields', 'is-draft').withAttributes({
      editorOptions: { hideFromEditor: true },
      'computed-field-type': 'cardboard-article::is-draft',
    }),

    factory.addResource('computed-fields', 'author-name').withAttributes({
      editorOptions: { hideFromEditor: true },
      'computed-field-type': '@cardstack/core-types::alias',
      params: {
        'aliasPath': 'author.name',
      }
    }),

  ]);

factory.addResource('constraints')
  .withAttributes({
    constraintType: '@cardstack/core-types::not-empty',
    inputs: { ignoreBlank: true }
  })
  .withRelated('input-assignments', [
    factory.addResource('input-assignments')
      .withAttributes({ inputName: 'target' })
      .withRelated('field', factory.getResource('fields', 'slug')),
  ]);

factory.addResource('content-types', 'categories')
  .withRelated('fields', [
    factory.addResource('fields', 'name').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
  ]);

factory.addResource('content-types', 'themes')
  .withRelated('fields', [
    factory.addResource('fields', 'name').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
    factory.addResource('fields', 'cover').withAttributes({
      fieldType: '@cardstack/core-types::string'
    }),
  ]);

factory.addResource('grants', 'article-world-read')
  .withRelated('who', [{ type: 'fields', id: 'readers' }])
  .withRelated('types', [
    { type: 'content-types', id: 'articles' }
  ])
  .withAttributes({
    'may-read-resource': true,
    'may-read-fields': true,
  });

factory.addResource('grants', 'article-misc-world-read')
  .withRelated('who', [{ type: 'groups', id: 'everyone' }])
  .withRelated('types', [
    { type: 'content-types', id: 'themes' },
    { type: 'content-types', id: 'categories' },
  ])
  .withAttributes({
    'may-read-resource': true,
    'may-read-fields': true,
  });

factory.addResource('grants', 'article-writers-update')
  .withRelated('who', [{ type: 'groups', id: 'github-writers' }])
  .withRelated('types', [
    { type: 'content-types', id: 'articles' }
  ])
  .withAttributes({
    'may-create-resource': true,
    'may-update-resource': true,
    'may-delete-resource': true,
    'may-write-fields': true
  });

let models = factory.getModels();
module.exports = function() { return models; };
