import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { beforeEach, afterEach, test, expect, vi } from 'vitest';
import React from 'react';

beforeEach(() => {
  vi.resetModules();
});

afterEach(() => {
  vi.unstubAllEnvs();
  cleanup();
});

test('entering the correct access code reveals the onboarding form', async () => {
  vi.stubEnv('VITE_ACCESS_CODE', 'SECRET');
  const { default: DynamicAccessForm } = await import('./DynamicAccessForm.jsx');
  render(<DynamicAccessForm />);
  const input = screen.getByPlaceholderText(/Enter onboarding code/i);
  fireEvent.change(input, { target: { value: 'SECRET' } });
  fireEvent.submit(input.closest('form'));
  expect(screen.getByText('Full Name')).toBeDefined();
});

test('incorrect code triggers alert and resets input field', async () => {
  vi.stubEnv('VITE_ACCESS_CODE', 'SECRET');
  const alertMock = vi.spyOn(window, 'alert').mockImplementation(() => {});
  const { default: DynamicAccessForm } = await import('./DynamicAccessForm.jsx');
  render(<DynamicAccessForm />);
  const input = screen.getByPlaceholderText(/Enter onboarding code/i);
  fireEvent.change(input, { target: { value: 'WRONG' } });
  fireEvent.submit(input.closest('form'));
  expect(alertMock).toHaveBeenCalledWith('🚫 Incorrect code');
  expect(input.value).toBe('');
  alertMock.mockRestore();
});
