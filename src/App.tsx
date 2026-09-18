import Benefits from './components/Benefits';
import Calculator from './components/Calculator';
import Header from './components/Header';
import Hero from './components/Hero';
import { LeadModalProvider } from './components/LeadModal';
import Pain from './components/Pain';
import Portfolio from './components/Portfolio';
import SocialProof from './components/SocialProof';
import Video from './components/Video';
import Zamer from './components/Zamer';

export default function App() {
  return (
    <LeadModalProvider>
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
          <SocialProof />
          <Pain />
          <Benefits />
          <Calculator />
          <Portfolio />
          <Video />
          <Zamer />
        </main>
      </div>
    </LeadModalProvider>
  );
}
