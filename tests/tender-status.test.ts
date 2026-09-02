import test from 'node:test';
import assert from 'node:assert/strict';

import { isTenderLive } from '../app/lib/tender-status.ts';

test('treats a tender ending yesterday as archived when the local date has moved on', () => {
  const now = new Date('2026-09-02T00:30:00+05:30');

  assert.equal(isTenderLive('2026-09-01', now), false);
});

test('keeps a tender live when its end date is still today in the local timezone', () => {
  const now = new Date('2026-09-02T00:30:00+05:30');

  assert.equal(isTenderLive('2026-09-02', now), true);
});
