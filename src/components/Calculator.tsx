import { useMemo, useState } from 'react';
import { useLeadModal } from './LeadModal';

type RepairType = 'cosmetic' | 'capital' | 'euro';

const RATES: Record<RepairType, { label: string; short: string; rate: number; hint: string }> = {
  cosmetic: {
    label: 'Косметический',
    short: 'косметический',
    rate: 6000,
    hint: 'Обои, покраска, ламинат, сантехника без замены труб',
  },
  capital: {
    label: 'Капитальный',
    short: 'капитальный',
    rate: 12000,
    hint: 'Стяжка, выравнивание, замена электрики и сантехники',
  },
  euro: {
    label: 'Евро',
    short: 'евро',
    rate: 18000,
    hint: 'Дизайнерские решения, премиальные материалы, умный дом',
  },
};

const ROOMS = ['Студия', '1', '2', '3', '4+'] as const;

const OPTIONS = [
  { id: 'plumbing', label: 'Сантехника', extra: 'замена труб и сантехники', pct: 8 },
  { id: 'electrics', label: 'Электрика', extra: 'проводка, щиток, розетки', pct: 10 },
  { id: 'design', label: 'Дизайн-проект', extra: '3D-визуализация квартиры', pct: 5 },
] as const;

type OptionId = (typeof OPTIONS)[number]['id'];

const fmt = new Intl.NumberFormat('ru-RU', { maximumFractionDigits: 0 });

function formatRoubles(n: number) {
  return `${fmt.format(Math.round(n))} ₽`;
}

export function calcRange(
  area: number,
  type: RepairType,
  opts: readonly OptionId[],
) {
  const base = area * RATES[type].rate;
  const mult =
    1 + opts.reduce((s, id) => s + (OPTIONS.find((o) => o.id === id)?.pct ?? 0) / 100, 0);
  const total = base * mult;
  return { min: total * 0.9, max: total * 1.1, perM2: RATES[type].rate * mult };
}

