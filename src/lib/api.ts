export interface LeadPayload {
  name: string;
  phone: string;
  source: string;
  details?: string;
  createdAt: string;
}

export interface LeadResult {
  ok: boolean;
  id: string;
}

const STORAGE_KEY = 'kvart-remont:leads';

/**
 * Слой-абстракция отправки заявок (AGENTS.md).
 * Сейчас: localStorage + имитация сети. Позже здесь будет fetch к
 * SQLite-бэкенду — формы и модалка не изменятся.
 */
export async function submitLead(
  payload: Omit<LeadPayload, 'createdAt'>,
): Promise<LeadResult> {
  const lead: LeadPayload = {
    ...payload,
    createdAt: new Date().toISOString(),
  };

  // Имитация сетевой задержки, чтобы были видны состояния загрузки.
  await new Promise((r) => setTimeout(r, 500));

  const id = `lead-${Date.now().toString(36)}`;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const list: LeadPayload[] = raw ? JSON.parse(raw) : [];
    list.push(lead);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Приватный режим и т.п. — заявка всё равно считается принятой,
    // позже уйдёт на бэкенд. Не роняем UI.
  }

  return { ok: true, id };
}
