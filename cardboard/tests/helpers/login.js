import { click, waitFor, visit } from '@ember/test-helpers';
import { getContext } from '@ember/test-helpers';
import { run } from '@ember/runloop';

function setMockUser(userId) {
  let { owner } = getContext();
  let mockLogin = owner.lookup('service:mock-login');
  run(() => mockLogin.set('mockUserId', userId));
}

async function login(userId) {
  setMockUser(userId);
  await visit('/');
  await click('[data-test-signin-button]');
  await waitFor('[data-test-signout-button');
}

export {
  setMockUser,
  login
}