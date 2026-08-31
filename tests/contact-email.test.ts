import test from 'node:test';
import assert from 'node:assert/strict';

import { createContactEmail } from '../app/lib/contact-email';

test('creates a formatted contact email from form values', () => {
  const email = createContactEmail({
    name: 'Aisha Khan',
    email: 'aisha@example.com',
    phone: '+91 98765 43210',
    message: 'We would like to collaborate on a project.'
  });

  assert.equal(email.subject, 'New message from Aisha Khan via LEHO contact form');
  assert.match(email.text, /Name: Aisha Khan/);
  assert.match(email.text, /Email: aisha@example.com/);
  assert.match(email.text, /Phone: \+91 98765 43210/);
  assert.match(email.text, /Message:\nWe would like to collaborate on a project\./);
});
