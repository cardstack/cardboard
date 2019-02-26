import Component from '@ember/component';
import { computed, get } from '@ember/object';

export default Component.extend({
  tagName: '',
  useGithubAuth: computed(function() {
    let githubAuthEnv;
    try {
      githubAuthEnv = window.require('@cardstack/github-auth/environment');
    } catch (e) {
      // dont assume github datasource is present
      return false;
    }
    return Boolean(get(githubAuthEnv, 'clientId'));
  })
});
