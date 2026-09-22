import { useState, useEffect } from 'react';
import ParticleCanvas from './components/ParticleCanvas';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import MetricsStrip from './components/MetricsStrip';
import CaseStudies from './components/CaseStudies';
import AISystemsArchitecture from './components/AISystemsArchitecture';
import ExperienceTimeline from './components/ExperienceTimeline';
import SkillsGrid from './components/SkillsGrid';
import EngineeringPhilosophy from './components/EngineeringPhilosophy';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';

export default function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [isWhiteMode, setIsWhiteMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme_mode') === 'light';
    }
    return false;
  });

  useEffect(() => {
    if (isWhiteMode) {
      document.documentElement.classList.add('white-mode');
    } else {
      document.documentElement.classList.remove('white-mode');
    }
  }, [isWhiteMode]);

  const handleToggleWhiteMode = () => {
    setIsWhiteMode((prev) => {
      const next = !prev;
      localStorage.setItem('theme_mode', next ? 'light' : 'dark');
      return next;
    });
  };

  return (
    <div
      className={`relative min-h-screen selection:bg-cyan-500/30 selection:text-cyan-200 overflow-x-hidden font-sans transition-colors duration-300 ${
        isWhiteMode ? 'white-mode bg-[#f8fafc] text-slate-800' : 'bg-[#080a0f] text-slate-200'
      }`}
    >
      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Interactive Anti-Gravity Canvas Backdrop with high dot density */}
      <ParticleCanvas isWhiteMode={isWhiteMode} />

      {/* Top Bar Navigation */}
      <Navbar
        onOpenResume={() => setIsResumeOpen(true)}
        isWhiteMode={isWhiteMode}
        onToggleWhiteMode={handleToggleWhiteMode}
      />

      {/* Main Content Flow */}
      <main className="relative z-10">
        <Hero />
        <MetricsStrip />
        <CaseStudies />
        <AISystemsArchitecture />
        <ExperienceTimeline />
        <SkillsGrid />
        <EngineeringPhilosophy />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer onOpenResume={() => setIsResumeOpen(true)} />

      {/* Printable/Downloadable Curriculum Vitae Modal */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
