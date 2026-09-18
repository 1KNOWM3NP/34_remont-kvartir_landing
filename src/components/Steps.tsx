import { useLeadModal } from './LeadModal';

const steps = [
  {
    n: '01',
    title: 'Заявка и замер',
    text: 'Звонок или заявка — приедем в удобное время. 60 минут: лазерный замер, вопросы, пожелания.',
  },
  {
    n: '02',
    title: 'Смета и договор',
    text: 'За 24 часа — смета с фиксированной ценой. Подписываем договор: цена, сроки, гарантия 3 года.',
  },
  {
    n: '03',
    title: 'Ремонт с фотоотчётами',
    text: 'Работаем, каждую пятницу шлём 20+ фото. Оплата — только за принятые этапы, материалы по чекам.',
  },
  {
    n: '04',
    title: 'Приёмка и гарантия',
    text: 'Убираемся, сдаём, отдаёте остаток. Получаете гарантийный талон на 3 года — и ключи от новой квартиры.',
  },
];

/**
 * Как работаем: 4 шага от заявки до ключей. Оффер секции —
 * «понятный процесс без сюрпризов», CTA — начать с шага 1.
 */
export default function Steps() {
  const openLead = useLeadModal();
  return (
    <section aria-labelledby="steps-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="font-display text-sm font-bold tracking-wide text-accent-dark uppercase">
          Как работаем
        </p>
        <h2
          id="steps-heading"
          className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
        >
          От заявки до ключей — 4 шага
        </h2>

        <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <li
              key={s.n}
              className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_rgba(0,0,0,0.1)]"
            >
              <span
                aria-hidden="true"
                className="font-display text-5xl font-extrabold tracking-tight text-accent/25"
              >
                {s.n}
              </span>
              <h3 className="mt-3 font-display text-lg font-extrabold">{s.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => openLead({ source: 'steps', title: 'Начать с шага 1 — заявка' })}
            className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-foreground px-7 py-3 font-display text-base font-extrabold text-white transition-all duration-200 hover:-translate-y-px hover:bg-primary"
          >
            Начать с шага 1 — это бесплатно
          </button>
          <p className="text-sm text-muted-foreground">
            Сегодня замер — завтра уже смета с фиксированной ценой.
          </p>
        </div>
      </div>
    </section>
  );
}
