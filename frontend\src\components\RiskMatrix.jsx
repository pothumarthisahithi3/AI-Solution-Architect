import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, Info } from 'lucide-react';

export default function RiskMatrix({ risks = [] }) {
  if (!risks || risks.length === 0) return None;

  const getImpactBadge = (level) => {
    const l = level?.toLowerCase() || '';
    if (l.includes('high')) {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/30">HIGH</span>;
    }
    if (l.includes('medium')) {
      return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">MEDIUM</span>;
    }
    return <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">LOW</span>;
  };

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <ShieldAlert className="h-5 w-5 text-rose-400" />
          Risk Assessment & Mitigation Matrix
        </h3>
        <span className="text-xs text-slate-400">Security & Operational Reliability</span>
      </div>

      <div className="space-y-4">
        {risks.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
          >
            {/* Risk Title & Details */}
            <div className="space-y-1 flex-1">
              <div className="flex items-center gap-3">
                <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
                <h4 className="font-semibold text-slate-100 text-sm">{item.risk}</h4>
              </div>
              <div className="flex items-start gap-2 pt-1 text-xs text-slate-400 pl-7">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <p><span className="text-slate-300 font-medium">Mitigation:</span> {item.mitigation}</p>
              </div>
            </div>

            {/* Impact & Probability Badges */}
            <div className="flex items-center gap-3 shrink-0 self-end md:self-center pl-7 md:pl-0">
              <div className="text-right">
                <div className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Impact</div>
                <div>{getImpactBadge(item.impact)}</div>
              </div>
              <div className="text-right">
                <div className="text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Probability</div>
                <div>{getImpactBadge(item.probability)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
