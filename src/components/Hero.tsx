import { useState } from 'react';
import { Copy, Check, MapPin, Sparkles, Linkedin, ArrowRight, Bot } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import AntigravityLogo from './AntigravityLogo';

export default function Hero() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    }
  };

  return (
    <section className="relative pt-12 pb-20 md:pt-20 md:pb-28 overflow-hidden grid-bg-pattern" id="hero">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Value Proposition & Engineering Highlights */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            {/* Google Antigravity Brand Chip */}
            <div className="flex items-center gap-3 mb-5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-surface/90 border border-brand-border text-xs text-slate-200 shadow-sm backdrop-blur-sm">
                <AntigravityLogo className="w-4 h-4" />
                <span className="font-semibold text-slate-100">Google Antigravity</span>
                <span className="text-slate-500">·</span>
                <span className="text-cyan-400 font-mono text-[11px]">Next-Gen Agent Systems</span>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.12]">
              Experience liftoff with <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-300">
                production AI architectures.
              </span>
            </h1>

            {/* Bio summary */}
            <p className="mt-6 text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl font-normal">
              8+ years building and shipping high-throughput production web applications, specializing in{' '}
              <span className="text-white font-medium">Python (Django DRF, FastAPI)</span>,{' '}
              <span className="text-white font-medium">TypeScript (Next.js, React)</span>, and{' '}
              <span className="text-cyan-300 font-medium">Multi-Agent AI Automations</span>. Proven track record
              designing OCR document pipelines, WebSocket RPA bridges, and resilient cloud architectures.
            </p>

            {/* Quick Specs Row */}
            <div className="mt-7 flex flex-wrap gap-3 sm:gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5 bg-brand-surface/90 px-3 py-1.5 rounded-md border border-brand-border">
                <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Lahore, Pakistan (Open to Global Remote)</span>
              </div>
              <div className="flex items-center gap-1.5 bg-brand-surface/90 px-3 py-1.5 rounded-md border border-brand-border">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Day-to-day AI Assisted (Claude Code / Codex)</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#case-studies"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-glow-cyan transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
              >
                <span>Explore Case Studies & Code</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3.5 rounded-xl bg-brand-surface hover:bg-brand-elevated border border-brand-border text-slate-200 font-semibold text-sm flex items-center gap-2 transition-all"
              >
                <Linkedin className="w-4 h-4 text-blue-400" />
                <span>LinkedIn Profile</span>
              </a>

              {/* Copy Email Button */}
              <button
                type="button"
                onClick={handleCopyEmail}
                className="px-4 py-3.5 rounded-xl bg-brand-surface/70 hover:bg-brand-surface border border-brand-border text-slate-300 font-mono text-xs flex items-center gap-2 transition-all cursor-pointer group"
                title="Click to copy email address"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-emerald-400 font-sans font-medium">Copied to Clipboard! ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 transition-colors shrink-0" />
                    <span>{PROFILE.email}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: High-Res Portrait in Engineered Tech Frame */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-sm sm:max-w-md tech-border-glow p-2 rounded-2xl bg-brand-surface/90 shadow-2xl backdrop-blur-sm">
              {/* Subtle decorative corner brackets */}
              <div className="absolute -top-2 -left-2 w-5 h-5 border-t-2 border-l-2 border-cyan-400" />
              <div className="absolute -top-2 -right-2 w-5 h-5 border-t-2 border-r-2 border-blue-400" />
              <div className="absolute -bottom-2 -left-2 w-5 h-5 border-b-2 border-l-2 border-cyan-400" />
              <div className="absolute -bottom-2 -right-2 w-5 h-5 border-b-2 border-r-2 border-blue-400" />

              {/* Engineer Photo Image Container */}
              <div className="relative overflow-hidden rounded-xl bg-slate-900 border border-brand-border aspect-[3/4]">
                <img
                  src={PROFILE.avatarUrl}
                  alt="Saddam Hussain - Senior Full Stack Engineer & AI Systems Architect"
                  referrerPolicy="no-referrer"
                  loading="eager"
                  className="w-full h-full object-cover object-top hover:scale-[1.02] transition-transform duration-500 ease-out"
                />

                {/* Bottom Gradient Overlay for Identity Label */}
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent p-5 pt-14">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-white font-bold text-lg leading-tight">Saddam Hussain</h3>
                      <p className="text-xs text-cyan-400 font-mono">Senior Full Stack Engineer</p>
                    </div>
                    <div className="px-2.5 py-1 rounded bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-[11px] font-mono">
                      8+ YOE
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-2 font-mono flex items-center gap-1.5">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-400" />
                    Stech Experts LTD · Aimyable SaaS
                  </p>
                </div>
              </div>

              {/* Floating Live Agent Architecture Chip */}
              <div className="absolute -bottom-5 -left-4 sm:-left-6 glass-card p-3 rounded-xl border border-cyan-500/40 shadow-xl hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-mono font-bold text-sm">
                  <Bot className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[11px] font-semibold text-white">Agentic Orchestration</div>
                  <div className="text-[10px] text-slate-400 font-mono">Step Agent ➔ RPA WebSocket</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
