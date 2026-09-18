import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import LeadForm from './LeadForm';

interface OpenArgs {
  source: string;
  title?: string;
  details?: string;
}

type OpenFn = (args: OpenArgs) => void;

const LeadModalContext = createContext<OpenFn>(() => {});

export const useLeadModal = () => useContext(LeadModalContext);

const TITLES: Record<string, string> = {
  header: 'Заказать звонок',
  hero: 'Бесплатный замер',
  calculator: 'Точная смета после замера',
  benefits: 'Зафиксировать цену',
  zamer: 'Бесплатный замер',
};

/**
 * Провайдер модалки заявки. Вешается в App один раз;
 * любой CTA открывает окно через useLeadModal().open({ source }).
 */
export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [req, setReq] = useState<OpenArgs | null>(null);
  // Счётчик открытий: сбрасывает форму (включая экран успеха) при каждом
  // новом вызове, даже с тем же source.
  const [nonce, setNonce] = useState(0);

  const open = useCallback((args: OpenArgs) => {
    setReq(args);
    setNonce((n) => n + 1);
  }, []);
  const close = useCallback(() => setReq(null), []);

  // Escape + блокировка скролла фона, пока модалка открыта.
  useEffect(() => {
    if (!req) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [req, close]);

  // Ключ сброса формы при каждом открытии (новая заявка — чистая форма).

  return (
    <LeadModalContext.Provider value={open}>
      {children}
      <AnimatePresence>
        {req && (
          <ModalShell
            title={req.title ?? TITLES[req.source] ?? 'Оставить заявку'}
            onClose={close}
          >
            <LeadForm
              key={nonce}
              source={req.source}
              details={req.details}
              idPrefix="modal"
            />
          </ModalShell>
        )}
      </AnimatePresence>
    </LeadModalContext.Provider>
  );
}

function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);

  // Фокус в модалку при открытии (a11y). Только для точных указателей —
  // на тачскринах не дёргаем клавиатуру без нужды.
  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return;
    const input = panelRef.current?.querySelector('input');
    (input as HTMLInputElement | undefined)?.focus();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 p-0 backdrop-blur-[4px] sm:items-center sm:p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="lead-modal-title"
        initial={{ opacity: 0, y: 56, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 32, scale: 0.98 }}
        transition={{ type: 'spring', stiffness: 380, damping: 34 }}
        className="mb-[env(safe-area-inset-bottom)] max-h-[90dvh] w-full max-w-[500px] overflow-y-auto overscroll-contain rounded-t-2xl bg-background p-6 shadow-[0_20px_25px_rgba(0,0,0,0.15)] sm:mb-0 sm:rounded-2xl sm:p-8"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 id="lead-modal-title" className="font-display text-2xl font-extrabold tracking-tight">
              {title}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Замер — 60 минут, смета — за 24 часа. Бесплатно.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Закрыть окно заявки"
            className="flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl border border-border bg-card text-xl leading-none text-muted-foreground transition-colors duration-200 hover:text-foreground"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
              <path
                d="M6 6l12 12M18 6 6 18"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}
