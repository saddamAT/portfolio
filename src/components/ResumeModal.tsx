import { X, Printer, Mail, Phone, MapPin } from 'lucide-react';
import { PROFILE, EXPERIENCES, SKILL_CATEGORIES } from '../data/portfolioData';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-brand-surface border border-brand-border rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[95vh] flex flex-col">
        {/* Top Modal Controls */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-brand-border bg-brand-surface">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
            <span className="text-xs font-mono font-bold uppercase text-white tracking-wider">
              Curriculum Vitae · Senior Full Stack & AI Systems Architect
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-elevated hover:bg-brand-border text-white text-xs font-mono border border-brand-border transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-cyan-400" />
              <span>Print / Save PDF</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-brand-elevated transition-colors cursor-pointer"
              aria-label="Close CV Modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable CV Document Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 bg-brand-surface text-slate-200 font-sans text-sm print:bg-white print:text-black print:p-0">
          {/* Header */}
          <div className="border-b border-brand-border pb-6">
            <h1 className="text-3xl font-extrabold text-white tracking-tight">{PROFILE.name}</h1>
            <p className="text-cyan-400 font-mono text-sm mt-1">{PROFILE.role}</p>

            <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                {PROFILE.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5 text-cyan-400" />
                {PROFILE.email}
              </span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-cyan-400" />
                {PROFILE.phone}
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2">
              Executive Summary
            </h2>
            <p className="text-slate-300 leading-relaxed">{PROFILE.shortBio}</p>
          </div>

          {/* Technical Skills Matrix */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-3">
              Technical Competencies
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
              {SKILL_CATEGORIES.map((cat) => (
                <div key={cat.name} className="p-3 rounded-lg bg-brand-elevated border border-brand-border">
                  <span className="font-semibold text-white block mb-1">{cat.name}:</span>
                  <span className="text-slate-300">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Professional Experience */}
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-4">
              Professional Work Experience
            </h2>
            <div className="space-y-6">
              {EXPERIENCES.map((exp) => (
                <div key={exp.company} className="border-l-2 border-brand-border pl-4">
                  <div className="flex flex-wrap items-center justify-between gap-1">
                    <h3 className="font-bold text-white text-base">{exp.title}</h3>
                    <span className="text-xs font-mono text-cyan-400 font-medium">{exp.period}</span>
                  </div>
                  <div className="text-xs font-mono text-slate-400 mb-2">
                    {exp.company} · {exp.location}
                  </div>
                  <ul className="space-y-1.5 list-disc list-outside ml-4 text-xs text-slate-300 leading-relaxed">
                    {exp.bulletPoints.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="border-t border-brand-border pt-4">
            <h2 className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold mb-2">
              Education & Credentials
            </h2>
            <div className="text-xs space-y-1">
              <div className="font-semibold text-white">
                Bachelor of Science in Information Technology (BS IT)
              </div>
              <div className="text-slate-400 font-mono">
                University of the Punjab, Lahore · 2013 – 2017
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
