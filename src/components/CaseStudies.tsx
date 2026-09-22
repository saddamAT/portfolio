import { useState } from 'react';
import { Layers, CheckCircle2, Server, ArrowRight, ExternalLink, X, Cpu } from 'lucide-react';
import { CASE_STUDIES } from '../data/portfolioData';
import type { CaseStudy } from '../types';

export default function CaseStudies() {
  const [selectedStudy, setSelectedStudy] = useState<CaseStudy | null>(null);

  return (
    <section className="py-20 bg-brand-dark relative" id="case-studies">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-2">
              Flagship Implementations
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Featured Engineering Case Studies
            </h2>
          </div>
          <p className="text-slate-400 text-sm max-w-md mt-4 md:mt-0 font-normal">
            Real systems deployed into production, solving genuine high-complexity business challenges with high reliability and zero downtime.
          </p>
        </div>

        {/* Case Studies Stack */}
        <div className="space-y-12">
          {/* Case Study 1: Aimyable */}
          {CASE_STUDIES.map((study) => (
            <article
              key={study.id}
              className="glass-card rounded-2xl p-6 sm:p-8 lg:p-10 border border-brand-border/90 relative overflow-hidden transition-all duration-300 hover:border-cyan-500/40"
            >
              {study.id === 'aimyable' && (
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              )}

              {/* Card Header Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-brand-border pb-6">
                <div>
                  <span
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono border ${
                      study.id === 'aimyable'
                        ? 'bg-cyan-950 text-cyan-300 border-cyan-800'
                        : study.id === 'udu-com'
                        ? 'bg-blue-950 text-blue-300 border-blue-800'
                        : 'bg-indigo-950 text-indigo-300 border-indigo-800'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        study.id === 'aimyable'
                          ? 'bg-cyan-400'
                          : study.id === 'udu-com'
                          ? 'bg-blue-400'
                          : 'bg-indigo-400'
                      }`}
                    />
                    {study.flagshipBadge}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mt-2">{study.title}</h3>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  {study.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded bg-brand-elevated text-slate-300 text-xs font-mono border border-brand-border/60"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Grid content */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
                {/* Left Column: Problem & Engineering Solution */}
                <div className="lg:col-span-7 space-y-6">
                  <div>
                    <h4 className="text-xs font-semibold uppercase font-mono tracking-wider text-cyan-400">
                      The Problem & Architecture Challenge
                    </h4>
                    <p className="text-slate-300 text-sm mt-2 leading-relaxed">{study.problem}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold uppercase font-mono tracking-wider text-cyan-400">
                      Key Engineering Contributions
                    </h4>
                    <ul className="mt-3 space-y-2.5 text-sm text-slate-300">
                      {study.contributions.map((contribution, idx) => (
                        <li key={idx} className="flex items-start gap-2.5">
                          <span className="text-cyan-400 mt-1 shrink-0">▸</span>
                          <span className="leading-relaxed">{contribution}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setSelectedStudy(study)}
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-400 hover:text-cyan-300 transition-colors underline underline-offset-4 cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      <span>Inspect Complete Architecture & Tech Specs ➔</span>
                    </button>
                  </div>
                </div>

                {/* Right Column: Interactive Architecture Box */}
                <div className="lg:col-span-5 bg-brand-surface rounded-xl p-5 border border-brand-border flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between border-b border-brand-border/60 pb-3 mb-4">
                      <span className="font-mono text-xs text-slate-300 font-bold uppercase tracking-wider">
                        {study.id === 'aimyable'
                          ? 'Aimyable Architecture Flow'
                          : study.id === 'udu-com'
                          ? 'Udu.com Pipeline Flow'
                          : 'Banyo POS Distributed Sync'}
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Production Live
                      </span>
                    </div>

                    {/* Step Nodes */}
                    <div className="space-y-2.5 font-mono text-xs">
                      {study.architectureFlow.map((flowStep, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="p-2.5 rounded bg-brand-dark border border-brand-border/70 flex items-center justify-between">
                            <span className="text-slate-200 font-medium">{flowStep.step}</span>
                            <span className="text-cyan-400 text-[11px] truncate max-w-[170px]">
                              {flowStep.description}
                            </span>
                          </div>
                          {idx < study.architectureFlow.length - 1 && (
                            <div className="text-center text-slate-500 text-[10px] py-0.5">
                              ↓ {flowStep.subtext}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Business Impact Box */}
                  <div className="mt-6 pt-4 border-t border-brand-border/60">
                    <div className="text-xs font-semibold text-white mb-2 font-mono uppercase tracking-wider">
                      Verified Impact:
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-center">
                      {study.impact.map((item, idx) => (
                        <div key={idx} className="p-2 rounded bg-brand-elevated border border-brand-border/50">
                          <div className="text-base font-bold text-cyan-400 font-mono">{item.metric}</div>
                          <div className="text-[10px] text-slate-400 font-medium mt-0.5">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {/* Case Study Detail Modal */}
      {selectedStudy && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-brand-surface border border-brand-border p-6 sm:p-8 shadow-2xl">
            <button
              type="button"
              onClick={() => setSelectedStudy(null)}
              className="absolute top-5 right-5 p-2 rounded-lg bg-brand-elevated text-slate-400 hover:text-white hover:bg-brand-border transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6">
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                Technical Architecture Specification
              </span>
              <h3 className="text-2xl font-bold text-white mt-1">{selectedStudy.title}</h3>
              <p className="text-xs text-slate-400 font-mono mt-1">
                {selectedStudy.company} · {selectedStudy.period} · Role: {selectedStudy.role}
              </p>
            </div>

            <div className="space-y-6 text-sm text-slate-300">
              <div className="p-4 rounded-xl bg-brand-elevated border border-brand-border/80">
                <h4 className="text-xs font-bold uppercase tracking-wider text-white font-mono mb-2">
                  System Architecture Overview
                </h4>
                <p className="leading-relaxed">{selectedStudy.problem}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono mb-3">
                  Key Technical Capabilities Delivered
                </h4>
                <ul className="space-y-2">
                  {selectedStudy.contributions.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-cyan-400 font-mono mb-3">
                  Technology Stack & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedStudy.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-lg bg-brand-dark border border-brand-border text-xs font-mono text-slate-200"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-brand-border flex items-center justify-between">
                <a
                  href="#contact"
                  onClick={() => setSelectedStudy(null)}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-medium text-xs shadow-glow-cyan transition-all"
                >
                  Discuss This Architecture
                </a>
                <button
                  type="button"
                  onClick={() => setSelectedStudy(null)}
                  className="px-4 py-2 rounded-lg bg-brand-elevated text-slate-300 hover:text-white text-xs font-mono border border-brand-border"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
