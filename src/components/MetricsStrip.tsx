import { METRICS } from '../data/portfolioData';

export default function MetricsStrip() {
  return (
    <section className="border-y border-brand-border bg-brand-surface/80 py-8 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 text-center">
          {METRICS.map((metric, index) => {
            const isGradient = index === 0;
            const isCyan = index === 2;
            const isBlue = index === 4;

            return (
              <div
                key={metric.label}
                className={`p-4 rounded-xl glass-card border border-brand-border/60 ${
                  index === 4 ? 'col-span-2 md:col-span-1' : ''
                }`}
              >
                <div
                  className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold font-mono tracking-tight ${
                    isGradient
                      ? 'text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500'
                      : isCyan
                      ? 'text-cyan-400'
                      : isBlue
                      ? 'text-blue-400'
                      : 'text-white'
                  }`}
                >
                  {metric.value}
                </div>
                <div className="text-xs uppercase tracking-wider text-slate-400 mt-1 font-medium">
                  {metric.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
