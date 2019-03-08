import { click, waitFor, visit } from '@ember/test-helpers';
import { getContext } from '@ember/test-helpers';
import { run } from '@ember/runloop';

export function setMockUser(userId) {
  let { owner } = getContext();
  let mockLogin = owner.lookup('service:mock-login');
  run(() => mockLogin.set('mockUserId', userId));
}

export async function login(userId) {
  setMockUser(userId);
  await visit('/');
  await click('[data-test-signin-button]');
  await waitFor('[data-test-signout-button');
}

export function setupMockUser(factory) {
  factory.addResource('github-users', 'github-writer')
    .withAttributes({
      name: "Writer McWriteface",
      permissions: ['cardstack/cardboard-data:read', 'cardstack/cardboard-data:write']
    });
  factory.addResource('data-sources', 'mock-auth')
    .withAttributes({
      sourceType: '@cardstack/mock-auth',
      'may-create-user': true,
      'user-rewriter': './cardstack/mock-auth-rewriter.js',
      params: {
        provideUserSchema: false,
        users: {
          'github-writer': { type: 'github-users', id: 'github-writer' },
        }
      }
    });
}