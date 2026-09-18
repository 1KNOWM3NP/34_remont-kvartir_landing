import { useLeadModal } from './LeadModal';
import Reveal from './Reveal';

/**
 * Ссылка на embed-видео о компании. Пока пусто — показываем
 * постер-заглушку (по TASK_BRIEF: «эмбед, постер-заглушка»).
 * Как появится ролик — подставить URL, плеер подхватит его сам.
 */
const VIDEO_EMBED_URL: string | null = null;

const bullets = [
  'Объекты до и после — без постановки',
  'Прорабы и бригада — в лицо, а не безликая «команда профессионалов»',
  'Отзывы владельцев — с адресами, которые можно проверить',
];

/**
 * Видео о компании: постер-заглушка с кнопкой play.
 * Play открывает заявку «пришлём видео» — лид-магнит вместо битого плеера.
 */
export default function Video() {
  const openLead = useLeadModal();

  const play = () =>
    openLead({
      source: 'video',
      title: 'Пришлём видео о компании',
      details: '2 минуты: объекты, команда, отзывы владельцев',
    });

  return (
    <section aria-labelledby="video-heading" className="scroll-mt-20">
      <div className="mx-auto max-w-6xl xl:max-w-7xl 2xl:max-w-[88rem] px-4 pt-2 pb-14 sm:px-6 lg:pb-20">
        <Reveal className="grid items-center gap-8 rounded-3xl bg-foreground p-6 text-white shadow-[0_20px_25px_rgba(0,0,0,0.15)] sm:p-10 lg:grid-cols-2">
          <div>
            <p className="font-display text-sm font-bold tracking-wide text-accent uppercase">
              Видео о компании
            </p>
            <h2
              id="video-heading"
              className="mt-2 font-display text-3xl font-extrabold tracking-tight text-balance sm:text-4xl 2xl:text-5xl"
            >
              2 минуты — и вы знаете о нас всё
            </h2>
            <ul className="mt-6 space-y-3">
              {bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
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
                  <span className="leading-relaxed text-white/90">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative overflow-hidden rounded-2xl">
            {VIDEO_EMBED_URL ? (
              <iframe
                src={VIDEO_EMBED_URL}
                title="Видео о компании"
                className="aspect-video w-full"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={play}
                aria-label="Смотреть видео о компании — оставите телефон, пришлём ссылку"
                className="group relative block aspect-video w-full cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br from-amber-200 via-orange-100 to-stone-400 text-left"
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      'radial-gradient(rgba(120,113,108,0.25) 1.5px, transparent 1.5px)',
                    backgroundSize: '20px 20px',
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="flex h-20 w-20 items-center justify-center rounded-full bg-accent text-on-accent shadow-[0_10px_15px_rgba(0,0,0,0.2)] transition-transform duration-200 group-hover:scale-105">
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="ml-1 h-9 w-9">
                      <path d="M8 5.5v13l11-6.5-11-6.5Z" />
                    </svg>
                  </span>
                </span>
                <span
                  aria-hidden="true"
                  className="absolute right-4 bottom-4 rounded-lg bg-black/60 px-2.5 py-1 font-display text-xs font-bold text-white"
                >
                  2:30
                </span>
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
