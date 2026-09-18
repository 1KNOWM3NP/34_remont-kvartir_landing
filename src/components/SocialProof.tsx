const reviews = [
  {
    name: 'Анна и Дмитрий',
    meta: '2-комн. · 64 м² · капитальный · 41 день',
    text: 'Смета 1 180 000 ₽ не изменилась ни на рубль. Каждую пятницу прилетал фотоотчёт — мы вообще не приезжали на объект.',
  },
  {
    name: 'Сергей',
    meta: '1-комн. · 38 м² · косметический · 19 дней',
    text: 'Боялся, что затянут. Сдали на два дня раньше срока из договора. После себя всё вымыли, заехал в тот же вечер.',
  },
  {
    name: 'Ольга',
    meta: '3-комн. · 82 м² · евро · 58 дней',
    text: 'Дизайн-проект совпал с результатом один в один. Розетки, свет, стыки — всё ровно. Гарантийный талон отдали вместе с ключами.',
  },
];

function Stars() {
  return (
    <span className="flex gap-0.5 text-accent" role="img" aria-label="Оценка 5 из 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="h-4 w-4">
          <path d="M12 2.5 14.9 8.6l6.6.7-4.9 4.5 1.4 6.5L12 17l-6 3.3 1.4-6.5L2.5 9.3l6.6-.7L12 2.5Z" />
        </svg>
      ))}
    </span>
  );
}

/**
 * Соцдоказательство: рейтинг + отзывы. Сразу после Hero —
 * гасит сомнения до того, как человек скроллит к калькулятору.
 */
export default function SocialProof() {
  return (
    <section aria-labelledby="proof-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-display text-sm font-bold tracking-wide text-accent-dark uppercase">
              Нам доверяют
            </p>
            <h2
              id="proof-heading"
              className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
            >
              340+ квартир сданы в срок за 12 лет
            </h2>
          </div>
          <p className="flex min-h-11 items-center gap-3 rounded-xl border border-border bg-card px-4 py-2">
            <span className="font-display text-2xl font-extrabold">4,9</span>
            <span>
              <Stars />
              <span className="mt-0.5 block text-xs text-muted-foreground">
                127 отзывов на Яндекс Картах и 2ГИС
              </span>
            </span>
          </p>
        </div>

        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {reviews.map((r) => (
            <li
              key={r.name}
              className="flex flex-col rounded-2xl border border-border bg-card p-6 shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_rgba(0,0,0,0.1)]"
            >
              <Stars />
              <p className="mt-3 flex-1 leading-relaxed">«{r.text}»</p>
              <p className="mt-4 font-display text-sm font-extrabold">{r.name}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{r.meta}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
