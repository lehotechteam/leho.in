export function parseValidAccounts(rawValue?: string): Map<string, string> {
  const accounts = new Map<string, string>();

  if (!rawValue || !rawValue.trim()) {
    return accounts;
  }

  const entries = rawValue.split(',');

  for (const item of entries) {
    const candidate = item.trim();

    if (!candidate || !candidate.includes(':')) {
      continue;
    }

    const separatorIndex = candidate.indexOf(':');
    const email = candidate.slice(0, separatorIndex).trim().toLowerCase();
    const password = candidate.slice(separatorIndex + 1).trim();

    if (!email || !password) {
      continue;
    }

    accounts.set(email, password);
  }

  return accounts;
}
