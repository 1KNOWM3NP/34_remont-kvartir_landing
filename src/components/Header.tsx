export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <a
          href="#top"
          className="flex min-h-11 items-center gap-2 font-display text-lg font-extrabold tracking-tight"
          aria-label="Ремонт квартир под ключ — на главную"
        >
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
            className="shrink-0 text-accent"
          >
            <path
              d="M3 10.5 12 3l9 7.5V20a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1v-9.5Z"
              fill="currentColor"
            />
          </svg>
          <span>
            Кварт<span className="text-accent">Ремонт</span>
          </span>
        </a>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="tel:+74951204567"
            className="hidden min-h-11 items-center font-display text-base font-bold whitespace-nowrap min-[420px]:flex"
          >
            +7&nbsp;495&nbsp;120-45-67
          </a>
          <a
            href="#zamer"
            className="flex min-h-11 cursor-pointer items-center rounded-lg bg-foreground px-4 py-2 font-display text-sm font-bold text-white transition-colors duration-200 hover:bg-primary"
          >
            Заказать звонок
          </a>
        </div>
      </div>
    </header>
  );
}
