import test from 'node:test';
import assert from 'node:assert/strict';

import { parseValidAccounts } from '../app/lib/auth-accounts';

test('parses the valid-account env list into email/password pairs', () => {
  const accounts = parseValidAccounts('mukul.kr99@gmail.com:test@123,mukul.kr9924@gmail.com:test@123');

  assert.deepEqual(accounts.get('mukul.kr99@gmail.com'), 'test@123');
  assert.deepEqual(accounts.get('mukul.kr9924@gmail.com'), 'test@123');
  assert.equal(accounts.size, 2);
});

test('ignores blank and malformed entries when parsing valid accounts', () => {
  const accounts = parseValidAccounts('mukul.kr99@gmail.com:test@123,,bad-entry,another@example.com:pass:with:extra');

  assert.deepEqual(accounts.get('mukul.kr99@gmail.com'), 'test@123');
  assert.deepEqual(accounts.get('another@example.com'), 'pass:with:extra');
  assert.equal(accounts.size, 2);
});
