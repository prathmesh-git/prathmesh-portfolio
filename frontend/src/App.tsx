import { useEffect, useState } from 'react';
import { Assistant } from './chatbot/Assistant';
import { Header } from './components/Header';
import { Hero } from './sections/Hero';
import {
  Story,
  CinematicJourney,
  Work,
  Skills,
  CurrentFocus,
  Contact,
} from './sections/PortfolioSections';
import { CloudArchitecture } from './cloud-visualization/CloudArchitecture';
import { Terminal } from './terminal/Terminal';

export default function App() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(range > 0 ? (window.scrollY / range) * 100 : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <>
      <div className="scroll-meter" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <Header />
      <main>
        <Hero />
        <Story />
        <CinematicJourney />
        <Work />
        <CloudArchitecture />
        <Skills />
        <Terminal />
        <CurrentFocus />
        <Contact />
      </main>
      <Assistant />
    </>
  );
}
