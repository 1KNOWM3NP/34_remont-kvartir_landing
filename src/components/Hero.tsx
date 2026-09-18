import { useLeadModal } from './LeadModal';

const stats = [
  {
    value: '340+',
    label: 'сданных квартир',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
        <path
          d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    value: '12 лет',
    label: 'делаем ремонт под ключ',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
        <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 7.5V12l3 2"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    value: '3 года',
    label: 'гарантии по договору',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-6 w-6">
        <path
          d="M12 3 5 5.8v5.4c0 4.3 2.9 7.4 7 9.3 4.1-1.9 7-5 7-9.3V5.8L12 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <path
          d="m9 11.5 2.2 2.2L15.5 9.5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
];

export default function Hero() {
  const openLead = useLeadModal();
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="overflow-x-clip"
    >
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 pt-10 pb-14 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 lg:pt-16 lg:pb-20">
        {/* Левая колонка: оффер */}
        <div>
          <p className="inline-flex min-h-9 items-center rounded-full border border-border bg-card px-4 py-1 font-display text-sm font-bold text-muted-foreground">
            12 лет делаем ремонт под ключ · гарантия 3 года
          </p>

          <h1
            id="hero-heading"
            className="mt-5 font-display text-4xl leading-[1.08] font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            Ремонт квартиры под ключ{' '}
            <span className="relative whitespace-nowrap text-accent-dark">
              за&nbsp;45&nbsp;дней
              <svg
                viewBox="0 0 220 12"
                aria-hidden="true"
                className="absolute -bottom-1 left-0 h-3 w-full text-accent"
                preserveAspectRatio="none"
              >
                <path
                  d="M3 9C60 3 150 3 217 8"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Фиксированная смета до старта работ, фотоотчёт каждую неделю
            и&nbsp;уборка после сдачи. Косметический — от&nbsp;6&nbsp;000&nbsp;₽/м²,
            капитальный — от&nbsp;12&nbsp;000&nbsp;₽/м².
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href="#calculator"
              className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-accent px-7 py-3 font-display text-base font-extrabold text-on-accent shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-px hover:bg-accent-dark"
            >
              Рассчитать стоимость
            </a>
            <button
              type="button"
              onClick={() => openLead({ source: 'hero' })}
              className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 border-foreground/25 bg-card px-7 py-3 font-display text-base font-extrabold text-foreground transition duration-200 hover:border-foreground/60"
            >
              Бесплатный замер
            </button>
          </div>

          <p className="mt-4 text-sm text-muted-foreground">
            Замер — 60 минут, смета — за 24 часа. Без предоплаты за работы.
          </p>

          <dl className="mt-8 grid grid-cols-1 gap-3 min-[420px]:grid-cols-3">
            {stats.map((s) => (
              <div
                key={s.label}
                className="flex min-h-11 items-center gap-3 rounded-xl border border-border bg-card px-4 py-3"
              >
                <span className="shrink-0 text-accent-dark">{s.icon}</span>
                <div>
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="font-display text-lg leading-none font-extrabold tabular-nums">
                    {s.value}
                  </dd>
                  <dd className="mt-1 text-xs leading-tight text-muted-foreground">
                    {s.label}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </div>

        {/* Правая колонка: визуальная карточка */}
        <div className="relative" aria-label="Пример сданного ремонта">
          <div
            aria-hidden="true"
            className="relative min-h-80 overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-amber-100 via-orange-50 to-stone-300 shadow-[0_20px_25px_rgba(0,0,0,0.15)] sm:min-h-96"
            style={{
              backgroundImage:
                'radial-gradient(rgba(120,113,108,0.18) 1.5px, transparent 1.5px)',
              backgroundSize: '22px 22px',
            }}
          >
            <div
              aria-hidden="true"
              className="absolute inset-x-8 top-10 rounded-2xl bg-card/90 p-5 shadow-[0_10px_15px_rgba(0,0,0,0.1)] backdrop-blur"
            >
              <p className="font-display text-sm font-bold text-muted-foreground">
                Двухкомнатная · 68&nbsp;м² · капитальный
              </p>
              <p className="mt-1 font-display text-2xl font-extrabold">
                Сдана за 42 дня
              </p>
              <div
                aria-hidden="true"
                className="mt-3 h-2.5 overflow-hidden rounded-full bg-muted"
              >
                <div className="h-full w-full rounded-full bg-accent" />
              </div>
              <div className="mt-2 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 text-sm font-semibold">
                <span className="text-muted-foreground">Смета</span>
                <span>1&nbsp;240&nbsp;000&nbsp;₽ = итоговая цена</span>
              </div>
            </div>

            <div
              aria-hidden="true"
              className="absolute inset-x-8 bottom-10 flex items-center gap-3 rounded-2xl bg-foreground p-4 text-white shadow-[0_10px_15px_rgba(0,0,0,0.1)]"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                className="h-9 w-9 shrink-0 text-accent"
              >
                <path
                  d="M12 3 5 5.8v5.4c0 4.3 2.9 7.4 7 9.3 4.1-1.9 7-5 7-9.3V5.8L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="m9 11.5 2.2 2.2L15.5 9.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <p className="text-sm leading-snug">
                <strong className="font-display">Гарантия 3 года</strong>
                <br />
                <span className="text-white/80">
                  прописана в договоре, а не на словах
                </span>
              </p>
            </div>
          </div>

          <p className="absolute -top-4 right-4 rotate-2 rounded-xl bg-accent px-4 py-2 font-display text-sm font-extrabold text-on-accent shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
            −10% при заказе до конца месяца
          </p>
        </div>
      </div>
    </section>
  );
}
