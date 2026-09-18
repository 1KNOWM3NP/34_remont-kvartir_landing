/** Нормализация: только цифры; 8xxxxxxxxxx → 7xxxxxxxxxx */
export function normalizePhone(value: string): string {
  const digits = value.replace(/\D/g, '');
  if (digits.startsWith('8') && digits.length === 11) return '7' + digits.slice(1);
  return digits;
}

/** Валиден, если 11 цифр и начинается с 7 (российский мобильный/городской) */
export function isValidPhone(value: string): boolean {
  const d = normalizePhone(value);
  return d.length === 11 && d.startsWith('7');
}

/** Маска +7 (___) ___-__-__ по мере ввода. Пустой ввод → ''. */
export function formatPhoneMask(value: string): string {
  let d = value.replace(/\D/g, '');
  if (d === '') return '';
  if (d.startsWith('8')) d = '7' + d.slice(1);
  if (!d.startsWith('7')) d = '7' + d;
  d = d.slice(0, 11);

  const p1 = d.slice(1, 4);
  const p2 = d.slice(4, 7);
  const p3 = d.slice(7, 9);
  const p4 = d.slice(9, 11);

  let out = '+7';
  if (p1) out += ` (${p1}`;
  if (d.length >= 5) out += ')';
  else if (p1) return out;
  else return out;
  if (p2) out += ` ${p2}`;
  if (p3) out += `-${p3}`;
  if (p4) out += `-${p4}`;
  return out;
}

export function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}
