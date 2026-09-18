export interface CalcSummary {
  area: number;
  repairType: string;
  rooms: string;
  options: string[];
  priceMin: number;
  priceMax: number;
}

export interface LeadInput {
  name: string;
  /** Нормализованный телефон: 11 цифр, начинается с 7 */
  phone: string;
  /** Откуда открыта модалка: hero / header / calculator / zamer */
  source: string;
  calc?: CalcSummary;
}

export interface Lead extends LeadInput {
  id: string;
  createdAt: string;
}

const STORAGE_KEY = 'remont-kvartir-leads';

/** Заглушка бэкенда: пишем в localStorage + имитация сети 400мс.
 *  Позже заменить тело на fetch к SQLite-бэкенду — сигнатура не меняется. */
export async function submitLead(input: LeadInput): Promise<Lead> {
  await new Promise((r) => setTimeout(r, 400));
  const lead: Lead = {
    ...input,
    id:
      typeof crypto !== 'undefined' && 'randomUUID' in crypto
        ? crypto.randomUUID()
        : `lead-${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: Lead[] = raw ? (JSON.parse(raw) as Lead[]) : [];
    list.push(lead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // localStorage может быть недоступен — заявка всё равно считается принятой
  }
  return lead;
}

export function listLeads(): Lead[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Lead[]) : [];
  } catch {
    return [];
  }
}
