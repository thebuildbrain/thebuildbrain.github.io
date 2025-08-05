import test from 'node:test';
import assert from 'node:assert/strict';
import { handleOnboardingSubmit } from './onboardingHandlers.js';

test('handleOnboardingSubmit prevents default and logs data', () => {
  let prevented = false;
  const fd = new FormData();
  fd.set('fullName', 'Alice');

  const event = {
    preventDefault: () => {
      prevented = true;
    },
    target: fd,
  };

  const logs = [];
  const originalLog = console.log;
  console.log = (...args) => logs.push(args);

  const result = handleOnboardingSubmit(event);

  console.log = originalLog;

  assert.equal(prevented, true);
  assert.deepEqual(result, { fullName: 'Alice' });
  assert.deepEqual(logs[0], ['Onboarding form submitted:', { fullName: 'Alice' }]);
});
