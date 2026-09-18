import { useState } from 'react';
import { useLeadModal } from './LeadModal';

interface Project {
  id: string;
  name: string;
  meta: string;
  price: string;
  /** Пары фонов «до» (холодный серый) / «после» (тёплый жилой). */
  before: string;
  after: string;
}

const projects: Project[] = [
  {
    id: 'p1',
    name: 'Двухкомнатная на Ленинском',
    meta: '68 м² · капитальный · 42 дня',
    price: '1 240 000 ₽',
    before: 'linear-gradient(135deg, #78716c 0%, #57534e 45%, #44403c 100%)',
    after: 'linear-gradient(135deg, #fde68a 0%, #fdba74 40%, #d97706 100%)',
  },
  {
    id: 'p2',
    name: 'Однушка у парка',
    meta: '38 м² · косметический · 19 дней',
    price: '410 000 ₽',
    before: 'linear-gradient(135deg, #64748b 0%, #475569 50%, #334155 100%)',
    after: 'linear-gradient(135deg, #fef3c7 0%, #fed7aa 45%, #fb923c 100%)',
  },
  {
    id: 'p3',
    name: 'Трёшка для семьи с детьми',
    meta: '82 м² · евро · 58 дней',
    price: '2 150 000 ₽',
    before: 'linear-gradient(135deg, #737373 0%, #525252 50%, #404040 100%)',
    after: 'linear-gradient(135deg, #ffedd5 0%, #fdba74 40%, #b45309 100%)',
  },
];

/**
 * Портфолио: карточки «до/после». Первая — интерактивный слайдер
 * (потяните ползунок), остальные — статичное сравнение половин.
 * Фото-заглушки — CSS-градиенты; при появлении реальных фото
 * заменить div'ы на <img>.
 */
export default function Portfolio() {
  const openLead = useLeadModal();
  const [pos, setPos] = useState(50);
  const [featured, ...rest] = projects;

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="font-display text-sm font-bold tracking-wide text-accent-dark uppercase">
          Наши работы
        </p>
        <h2
          id="portfolio-heading"
          className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
        >
          Потяните ползунок: так меняется квартира
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Реальные объекты с метражом, сроком и итоговой ценой из договора.
        </p>

        {/* Интерактивное «до/после» */}
        <figure className="mt-8 overflow-hidden rounded-3xl border border-border bg-card shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
          <div
            className="relative min-h-72 sm:min-h-96"
            role="img"
            aria-label={`Сравнение до и после: ${featured.name}, ${featured.meta}`}
          >
            <div aria-hidden="true" className="absolute inset-0" style={{ background: featured.before }} />
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ background: featured.after, clipPath: `inset(0 ${100 - pos}% 0 0)` }}
            />
            <span
              aria-hidden="true"
              className="absolute top-4 left-4 rounded-lg bg-black/60 px-3 py-1 font-display text-xs font-extrabold text-white"
            >
              До
            </span>
            <span
              aria-hidden="true"
              className="absolute top-4 right-4 rounded-lg bg-accent px-3 py-1 font-display text-xs font-extrabold text-on-accent"
            >
              После
            </span>
            <span
              aria-hidden="true"
              className="absolute inset-y-0 w-1 bg-white shadow-[0_0_12px_rgba(0,0,0,0.4)]"
              style={{ left: `calc(${pos}% - 2px)` }}
            />
          </div>
          <figcaption className="flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-display text-lg font-extrabold">{featured.name}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">
                {featured.meta} · итог {featured.price}
              </p>
              <label htmlFor="before-after" className="sr-only">
                Ползунок сравнения до и после
              </label>
              <input
                id="before-after"
                type="range"
                min={0}
                max={100}
                value={pos}
                onChange={(e) => setPos(Number(e.target.value))}
                className="mt-3 h-2 w-full min-h-11 cursor-pointer appearance-none rounded-full bg-muted accent-[#D97706] sm:max-w-xs"
              />
            </div>
            <button
              type="button"
              onClick={() =>
                openLead({
                  source: 'portfolio',
                  title: 'Получить такой ремонт',
                  details: `${featured.name}: ${featured.meta}, итог ${featured.price}`,
                })
              }
              className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-accent px-7 py-3 font-display text-base font-extrabold whitespace-nowrap text-on-accent shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-px hover:bg-accent-dark"
            >
              Получить такой ремонт
            </button>
          </figcaption>
        </figure>

        {/* Остальные объекты */}
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {rest.map((p) => (
            <li
              key={p.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_rgba(0,0,0,0.1)]"
            >
              <div className="grid grid-cols-2" aria-hidden="true">
                <div className="relative min-h-40" style={{ background: p.before }}>
                  <span className="absolute top-3 left-3 rounded-lg bg-black/60 px-2.5 py-0.5 font-display text-xs font-extrabold text-white">
                    До
                  </span>
                </div>
                <div className="relative min-h-40" style={{ background: p.after }}>
                  <span className="absolute top-3 right-3 rounded-lg bg-accent px-2.5 py-0.5 font-display text-xs font-extrabold text-on-accent">
                    После
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-display text-base font-extrabold">{p.name}</h3>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {p.meta} · итог {p.price}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
