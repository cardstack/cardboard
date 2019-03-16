
import { ciSessionId } from '@cardstack/test-support/environment';
import { hubURL } from '@cardstack/plugin-utils/environment';
import { click, waitFor } from '@ember/test-helpers';

export async function getDocument(type, id) {
  let url = `${hubURL}/api/${type}/${id}`;
  let response = await fetch(url, {
    headers: {
      authorization: `Bearer ${ciSessionId}`,
      "content-type": 'application/vnd.api+json'
    }
  });
  return (await response.json()).data;
}

export async function saveDocument(context) {
  await click('[data-test-cs-version-control-button-save="false"]');
  await waitFor('[data-test-cs-version-control-button-save="true"]');

  let service = context.owner.lookup('service:article-registration');
  await Promise.resolve(service.get('registerArticle'));
}

export function findTriggerElementWithLabel(labelRegex) {
  return [...document.querySelectorAll('.cs-toolbox-section label')].find(element => labelRegex.test(element.textContent));
}