import { test, expect } from 'vitest';
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

  expect(prevented).toBe(true);
  expect(result).toEqual({ fullName: 'Alice' });
  expect(logs[0]).toEqual(['Onboarding form submitted:', { fullName: 'Alice' }]);
});
