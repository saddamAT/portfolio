import { ArrowUp, Mail, Linkedin, FileText } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface FooterProps {
  onOpenResume: () => void;
}

export default function Footer({ onOpenResume }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-brand-border bg-brand-dark py-8 text-xs text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Identity */}
        <div className="flex items-center gap-2">
          <span className="font-bold text-white">{PROFILE.name}</span>
          <span>— Senior Full Stack Engineer & AI Systems Architect</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 font-mono text-[11px]">
          <button
            type="button"
            onClick={scrollToTop}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={onOpenResume}
            className="hover:text-cyan-400 transition-colors flex items-center gap-1 cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>CV Spec</span>
          </button>
          <a
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            href={`mailto:${PROFILE.email}`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email</span>
          </a>
          <a
            className="hover:text-cyan-400 transition-colors flex items-center gap-1"
            href={PROFILE.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="w-3.5 h-3.5" />
            <span>LinkedIn</span>
          </a>
        </div>

        {/* Built With Credit */}
        <div className="text-slate-500">
          <span>TypeScript · Python · Next.js · Tailwind CSS</span>
        </div>
      </div>
    </footer>
  );
}
