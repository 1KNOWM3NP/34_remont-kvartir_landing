const pains = [
  {
    title: 'Смета выросла в полтора раза',
    text: '«Начали с 800 тысяч, закончили на 1,2 млн». Доплаты за «внезапные» работы всплывают каждую неделю.',
  },
  {
    title: 'Сроки сорвали на три месяца',
    text: 'Бригада параллельно ведёт пять объектов и появляется у вас два раза в неделю. Въезд откладывается.',
  },
  {
    title: 'Рабочие пропали с предоплатой',
    text: 'Взяли 50% вперёд «на материалы» — и растворились. Договор либо липовый, либо его вообще не было.',
  },
  {
    title: 'Пыль, мусор и война с соседями',
    text: 'Грязь в подъезде, перфоратор в 7 утра в субботу, испорченный лифт. Разбираться — вам.',
  },
];

function Cross() {
  return (
    <span
      aria-hidden="true"
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
        <path
          d="M6 6l12 12M18 6 6 18"
          stroke="currentColor"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/**
 * Блок боли: озвучивает страхи до оффера. Вывод — в преимущества (#benefits).
 */
export default function Pain() {
  return (
    <section aria-labelledby="pain-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 pt-2 pb-14 sm:px-6 lg:pb-20">
        <div className="rounded-3xl border border-border bg-card p-6 sm:p-10">
          <p className="font-display text-sm font-bold tracking-wide text-destructive uppercase">
            Знакомо?
          </p>
          <h2
            id="pain-heading"
            className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
          >
            Вот почему люди боятся начинать ремонт
          </h2>

          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {pains.map((p) => (
              <li key={p.title} className="flex gap-4 rounded-2xl bg-muted p-5">
                <Cross />
                <div>
                  <h3 className="font-display text-base font-extrabold">{p.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <p className="mt-8 border-l-4 border-accent pl-4 text-lg leading-relaxed">
            Мы построили процесс так, чтобы каждая из этих ситуаций была{' '}
            <strong className="font-display">исключена договором</strong>, а не обещаниями.{' '}
            <a
              href="#benefits"
              className="font-display font-extrabold text-accent-dark underline decoration-accent decoration-2 underline-offset-4"
            >
              Смотрите, как именно
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
