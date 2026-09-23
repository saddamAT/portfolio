import { ENGINEERING_PHILOSOPHIES } from '../data/portfolioData';

export default function EngineeringPhilosophy() {
  return (
    <section className="py-20 bg-brand-dark border-t border-brand-border relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="text-cyan-400 text-xs font-mono font-semibold tracking-wider uppercase mb-2">
            Core Principles
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[2.65rem] font-bold text-white tracking-tight leading-tight">
            Engineering Philosophy
          </h2>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ENGINEERING_PHILOSOPHIES.map((item, index) => {
            const isCyan = index % 2 === 0;

            return (
              <div
                key={item.number}
                className="p-6 rounded-2xl glass-card border border-brand-border hover:border-cyan-500/30 transition-colors"
              >
                <div
                  className={`font-mono text-lg font-bold mb-3 ${
                    isCyan ? 'text-cyan-400' : 'text-blue-400'
                  }`}
                >
                  {item.number} / {item.tag}
                </div>
                <h3 className="text-white font-bold text-base mb-2">{item.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
