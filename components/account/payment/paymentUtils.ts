export const ACCOUNT_ACCESS_PASSWORD = '123456';

export function maskCardLast4(last4?: string) {
  const safeLast4 = (last4 ?? '').replace(/\D/g, '').slice(-4).padStart(4, '0');
  return `**** **** **** ${safeLast4}`;
}

export function maskFullNumber(number?: string, fallbackLast4?: string) {
  const raw = number ?? fallbackLast4 ?? '';
  const digits = raw.replace(/\D/g, '').slice(-16).padStart(16, '0');
  return `**** **** **** ${digits.slice(-4)}`;
}
