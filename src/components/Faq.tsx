import { useLeadModal } from './LeadModal';

const faqs = [
  {
    q: 'Цена в смете точно не вырастет?',
    a: 'Не вырастет. Смета фиксируется в договоре, доплаты возможны только если вы сами решите что-то добавить или изменить. Рост цен у поставщиков — наш риск, в договоре это пункт 4.3.',
  },
  {
    q: 'Сколько длится ремонт?',
    a: 'Косметический в однушке — от 19 дней, капитальный в двушке — около 42 дней, евро в трёшке — до 60 дней. Точный срок пишем в договор, за каждый день просрочки — неустойка 0,1% от суммы.',
  },
  {
    q: 'Кто закупает материалы?',
    a: 'Мы — по оптовым ценам, все чеки прикладываем к отчёту. Черновые материалы (смеси, кабели, трубы) берем только проверенных марок. Чистовые можете выбрать сами или доверить нашему снабженцу.',
  },
  {
    q: 'Можно ли жить в квартире во время ремонта?',
    a: 'При косметическом — да, работаем по комнатам. При капитальном с заменой стяжки и электрики лучше съехать: шум, пыль и отключения. Подскажем, как организовать переезд с минимальными неудобствами.',
  },
  {
    q: 'Как проходит оплата?',
    a: 'Без предоплаты за работы. Платите поэтапно: приняли демонтаж — оплатили, приняли черновые — оплатили. Материалы — по факту закупки, чеки прилагаются.',
  },
  {
    q: 'Что покрывает гарантия 3 года?',
    a: 'Всё, что сделали мы: сантехника, электрика, плитка, обои, полы, сантехприборы. Что-то отошло или потекло — приезжаем и чиним бесплатно. Гарантийный талон выдаём вместе с ключами.',
  },
];

/**
 * FAQ: снимает последние возражения перед финальным CTA.
 * Нативный <details> — доступно с клавиатуры без JS-стейта.
 */
export default function Faq() {
  const openLead = useLeadModal();
  return (
    <section aria-labelledby="faq-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] px-4 pt-2 pb-14 sm:px-6 lg:pb-20">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="font-display text-sm font-bold tracking-wide text-accent-dark uppercase">
              Вопросы и ответы
            </p>
            <h2
              id="faq-heading"
              className="mt-2 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl 2xl:text-5xl"
            >
              Остались сомнения? Разбираем честно
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Не нашли свой вопрос — задайте по телефону, ответим за 15 минут.
            </p>
            <button
              type="button"
              onClick={() => openLead({ source: 'faq', title: 'Задать свой вопрос' })}
              className="mt-6 flex min-h-12 cursor-pointer items-center justify-center rounded-xl border-2 border-foreground/25 bg-card px-7 py-3 font-display text-base font-extrabold text-foreground transition duration-200 hover:border-foreground/60 sm:inline-flex"
            >
              Задать свой вопрос
            </button>
          </div>

          <div className="space-y-3">
            {faqs.map((f) => (
              <details
                key={f.q}
                className="group rounded-2xl border border-border bg-card px-5 py-1 shadow-[0_4px_6px_rgba(0,0,0,0.1)]"
              >
                <summary className="flex min-h-12 cursor-pointer list-none items-center justify-between gap-4 py-3 font-display text-base font-extrabold transition hover:text-accent-dark [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span
                    aria-hidden="true"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-muted font-bold text-accent-dark transition-transform duration-200 group-open:rotate-45"
                  >
                    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                      <path
                        d="M12 5v14M5 12h14"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </summary>
                <p className="pb-5 leading-relaxed text-muted-foreground">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
