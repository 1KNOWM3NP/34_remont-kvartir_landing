import Header from './components/Header';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen bg-background font-body text-foreground antialiased">
      <a
        href="#hero-heading"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:font-bold"
      >
        Перейти к содержанию
      </a>
      <Header />
      <main>
        <Hero />

        {/* Заглушки якорей под задачи №2 (калькулятор) и №3 (модалка/замер).
            CTA hero уже ведут сюда; наполнение — в своих задачах. */}
        <section
          id="calculator"
          aria-label="Калькулятор стоимости (скоро)"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-6 sm:px-6"
        >
          <div className="rounded-2xl border border-dashed border-primary/50 bg-card px-6 py-8 text-center">
            <h2 className="font-display text-xl font-extrabold">
              Калькулятор стоимости
            </h2>
            <p className="mx-auto mt-2 max-w-md text-muted-foreground">
              Появится в задаче №2: площадь, тип ремонта, комнаты и опции →
              диапазон цены.
            </p>
          </div>
        </section>

        <section
          id="zamer"
          aria-label="Бесплатный замер (скоро)"
          className="mx-auto max-w-6xl scroll-mt-20 px-4 pt-2 pb-16 sm:px-6"
        >
          <div className="rounded-2xl bg-foreground px-6 py-10 text-center text-white">
            <h2 className="font-display text-xl font-extrabold sm:text-2xl">
              Бесплатный замер за 60 минут
            </h2>
            <p className="mx-auto mt-2 max-w-md text-white/80">
              Форма заявки с модалкой появится в задаче №3. А пока звоните:{' '}
              <a
                href="tel:+74951204567"
                className="font-bold whitespace-nowrap text-white underline decoration-accent decoration-2 underline-offset-4"
              >
                +7 495 120-45-67
              </a>
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}
