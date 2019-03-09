import { ciSessionId } from '@cardstack/test-support/environment';
import { hubURL } from '@cardstack/plugin-utils/environment';
import { setupMockUser } from './login';
import moment from 'moment';

export async function getArticles() {
  let url = `${hubURL}/api/articles`;
  let response = await fetch(url, {
    headers: {
      authorization: `Bearer ${ciSessionId}`,
      "content-type": 'application/vnd.api+json'
    }
  });
  return (await response.json()).data;
}

export function setupThemes(factory) {
  factory.addResource('themes', 'modern')
    .withAttributes({ name: 'Modern' });
  factory.addResource('themes', 'sharp')
    .withAttributes({ name: 'Sharp' });
  factory.addResource('themes', 'dark')
    .withAttributes({ name: 'Dark' });
}

export function setupCategories(factory) {
  factory.addResource('categories', 'lolz')
    .withAttributes({ name: 'LOLz' });
  factory.addResource('categories', 'squash')
    .withAttributes({ name: 'Squash' });
  factory.addResource('categories', 'hair')
    .withAttributes({ name: 'Hair' });
}

export function setupTestImage(factory) {
  factory.addResource('cardstack-images', 'test-image')
    .withRelated('file', factory.addResource('cardstack-files', 'lol-cat.jpg')
      .withAttributes({
        'content-type': 'image/jpg',
        'file-name': 'lol-cat.jpg'
      }));
}

export function setupTestArticle(factory) {
  setupMockUser(factory);
  setupThemes(factory);
  setupCategories(factory);
  setupTestImage(factory);

  factory.addResource('articles', '123')
    .withAttributes({
      title: 'Hello',
      slug: 'hello',
      'created-date': moment().toISOString(),
      'published-date': moment().toISOString(),
      description: 'Why doors?',
      body: { 'atoms': [], 'cards': [], 'markups': [['strong']], 'version': '0.3.1', 'sections': [[1, 'p', [[0, [], 0, `Hi everybody! I'm squash.`]]]] }
    })
    .withRelated('readers', { type: 'groups', id: 'everyone' })
    .withRelated('author', { type: 'github-users', id: 'github-writer' })
    .withRelated('theme', { type: 'themes', id: 'modern' })
    .withRelated('category', { type: 'categories', id: 'lolz' })
    .withRelated('cover-image', { type: 'cardstack-images', id: 'test-image' });
}