import ENV from '../config/environment';
import { clientId } from '@cardstack/github-auth/environment';

export function initialize(appInstance) {
  if (clientId || ENV.environment !== 'development') { return; }

  let mockLogin = appInstance.lookup('service:mock-login');
  mockLogin.set('mockUserId', 'mock-user')
}

export default {
  initialize
};
