import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { submitLead, type CalcSummary } from '../lib/api';
import { formatPhoneMask, isValidName, isValidPhone, normalizePhone } from '../lib/phone';

interface OpenArgs {
  source: string;
  title?: string;
  calc?: CalcSummary;
}

interface LeadModalCtx {
  openLead: (args: OpenArgs) => void;
}

const Ctx = createContext<LeadModalCtx>({ openLead: () => {} });

export const useLeadModal = () => useContext(Ctx);

export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<OpenArgs | null>(null);
  const openLead = useCallback((args: OpenArgs) => setState(args), []);
  return (
    <Ctx.Provider value={{ openLead }}>
      {children}
      <LeadModal
        opened={state}
        onClose={() => setState(null)}
      />
    </Ctx.Provider>
  );
}

const TITLES: Record<string, string> = {
  hero: 'Бесплатный замер',
  header: 'Заказать звонок',
  calculator: 'Получить точную смету',
  zamer: 'Бесплатный замер',
};

function LeadModal({
  opened,
  onClose,
}: {
  opened: OpenArgs | null;
  onClose: () => void;
}) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [sendError, setSendError] = useState('');
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameId = useId();
  const phoneId = useId();
  const nameErrId = useId();
  const phoneErrId = useId();

  // Сброс формы при каждом открытии
  useEffect(() => {
    if (opened) {
      setName('');
      setPhone('');
      setTouched(false);
      setSending(false);
      setDone(false);
      setSendError('');
    }
  }, [opened]);

  // Escape + лок скролла + фокус в диалог
  useEffect(() => {
    if (!opened) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const t = setTimeout(
      () => dialogRef.current?.querySelector<HTMLInputElement>('input')?.focus(),
      30,
    );
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [opened, onClose]);

  if (!opened) return null;

  const title = opened.title ?? TITLES[opened.source] ?? 'Оставить заявку';
  const nameOk = isValidName(name);
  const phoneOk = isValidPhone(phone);
  const showNameErr = touched && !nameOk;
  const showPhoneErr = touched && !phoneOk;

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setSendError('');
    if (!nameOk || !phoneOk || sending) return;
    setSending(true);
    try {
      await submitLead({
        name: name.trim(),
        phone: normalizePhone(phone),
        source: opened.source,
        calc: opened.calc,
      });
      setDone(true);
    } catch {
      setSendError('Не получилось отправить. Попробуйте ещё раз или позвоните нам.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-end justify-center bg-foreground/60 p-0 backdrop-blur-[2px] sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        className="w-full max-w-md rounded-t-3xl bg-card p-6 shadow-[0_20px_25px_rgba(0,0,0,0.25)] sm:rounded-3xl sm:p-8"
      >
        {done ? (
          <div className="py-2 text-center">
            <span
              aria-hidden="true"
              className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-accent text-on-accent"
            >
              <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                <path
                  d="m5 12.5 4.5 4.5L19 7.5"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <h2
              id="lead-modal-title"
              className="mt-4 font-display text-2xl font-extrabold tracking-tight"
            >
              Заявка принята!
            </h2>
            <p className="mt-2 text-muted-foreground" aria-live="polite">
              {name.trim() ? `${name.trim()}, спасибо! ` : 'Спасибо! '}Перезвоним в течение 15
              минут в рабочее время (9:00–21:00).
            </p>
            {opened.calc && (
              <p className="mx-auto mt-3 max-w-xs rounded-xl bg-muted px-4 py-2 text-sm">
                Ваш расчёт: {opened.calc.area} м² · {opened.calc.rooms} ·{' '}
                {opened.calc.repairType} — сохранили, сметчик приедет с цифрами.
              </p>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-6 flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-foreground px-7 py-3 font-display text-base font-extrabold text-white transition-colors duration-200 hover:bg-primary"
            >
              Хорошо, жду звонка
            </button>
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2
                  id="lead-modal-title"
                  className="font-display text-2xl font-extrabold tracking-tight"
                >
                  {title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  Замер — 60 минут, смета — за 24 часа. Бесплатно, без предоплаты.
                </p>
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Закрыть окно заявки"
                className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl border border-border text-xl leading-none transition-colors hover:border-primary/60"
              >
                ×
              </button>
            </div>

            {opened.calc && (
              <p className="mt-4 rounded-xl bg-muted px-4 py-2 text-sm">
                Ваш расчёт: {opened.calc.area} м² · {opened.calc.rooms} ·{' '}
                {opened.calc.repairType} ·{' '}
                {new Intl.NumberFormat('ru-RU').format(Math.round(opened.calc.priceMin))} –{' '}
                {new Intl.NumberFormat('ru-RU').format(Math.round(opened.calc.priceMax))} ₽
              </p>
            )}

            <form onSubmit={onSubmit} noValidate className="mt-5 space-y-4">
              <div>
                <label
                  htmlFor={nameId}
                  className="font-display text-sm font-extrabold"
                >
                  Как вас зовут
                </label>
                <input
                  id={nameId}
                  name="name"
                  type="text"
                  autoComplete="name"
                  placeholder="Иван"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  aria-invalid={showNameErr}
                  aria-describedby={showNameErr ? nameErrId : undefined}
                  className={`mt-1.5 flex min-h-12 w-full items-center rounded-xl border-2 bg-card px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent ${
                    showNameErr ? 'border-destructive' : 'border-border'
                  }`}
                />
                {showNameErr && (
                  <p id={nameErrId} role="alert" className="mt-1.5 text-sm font-semibold text-destructive">
                    Подскажите имя — минимум 2 буквы
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor={phoneId}
                  className="font-display text-sm font-extrabold"
                >
                  Телефон
                </label>
                <input
                  id={phoneId}
                  name="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={phone}
                  onChange={(e) => setPhone(formatPhoneMask(e.target.value))}
                  aria-invalid={showPhoneErr}
                  aria-describedby={showPhoneErr ? phoneErrId : undefined}
                  className={`mt-1.5 flex min-h-12 w-full items-center rounded-xl border-2 bg-card px-4 py-3 text-base outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-accent ${
                    showPhoneErr ? 'border-destructive' : 'border-border'
                  }`}
                />
                {showPhoneErr && (
                  <p id={phoneErrId} role="alert" className="mt-1.5 text-sm font-semibold text-destructive">
                    Введите телефон полностью — 11 цифр, например +7 495 120-45-67
                  </p>
                )}
              </div>

              {sendError && (
                <p role="alert" className="text-sm font-semibold text-destructive">
                  {sendError}
                </p>
              )}

              <button
                type="submit"
                disabled={sending}
                className="flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-accent px-7 py-3 font-display text-base font-extrabold text-on-accent transition-all duration-200 hover:-translate-y-px hover:bg-accent-dark disabled:cursor-wait disabled:opacity-60"
              >
                {sending ? 'Отправляем…' : 'Получить смету бесплатно'}
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Нажимая кнопку, вы соглашаетесь на обработку персональных данных.
                Никакого спама — только звонок по смете.
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
