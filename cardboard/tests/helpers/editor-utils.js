
import { click, waitFor } from '@ember/test-helpers';

export async function saveDocument() {
  await click('[data-test-cs-version-control-button-save="false"]');
  await waitFor('[data-test-cs-version-control-button-save="true"]');
}

export function findTriggerElementWithLabel(labelRegex) {
  return [...document.querySelectorAll('.cs-toolbox-section label')].find(element => labelRegex.test(element.textContent));
}