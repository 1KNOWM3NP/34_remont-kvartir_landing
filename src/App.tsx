import { MotionConfig, motion } from 'motion/react';
import Benefits from './components/Benefits';
import Calculator from './components/Calculator';
import Faq from './components/Faq';
import Header from './components/Header';
import Hero from './components/Hero';
import { LeadModalProvider } from './components/LeadModal';
import Pain from './components/Pain';
import Portfolio from './components/Portfolio';
import SocialProof from './components/SocialProof';
import Steps from './components/Steps';
import Video from './components/Video';
import Zamer from './components/Zamer';
import LenisProvider from './lib/LenisProvider';

/** Декоративный фон: два медленных amber-пятна (только transform). */
function Backdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute -top-32 -left-32 h-130 w-130 rounded-full bg-amber-200/50 blur-3xl"
        animate={{ x: [0, 60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-40 h-150 w-150 rounded-full bg-orange-200/40 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 60, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <LenisProvider>
        <LeadModalProvider>
          <div className="relative min-h-screen bg-background font-body text-foreground antialiased">
            <Backdrop />
            <a
              href="#hero-heading"
              className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[60] focus:rounded-lg focus:bg-card focus:px-4 focus:py-2 focus:font-bold"
            >
              Перейти к содержанию
            </a>
            <div className="relative">
              <Header />
              <main>
                <Hero />
                <SocialProof />
                <Pain />
                <Benefits />
                <Calculator />
                <Portfolio />
                <Video />
                <Steps />
                <Faq />
                <Zamer />
              </main>
            </div>
          </div>
        </LeadModalProvider>
      </LenisProvider>
    </MotionConfig>
  );
}
