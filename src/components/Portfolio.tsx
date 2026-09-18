import { useState } from 'react';
import { useLeadModal } from './LeadModal';
import Reveal from './Reveal';

interface Project {
  id: string;
  name: string;
  meta: string;
  price: string;
  /** Фото «до» / «после» из public/photos. */
  before: string;
  after: string;
}

const projects: Project[] = [
  {
    id: 'p1',
    name: 'Двухкомнатная на Ленинском',
    meta: '68 м² · капитальный · 42 дня',
    price: '1 240 000 ₽',
    before: '/photos/p1-before.jpg',
    after: '/photos/p1-after.jpg',
  },
  {
    id: 'p2',
    name: 'Однушка у парка',
    meta: '38 м² · косметический · 19 дней',
    price: '410 000 ₽',
    before: '/photos/p2-before.jpg',
    after: '/photos/p2-after.jpg',
  },
  {
    id: 'p3',
    name: 'Трёшка для семьи с детьми',
    meta: '82 м² · евро · 58 дней',
    price: '2 150 000 ₽',
    before: '/photos/p3-before.jpg',
    after: '/photos/p3-after.jpg',
  },
];

/**
 * Портфолио: карточки «до/после» на реальных фото. Первая — интерактивный
 * слайдер (потяните ползунок), остальные — статичное сравнение половин.
 */
export default function Portfolio() {
  const openLead = useLeadModal();
  const [pos, setPos] = useState(50);
  const [featured, ...rest] = projects;

  return (
    <section id="portfolio" aria-labelledby="portfolio-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] px-4 py-14 sm:px-6 lg:py-20">
        <Reveal>
        <p className="font-display text-sm font-bold tracking-wide text-accent-dark uppercase">
          Наши работы
        </p>
        <h2
          id="portfolio-heading"
          className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl 2xl:max-w-3xl 2xl:text-5xl"
        >
          Потяните ползунок: так меняется квартира
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Реальные объекты с метражом, сроком и итоговой ценой из договора.
        </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-8">
        {/* Интерактивное «до/после» */}
        <figure className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_4px_6px_rgba(0,0,0,0.1)]">
          <div
            className="relative min-h-72 sm:min-h-96"
            role="img"
            aria-label={`Сравнение до и после: ${featured.name}, ${featured.meta}`}
          >
            <img
              src={featured.before}
              alt=""
              width={1536}
              height={1024}
              loading="lazy"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <img
              src={featured.after}
              alt=""
              width={1536}
              height={1024}
              loading="lazy"
              aria-hidden="true"
              className="absolute inset-0 h-full w-full object-cover"
              style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
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
              className="flex min-h-12 cursor-pointer items-center justify-center rounded-xl bg-accent px-7 py-3 font-display text-base font-extrabold whitespace-nowrap text-on-accent shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-px hover:bg-accent-dark"
            >
              Получить такой ремонт
            </button>
          </figcaption>
        </figure>
        </Reveal>

        {/* Остальные объекты */}
        <ul className="mt-4 grid gap-4 md:grid-cols-2">
          {rest.map((p) => (
            <li
              key={p.id}
              className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_4px_6px_rgba(0,0,0,0.1)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_15px_rgba(0,0,0,0.1)]"
            >
              <div className="grid grid-cols-2" aria-hidden="true">
                <div className="relative min-h-40">
                  <img
                    src={p.before}
                    alt=""
                    width={1536}
                    height={1024}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <span className="absolute top-3 left-3 rounded-lg bg-black/60 px-2.5 py-0.5 font-display text-xs font-extrabold text-white">
                    До
                  </span>
                </div>
                <div className="relative min-h-40">
                  <img
                    src={p.after}
                    alt=""
                    width={1536}
                    height={1024}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover"
                  />
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
