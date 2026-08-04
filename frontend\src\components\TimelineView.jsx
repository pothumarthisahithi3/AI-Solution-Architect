import React from 'react';
import { Calendar, CheckCircle2, Clock, Flag } from 'lucide-react';

export default function TimelineView({ timeline = [] }) {
  if (!timeline || timeline.length === 0) return None;

  const phaseColors = [
    { bg: 'bg-indigo-500/10', border: 'border-indigo-500/30', text: 'text-indigo-400', badge: 'bg-indigo-500/20 text-indigo-300' },
    { bg: 'bg-cyan-500/10', border: 'border-cyan-500/30', text: 'text-cyan-400', badge: 'bg-cyan-500/20 text-cyan-300' },
    { bg: 'bg-purple-500/10', border: 'border-purple-500/30', text: 'text-purple-400', badge: 'bg-purple-500/20 text-purple-300' },
    { bg: 'bg-emerald-500/10', border: 'border-emerald-500/30', text: 'text-emerald-400', badge: 'bg-emerald-500/20 text-emerald-300' },
  ];

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800">
      <div className="flex items-center justify-between mb-6 border-b border-slate-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Calendar className="h-5 w-5 text-cyan-400" />
          Project Execution Roadmap & Timeline
        </h3>
        <span className="text-xs text-slate-400 flex items-center gap-1">
          <Clock className="h-3.5 w-3.5" /> Estimated Phased Delivery
        </span>
      </div>

      <div className="space-y-6">
        {timeline.map((item, idx) => {
          const style = phaseColors[idx % phaseColors.length];
          return (
            <div key={idx} className="relative pl-6 border-l-2 border-slate-800 last:border-0 group">
              {/* Timeline Bullet Node */}
              <div className={`absolute -left-[9px] top-0 h-4 w-4 rounded-full ${style.badge} border border-slate-900 flex items-center justify-center`}>
                <div className={`h-1.5 w-1.5 rounded-full ${style.text.replace('text-', 'bg-')}`} />
              </div>

              <div className={`p-4 rounded-xl ${style.bg} border ${style.border} transition-transform group-hover:translate-x-1`}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <h4 className="font-bold text-slate-100 flex items-center gap-2 text-base">
                    <Flag className={`h-4 w-4 ${style.text}`} />
                    {item.phase}
                  </h4>
                  <span className={`text-xs font-mono font-semibold px-3 py-1 rounded-full ${style.badge} border border-slate-700 w-fit`}>
                    {item.duration}
                  </span>
                </div>

                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
                  {item.milestones?.map((m, mIdx) => (
                    <li key={mIdx} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