export default function Calculator() {
  const openLead = useLeadModal();
  const [area, setArea] = useState(68);
  const [type, setType] = useState<RepairType>('capital');
  const [rooms, setRooms] = useState<string>('2');
  const [opts, setOpts] = useState<OptionId[]>(['electrics']);

  const { min, max, perM2 } = useMemo(() => calcRange(area, type, opts), [area, type, opts]);

  const toggle = (id: OptionId) =>
    setOpts((prev) => (prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]));

  const summary = `${rooms === 'Студия' ? 'Студия' : rooms + '-комн.'} · ${area} м² · ${RATES[type].short}`;

  return (
    <section id="calculator" aria-labelledby="calc-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 lg:py-20">
        <p className="font-display text-sm font-bold tracking-wide text-accent-dark uppercase">
          Калькулятор
        </p>
        <h2
          id="calc-heading"
          className="mt-2 max-w-2xl font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
        >
          Сколько стоит ваш ремонт
        </h2>
        <p className="mt-3 max-w-2xl text-lg text-muted-foreground">
          Подвигайте слайдер и выберите параметры — цену увидите сразу. Это
          ориентир по тарифам, точную смету посчитаем после бесплатного замера.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Параметры */}
          <div className="rounded-2xl border border-border bg-card p-6 shadow-[0_4px_6px_rgba(0,0,0,0.1)] sm:p-8">
            {/* Площадь */}
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label
                  htmlFor="calc-area"
                  className="font-display text-base font-extrabold"
                >
                  Площадь квартиры
                </label>
                <output
                  htmlFor="calc-area"
                  className="rounded-lg bg-muted px-3 py-1 font-display text-lg font-extrabold whitespace-nowrap"
                  aria-live="polite"
                >
                  {area} м²
                </output>
              </div>
              <input
                id="calc-area"
                type="range"
                min={20}
                max={150}
                step={1}
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="mt-4 h-2 w-full min-h-11 cursor-pointer appearance-none rounded-full bg-muted accent-[#D97706]"
                aria-valuetext={`${area} квадратных метров`}
              />
              <div className="mt-1 flex justify-between text-xs text-muted-foreground" aria-hidden="true">
                <span>20 м²</span>
                <span>150 м²</span>
              </div>
            </div>

            {/* Тип ремонта */}
            <fieldset className="mt-7">
              <legend className="font-display text-base font-extrabold">
                Тип ремонта
              </legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-3">
                {(Object.keys(RATES) as RepairType[]).map((key) => {
                  const active = type === key;
                  return (
                    <button
                      key={key}
                      type="button"
                      onClick={() => setType(key)}
                      aria-pressed={active}
                      className={`min-h-11 cursor-pointer rounded-xl border-2 px-3 py-3 text-left transition duration-200 ${
                        active
                          ? 'border-accent bg-amber-50 shadow-[0_4px_6px_rgba(0,0,0,0.1)]'
                          : 'border-border bg-card hover:border-primary/60'
                      }`}
                    >
                      <span className="block font-display text-sm font-extrabold">
                        {RATES[key].label}
                      </span>
                      <span className="mt-0.5 block text-xs font-bold text-accent-dark">
                        от {formatRoubles(RATES[key].rate)}/м²
                      </span>
                      <span className="mt-1 block text-xs leading-snug text-muted-foreground">
                        {RATES[key].hint}
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Комнаты */}
            <fieldset className="mt-7">
              <legend className="font-display text-base font-extrabold">
                Комнат
              </legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {ROOMS.map((r) => {
                  const active = rooms === r;
                  return (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRooms(r)}
                      aria-pressed={active}
                      className={`flex min-h-11 min-w-11 cursor-pointer items-center justify-center rounded-xl border-2 px-4 py-2 font-display text-sm font-extrabold transition duration-200 ${
                        active
                          ? 'border-foreground bg-foreground text-white'
                          : 'border-border bg-card hover:border-primary/60'
                      }`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            {/* Опции */}
            <fieldset className="mt-7">
              <legend className="font-display text-base font-extrabold">
                Дополнительно
              </legend>
              <div className="mt-3 grid gap-2">
                {OPTIONS.map((o) => {
                  const checked = opts.includes(o.id);
                  return (
                    <button
                      key={o.id}
                      type="button"
                      role="checkbox"
                      aria-checked={checked}
                      onClick={() => toggle(o.id)}
                      className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-xl border-2 px-4 py-3 text-left transition duration-200 ${
                        checked
                          ? 'border-accent bg-amber-50'
                          : 'border-border bg-card hover:border-primary/60'
                      }`}
                    >
                      <span
                        aria-hidden="true"
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 ${
                          checked ? 'border-accent bg-accent text-on-accent' : 'border-primary/50 bg-card'
                        }`}
                      >
                        {checked && (
                          <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
                            <path
                              d="m5 12.5 4.5 4.5L19 7.5"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        )}
                      </span>
                      <span className="flex-1">
                        <span className="block font-display text-sm font-extrabold">
                          {o.label}{' '}
                          <span className="text-accent-dark">+{o.pct}%</span>
                        </span>
                        <span className="block text-xs text-muted-foreground">
                          {o.extra}
                        </span>
                      </span>
                    </button>
                  );
                })}
              </div>
            </fieldset>
          </div>

          {/* Результат */}
          <div className="flex flex-col rounded-2xl bg-foreground p-6 text-white shadow-[0_20px_25px_rgba(0,0,0,0.15)] sm:p-8 lg:sticky lg:top-24 lg:self-start">
            <p className="text-sm text-white/70">{summary}</p>
            <p
              className="mt-2 font-display text-3xl font-extrabold tracking-tight text-balance tabular-nums sm:text-4xl"
              aria-live="polite"
            >
              {formatRoubles(min)} – {formatRoubles(max)}
            </p>
            <p className="mt-2 text-sm text-white/70">
              ≈ {formatRoubles(perM2)}/м² · диапазон ±10%: итог зависит от
              материалов и состояния квартиры
            </p>

            <div className="mt-4 rounded-xl bg-white/10 p-4 text-sm leading-relaxed">
              <p>
                <strong>{RATES[type].label}</strong> · {area} м²
                {opts.length > 0 ? (
                  <>
                    {' '}· опции: {opts.map((id) => OPTIONS.find((o) => o.id === id)?.label.toLowerCase()).join(', ')}
                  </>
                ) : (
                  ' · без доп. опций'
                )}
                .
              </p>
            </div>

            <button
              type="button"
              onClick={() =>
                openLead({
                  source: 'calculator',
                  details: `${summary}: ${formatRoubles(min)} – ${formatRoubles(max)}`,
                })
              }
              className="mt-6 flex min-h-12 w-full cursor-pointer items-center justify-center rounded-xl bg-accent px-7 py-3 text-center font-display text-base font-extrabold text-on-accent transition duration-200 hover:-translate-y-px hover:bg-amber-500"
            >
              Получить точную смету
            </button>
            <p className="mt-3 text-center text-sm text-white/70">
              Замер — 60 минут, смета — за 24 часа. Бесплатно, без предоплаты
              за работы.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
