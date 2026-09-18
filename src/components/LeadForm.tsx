import { useState } from 'react';
import type { FormEvent } from 'react';
import { submitLead } from '../lib/api';
import { isCompletePhone, isValidName, maskPhone } from '../lib/phone';

interface LeadFormProps {
  source: string;
  details?: string;
  /** Тёмный фон (карточка #zamer) — светлые тексты ошибок/подписей. */
  dark?: boolean;
  idPrefix: string;
}

type Status = 'idle' | 'sending' | 'success' | 'error';

/**
 * Форма заявки: имя + телефон с маской. Переиспользуется в модалке
 * и в инлайн-блоке #zamer. Отправка — через src/lib/api.ts.
 */
export default function LeadForm({ source, details, dark = false, idPrefix }: LeadFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const [status, setStatus] = useState<Status>('idle');

  const nameError = touched && !isValidName(name) ? 'Подскажите, как к вам обращаться' : null;
  const phoneError =
    touched && !isCompletePhone(phone) ? 'Введите номер полностью: +7 (___) ___-__-__' : null;

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!isValidName(name)) {
      document.getElementById(`${idPrefix}-name`)?.focus();
      return;
    }
    if (!isCompletePhone(phone)) {
      document.getElementById(`${idPrefix}-phone`)?.focus();
      return;
    }
    setStatus('sending');
    try {
      const res = await submitLead({ name: name.trim(), phone, source, details });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="py-2 text-center" role="status">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent">
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-7 w-7">
            <path
              d="m5 12.5 4.5 4.5L19 7.5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <p className="mt-4 font-display text-xl font-extrabold">Заявка принята!</p>
        <p className={`mt-2 break-words ${dark ? 'text-white/80' : 'text-muted-foreground'}`}>
          {name.trim()}, перезвоним в течение 15 минут и договоримся о замере.
        </p>
      </div>
    );
  }

  const errorText = dark ? 'text-amber-300' : 'text-destructive';
  const inputClass =
    'min-h-12 w-full rounded-xl border-2 bg-card px-4 py-3 text-base text-foreground transition-colors duration-200 placeholder:text-muted-foreground/70 focus:border-ring focus:outline-none';

  return (
    <form onSubmit={onSubmit} noValidate aria-label="Форма заявки на замер">
      {details && (
        <p
          className={`mb-4 rounded-xl px-4 py-3 text-sm break-words ${
            dark ? 'bg-white/10 text-white/90' : 'bg-muted text-muted-foreground'
          }`}
        >
          Ваш расчёт: <strong className={dark ? 'text-white' : 'text-foreground'}>{details}</strong>
          {' '}— назовём точную смету после замера.
        </p>
      )}

      <div>
        <label htmlFor={`${idPrefix}-name`} className="font-display text-sm font-extrabold">
          Ваше имя
        </label>
        <input
          id={`${idPrefix}-name`}
          type="text"
          name="name"
          autoComplete="name"
          placeholder="Например, Анна…"
          value={name}
          onChange={(e) => setName(e.target.value)}
          aria-invalid={nameError ? true : undefined}
          aria-describedby={nameError ? `${idPrefix}-name-error` : undefined}
          className={`${inputClass} mt-1.5 ${nameError ? 'border-destructive' : 'border-border'}`}
        />
        {nameError && (
          <p id={`${idPrefix}-name-error`} role="alert" className={`mt-1.5 text-sm font-semibold ${errorText}`}>
            {nameError}
          </p>
        )}
      </div>

      <div className="mt-4">
        <label htmlFor={`${idPrefix}-phone`} className="font-display text-sm font-extrabold">
          Телефон
        </label>
        <input
          id={`${idPrefix}-phone`}
          type="tel"
          name="phone"
          autoComplete="tel"
          inputMode="tel"
          placeholder="+7 (___) ___-__-__"
          value={phone}
          onChange={(e) => setPhone(maskPhone(e.target.value))}
          aria-invalid={phoneError ? true : undefined}
          aria-describedby={phoneError ? `${idPrefix}-phone-error` : undefined}
          className={`${inputClass} mt-1.5 ${phoneError ? 'border-destructive' : 'border-border'}`}
        />
        {phoneError && (
          <p id={`${idPrefix}-phone-error`} role="alert" className={`mt-1.5 text-sm font-semibold ${errorText}`}>
            {phoneError}
          </p>
        )}
      </div>

      {status === 'error' && (
        <p role="alert" className={`mt-3 text-sm font-semibold ${errorText}`}>
          Не получилось отправить. Позвоните нам:{' '}
          <a href="tel:+74951204567" className="underline underline-offset-2">
            +7 495 120-45-67
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-5 flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-accent px-7 py-3 font-display text-base font-extrabold text-on-accent shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-px hover:bg-accent-dark disabled:cursor-wait disabled:opacity-70 disabled:hover:translate-y-0"
      >
        {status === 'sending' ? 'Отправляем…' : 'Перезвоните мне'}
      </button>
      <p className={`mt-3 text-center text-xs ${dark ? 'text-white/60' : 'text-muted-foreground'}`}>
        Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных
      </p>
    </form>
  );
}
