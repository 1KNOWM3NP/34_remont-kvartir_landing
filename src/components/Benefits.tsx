import { useLeadModal } from './LeadModal';

const items = [
  {
    title: 'Фиксированная смета в договоре',
    text: 'Цена из сметы — финальная. Подорожало что-то у поставщиков? Это наша проблема, доплат с вас — 0 ₽.',
    icon: (
      <path
        d="M6 3h9l4 4v14H6V3Z M14 3v5h5 M9 13h7 M9 17h7"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Фотоотчёт каждую неделю',
    text: 'По пятницам — 20+ фото и короткое видео объекта в мессенджер. Контролируете ремонт, не приезжая.',
    icon: (
      <path
        d="M4 8h3l2-2.5h6L17 8h3v11H4V8Z M12 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Оплата по этапам, без предоплаты',
    text: 'Платите только за принятый этап: демонтаж → черновые → чистовые. Материалы — по чекам.',
    icon: (
      <path
        d="M3 7h18v10H3z M3 10h18 M7 15h4"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
  },
  {
    title: 'Своя бригада, без субподряда',
    text: '12 штатных мастеров, каждый объект ведёт прораб. Никто «левый» в вашей квартире не появится.',
    icon: (
      <path
        d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M2.5 20c.8-3.2 3-5 5.5-5s4.7 1.8 5.5 5 M16 8.5a2.5 2.5 0 1 0 0-5 M17.5 15c2 .6 3.2 2.2 3.9 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    ),
  },
  {
    title: 'Уборка после сдачи',
    text: 'Клининг и вывоз мусора включены в смету. Вечером приёмки заезжаете в чистую квартиру.',
    icon: (
      <path
        d="m4 20 1-4L16.5 4.5a2.1 2.1 0 0 1 3 3L8 19l-4 1Z M14.5 6.5l3 3"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
  {
    title: 'Гарантия 3 года по договору',
    text: 'Отошли обои, потекла труба, треснула плитка — приезжаем и чиним бесплатно. Пункт 7.2 договора.',
    icon: (
      <path
        d="M12 3 5 5.8v5.4c0 4.3 2.9 7.4 7 9.3 4.1-1.9 7-5 7-9.3V5.8L12 3Z M9 11.5l2.2 2.2 4.3-4.2"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    ),
  },
];

/**
 * Преимущества: ответ на боли (#pain) в виде bento-сетки.
 * Оффер секции — «все страхи закрыты договором», CTA — замер.
 */
export default function Benefits() {
  const openLead = useLeadModal();
  return (
    <section id="benefits" aria-labelledby="benefits-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="font-display text-sm font-bold tracking-wide text-accent-dark uppercase">
          Почему мы
        </p>
        <h2
          id="benefits-heading"
          className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
        >
          Ремонт, где всё зафиксировано — а не обещано
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Каждый пункт ниже — строчка в договоре, а не рекламный слоган.
        </p>

        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((b) => (
            <li
              key={b.title}
              className="rounded-2xl border border-border bg-card p-6 shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_rgba(0,0,0,0.1)]"
            >
              <span
                aria-hidden="true"
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-100 text-accent-dark"
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                  {b.icon}
                </svg>
              </span>
              <h3 className="mt-4 font-display text-lg font-extrabold">{b.title}</h3>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">{b.text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
          <button
            type="button"
            onClick={() => openLead({ source: 'benefits' })}
            className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-accent px-7 py-3 font-display text-base font-extrabold text-on-accent shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-px hover:bg-accent-dark"
          >
            Зафиксировать цену ремонта
          </button>
          <p className="text-sm text-muted-foreground">
            Ответим за 15 минут, приедем в удобное время — замер займёт 60 минут.
          </p>
        </div>
      </div>
    </section>
  );
}
