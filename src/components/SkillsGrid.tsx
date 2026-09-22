import { useState } from 'react';
import { Server, Layout, Sparkles, Database, Cloud, ShieldCheck } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';

export default function SkillsGrid() {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  const filterTabs = [
    { id: 'all', label: 'All Capabilities' },
    { id: 'ai', label: 'AI & Agents' },
    { id: 'backend', label: 'Backend & APIs' },
    { id: 'frontend', label: 'Frontend Architecture' },
    { id: 'cloud', label: 'Cloud & DevOps' },
  ];

  const getCategoryIcon = (categoryName: string) => {
    switch (categoryName) {
      case 'Backend & Languages':
        return <Server className="w-5 h-5" />;
      case 'Frontend Architecture':
        return <Layout className="w-5 h-5" />;
      case 'AI & Agentic Workflows':
        return <Sparkles className="w-5 h-5 text-purple-400" />;
      case 'Databases & Caching':
        return <Database className="w-5 h-5 text-emerald-400" />;
      case 'Cloud & DevOps':
        return <Cloud className="w-5 h-5 text-orange-400" />;
      case 'Type Safety & Testing':
        return <ShieldCheck className="w-5 h-5 text-indigo-400" />;
      default:
        return <Server className="w-5 h-5" />;
    }
  };

  const filteredCategories = SKILL_CATEGORIES.filter((cat) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'ai') return cat.name.includes('AI');
    if (selectedFilter === 'backend') return cat.name.includes('Backend') || cat.name.includes('Database');
    if (selectedFilter === 'frontend') return cat.name.includes('Frontend');
    if (selectedFilter === 'cloud') return cat.name.includes('Cloud') || cat.name.includes('Testing');
    return true;
  });

  return (
    <section className="py-20 bg-brand-surface relative border-t border-brand-border" id="skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-2">
            Technical Proficiency
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Verified Engineering Stack
          </h2>
          <p className="mt-3 text-slate-300 text-sm">
            Categorized capabilities built over 8+ years of production delivery without arbitrary percentage meters.
          </p>

          {/* Interactive Filter Controls (Functional button tabs) */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 mt-8 p-1.5 bg-brand-dark/90 rounded-xl border border-brand-border max-w-xl mx-auto">
            {filterTabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setSelectedFilter(tab.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap cursor-pointer ${
                  selectedFilter === tab.id
                    ? 'bg-brand-elevated text-cyan-300 border border-cyan-700/60 shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCategories.map((cat) => {
            const isAI = cat.name.includes('AI');
            const isBackend = cat.name.includes('Backend');
            const isFrontend = cat.name.includes('Frontend');

            return (
              <div
                key={cat.name}
                className={`glass-card rounded-2xl p-6 border transition-all duration-300 ${
                  isAI
                    ? 'border-cyan-500/40 shadow-glow-cyan/10 hover:border-cyan-400'
                    : 'border-brand-border/80 hover:border-cyan-500/30'
                }`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl border flex items-center justify-center ${
                      isAI
                        ? 'bg-purple-500/10 border-purple-500/30'
                        : isBackend
                        ? 'bg-blue-500/10 border-blue-500/30 text-blue-400'
                        : isFrontend
                        ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                        : 'bg-brand-elevated border-brand-border text-slate-300'
                    }`}
                  >
                    {getCategoryIcon(cat.name)}
                  </div>
                  <h3 className="text-lg font-bold text-white">{cat.name}</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cat.skills.map((skill) => {
                    const isKeySkill =
                      skill === 'Python' ||
                      skill === 'TypeScript' ||
                      skill === 'Multi-Agent Systems' ||
                      skill === 'Next.js (App Router)' ||
                      skill === 'PostgreSQL' ||
                      skill === 'AWS (EC2, S3)' ||
                      skill === 'basedpyright';

                    return (
                      <span
                        key={skill}
                        className={`px-3 py-1 rounded-lg text-xs font-mono border ${
                          isKeySkill
                            ? 'bg-cyan-950/80 text-cyan-300 border-cyan-700/60'
                            : 'bg-brand-elevated text-slate-200 border-brand-border'
                        }`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
