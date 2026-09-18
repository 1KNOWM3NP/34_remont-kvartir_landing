import LeadForm from './LeadForm';

const points = [
  'Приедем в удобное время — замер занимает 60 минут',
  'Смета с фиксированной ценой — за 24 часа',
  'Без предоплаты за работы и навязанных опций',
];

/**
 * Секция «Бесплатный замер»: инлайн-форма заявки (та же LeadForm,
 * что и в модалке) + телефон. Якорь #zamer сохранён.
 */
export default function Zamer() {
  return (
    <section id="zamer" aria-labelledby="zamer-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl px-4 pt-2 pb-16 sm:px-6">
        <div className="grid gap-6 overflow-hidden rounded-3xl bg-foreground p-6 text-white shadow-[0_20px_25px_rgba(0,0,0,0.15)] sm:p-10 lg:grid-cols-2 lg:gap-10">
          <div>
            <p className="font-display text-sm font-bold tracking-wide text-accent uppercase">
              Бесплатный замер
            </p>
            <h2
              id="zamer-heading"
              className="mt-2 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl"
            >
              Узнайте точную цену за 60 минут
            </h2>
            <ul className="mt-6 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden="true"
                    className="mt-0.5 h-6 w-6 shrink-0 text-accent"
                  >
                    <path
                      d="m5 12.5 4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span className="leading-relaxed text-white/90">{p}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-white/80">
              Или позвоните сами:{' '}
              <a
                href="tel:+74951204567"
                className="font-display font-extrabold whitespace-nowrap text-white underline decoration-accent decoration-2 underline-offset-4"
              >
                +7 495 120-45-67
              </a>
            </p>
          </div>

          <div className="rounded-2xl bg-background p-6 text-foreground sm:p-8">
            <LeadForm source="zamer" idPrefix="zamer" />
          </div>
        </div>
      </div>
    </section>
  );
}
