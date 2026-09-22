import { useState } from 'react';
import { ArrowUpRight, Menu, X, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenResume: () => void;
}

export default function Navbar({ onOpenResume }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#hero' },
    { label: 'Experience', href: '#experience' },
    { label: 'AI Architecture', href: '#ai-architecture', badge: 'Agentic' },
    { label: 'Case Studies', href: '#case-studies' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-brand-border/70 bg-brand-dark/90 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand Wordmark (Single text element with logo container) */}
        <a href="#hero" className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-blue to-brand-cyan flex items-center justify-center font-mono font-bold text-white shadow-glow-cyan text-lg group-hover:scale-105 transition-transform">
            SH
          </div>
          <span className="font-bold text-slate-100 tracking-tight text-base group-hover:text-cyan-400 transition-colors">
            Saddam Hussain
          </span>
        </a>

        {/* Zone 2: Clean Text Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded"
            >
              <span>{link.label}</span>
              {link.badge && (
                <span className="px-1.5 py-0.5 text-[10px] rounded bg-cyan-950/90 text-cyan-400 border border-cyan-800/80 font-mono">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1-2 Primary Actions */}
        <div className="flex items-center gap-3">
          {/* Status Indicator */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-lg bg-brand-surface border border-brand-border text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-medium">Open for Senior Roles</span>
          </div>

          {/* CV Action Button */}
          <button
            type="button"
            onClick={onOpenResume}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-brand-surface hover:bg-brand-elevated border border-brand-border text-xs font-mono text-slate-200 transition-colors"
            title="View Full Curriculum Vitae"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>CV</span>
          </button>

          {/* Contact CTA */}
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-sm shadow-glow-cyan transition-all hover:shadow-cyan-500/25 whitespace-nowrap"
          >
            <span>Get in Touch</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>

          {/* Mobile Menu Toggle Button */}
          <button
            type="button"
            aria-label="Toggle Navigation Menu"
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-brand-surface border border-brand-border"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-6 border-b border-brand-border bg-brand-dark/95 backdrop-blur-xl">
          <div className="flex flex-col space-y-3 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-md text-slate-200 hover:bg-brand-surface hover:text-cyan-400 text-sm font-medium flex items-center justify-between"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="px-1.5 py-0.5 text-[10px] rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">
                    {link.badge}
                  </span>
                )}
              </a>
            ))}
            <div className="pt-2 border-t border-brand-border flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResume();
                }}
                className="w-full py-2.5 rounded-lg bg-brand-surface border border-brand-border text-center text-xs font-mono text-cyan-300 hover:bg-brand-elevated"
              >
                View Full CV (PDF Spec)
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
