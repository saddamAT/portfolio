import { useEffect, useState } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight <= 0) {
        setScrollProgress(0);
        return;
      }
      const progress = window.scrollY / scrollHeight;
      setScrollProgress(Math.min(Math.max(progress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] pointer-events-none origin-left bg-gradient-to-r from-blue-600 via-cyan-400 to-indigo-400 shadow-[0_0_12px_rgba(6,182,212,0.7)] transition-transform duration-75 ease-out"
      style={{
        transform: `scaleX(${scrollProgress})`,
        transformOrigin: '0% 50%',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
}
