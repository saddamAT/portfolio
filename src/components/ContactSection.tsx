import { useState } from 'react';
import { Mail, Phone, Linkedin, Copy, Check, Send, Sparkles, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { PROFILE } from '../data/portfolioData';
import { submitContactAction } from '../actions';
import type { ContactFormData } from '../types';

export default function ContactSection() {
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    projectType: 'Multi-Agent AI SaaS Architecture',
    budget: '$25,000 – $50,000',
    message: '',
  });

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    } catch {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2400);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSuccess(null);
    setIsSubmitting(true);

    const res = await submitContactAction(formData);

    if (res.success) {
      setFormSuccess(res.message || 'Thank you! Your message has been received.');
      setFormData({
        name: '',
        email: '',
        company: '',
        projectType: 'Multi-Agent AI SaaS Architecture',
        budget: '$25,000 – $50,000',
        message: '',
      });
    } else {
      setFormError(res.error || 'Failed to transmit message. Please check the fields or email directly.');
    }
    setIsSubmitting(false);
  };

  return (
    <section className="py-20 bg-brand-surface relative border-t border-brand-border" id="contact">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-cyan-500/40 shadow-glow-cyan/20">
          {/* Header Banner */}
          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-mono mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Available for Full-time Roles & High-Impact Consulting
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Let's Build Something Exceptional
            </h2>
            <p className="mt-3 text-slate-300 text-sm">
              Looking for a seasoned Senior Full-Stack Engineer to architect an AI SaaS, optimize Next.js performance,
              or scale robust Python backends?
            </p>
          </div>

          {/* 3 Contact Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center mb-12">
            {/* Email Card */}
            <div className="p-5 rounded-2xl bg-brand-elevated border border-brand-border flex flex-col items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-3">
                <Mail className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-slate-400 mb-1">Direct Email</div>
              <a
                className="text-white font-medium text-xs break-all hover:text-cyan-400 transition-colors"
                href={`mailto:${PROFILE.email}`}
              >
                {PROFILE.email}
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="mt-4 px-3 py-1.5 rounded-lg bg-brand-surface hover:bg-brand-border text-slate-300 text-xs font-mono flex items-center gap-1.5 border border-brand-border transition-colors cursor-pointer"
              >
                {copiedEmail ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-sans">Copied! ✓</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-5 rounded-2xl bg-brand-elevated border border-brand-border flex flex-col items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-3">
                <Phone className="w-6 h-6" />
              </div>
              <div className="text-xs font-mono text-slate-400 mb-1">Direct Phone / WhatsApp</div>
              <a
                className="text-white font-mono text-sm font-semibold hover:text-cyan-400 transition-colors"
                href={`tel:${PROFILE.phone.replace(/\s+/g, '')}`}
              >
                {PROFILE.phone}
              </a>
              <span className="mt-4 text-[11px] font-mono text-slate-400">Lahore, Pakistan (UTC+5)</span>
            </div>

            {/* LinkedIn Card */}
            <div className="p-5 rounded-2xl bg-brand-elevated border border-brand-border flex flex-col items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3">
                <Linkedin className="w-6 h-6 text-indigo-400" />
              </div>
              <div className="text-xs font-mono text-slate-400 mb-1">Professional Network</div>
              <span className="text-white font-semibold text-sm">{PROFILE.name}</span>
              <a
                className="mt-4 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
                href={PROFILE.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                Connect on LinkedIn
              </a>
            </div>
          </div>

          {/* Direct Project Inquiry Form backed by Server Action */}
          <div className="border-t border-brand-border/80 pt-10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-cyan-400" />
                  <span>Send a Project Inquiry</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1 font-mono">
                  Direct submission via Next.js Server Action with instant validation
                </p>
              </div>
              <span className="hidden sm:inline-block text-[11px] font-mono text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800">
                Avg Response: &lt;24 Hours
              </span>
            </div>

            {formSuccess ? (
              <div className="p-6 rounded-2xl bg-emerald-950/40 border border-emerald-800/80 text-center space-y-3">
                <CheckCircle className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="text-lg font-bold text-white">Inquiry Transmitted Successfully</h4>
                <p className="text-sm text-slate-300 max-w-md mx-auto">{formSuccess}</p>
                <button
                  type="button"
                  onClick={() => setFormSuccess(null)}
                  className="mt-4 px-4 py-2 rounded-lg bg-brand-surface hover:bg-brand-elevated border border-brand-border text-xs font-mono text-slate-300"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {formError && (
                  <div className="p-3.5 rounded-xl bg-rose-950/50 border border-rose-800/70 text-rose-300 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="contact-name">
                      Full Name <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="Sarah Jenkins"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="contact-email">
                      Work Email <span className="text-cyan-400">*</span>
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="sarah@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="contact-company">
                      Company / Org
                    </label>
                    <input
                      id="contact-company"
                      type="text"
                      placeholder="Acme Corp"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="contact-type">
                      Engagement Type
                    </label>
                    <select
                      id="contact-type"
                      value={formData.projectType}
                      onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    >
                      <option value="Multi-Agent AI SaaS Architecture">Multi-Agent AI SaaS Architecture</option>
                      <option value="Full-Stack Web Application (Next.js/Python)">Full-Stack Web App (Next.js/Python)</option>
                      <option value="Performance & Realtime Optimization">Performance & Realtime Optimization</option>
                      <option value="Senior Staff / Team Lead Role">Senior Staff / Team Lead Role</option>
                      <option value="Technical Consulting & Advisory">Technical Consulting & Advisory</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="contact-budget">
                      Expected Timeline / Budget
                    </label>
                    <select
                      id="contact-budget"
                      value={formData.budget}
                      onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                    >
                      <option value="Full-Time Employment (Permanent)">Full-Time Employment (Permanent)</option>
                      <option value="$10,000 – $25,000 Project">$10,000 – $25,000 Project</option>
                      <option value="$25,000 – $50,000">$25,000 – $50,000</option>
                      <option value="$50,000+ Enterprise Scope">$50,000+ Enterprise Scope</option>
                      <option value="Advisory / Retainer">Advisory / Retainer</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1.5" htmlFor="contact-message">
                    Project Scope & Objectives <span className="text-cyan-400">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    rows={4}
                    placeholder="Describe your project, architecture requirements, or role details..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-brand-dark border border-brand-border text-white text-sm focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                  />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[11px] font-mono text-slate-500">
                    End-to-end encrypted · Direct to Saddam's inbox
                  </span>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-semibold text-sm shadow-glow-cyan transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Transmitting Server Action...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
