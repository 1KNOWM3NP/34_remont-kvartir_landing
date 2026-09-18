/**
 * Маска российского телефона +7 (___) ___-__-__.
 * Принимает любой ввод (8, +7, голые цифры), возвращает отформатированную
 * строку. Пустой ввод → пустая строка (без висячего «+7»).
 */
export function maskPhone(raw: string): string {
  const digitsOnly = raw.replace(/\D/g, '');
  if (digitsOnly.length === 0) return '';

  let digits = digitsOnly;
  if (digits.startsWith('8')) digits = `7${digits.slice(1)}`;
  if (!digits.startsWith('7')) digits = `7${digits}`;
  digits = digits.slice(0, 11);

  const p = digits.slice(1); // до 10 цифр после семёрки
  let out = '+7';
  if (p.length > 0) out += ` (${p.slice(0, 3)}`;
  if (p.length >= 3) out += ')';
  if (p.length > 3) out += ` ${p.slice(3, 6)}`;
  if (p.length > 6) out += `-${p.slice(6, 8)}`;
  if (p.length > 8) out += `-${p.slice(8, 10)}`;
  return out;
}

/** Полный номер: 11 цифр (7 + 10). */
export function isCompletePhone(value: string): boolean {
  return value.replace(/\D/g, '').length === 11;
}

/** Имя: минимум 2 буквы (дефисы и пробелы разрешены). */
export function isValidName(value: string): boolean {
  return value.trim().length >= 2;
}
