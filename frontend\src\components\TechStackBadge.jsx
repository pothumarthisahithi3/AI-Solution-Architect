import React from 'react';
import { Check, Code2, Server, Database, KeyRound, Cloud, Layers } from 'lucide-react';

export default function TechStackBadge({ title, tech, type = 'frontend' }) {
  if (!tech) return None;

  const iconMap = {
    frontend: { icon: Code2, color: 'text-cyan-400', border: 'border-cyan-500/30', bg: 'bg-cyan-500/10' },
    backend: { icon: Server, color: 'text-indigo-400', border: 'border-indigo-500/30', bg: 'bg-indigo-500/10' },
    database: { icon: Database, color: 'text-emerald-400', border: 'border-emerald-500/30', bg: 'bg-emerald-500/10' },
    auth: { icon: KeyRound, color: 'text-amber-400', border: 'border-amber-500/30', bg: 'bg-amber-500/10' },
    cloud: { icon: Cloud, color: 'text-purple-400', border: 'border-purple-500/30', bg: 'bg-purple-500/10' },
  };

  const style = iconMap[type] || iconMap.frontend;
  const IconComponent = style.icon;

  return (
    <div className={`p-5 rounded-2xl glass-panel ${style.bg} border ${style.border} transition-all hover:scale-[1.01]`}>
      
      {/* Header Badge */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className={`p-2 rounded-xl bg-slate-900 border border-slate-800 ${style.color}`}>
            <IconComponent className="h-5 w-5" />
          </div>
          <span className="text-xs uppercase font-bold tracking-wider text-slate-400">{title}</span>
        </div>
        <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
          {tech.category || 'Core Spec'}
        </span>
      </div>

      {/* Tech Name */}
      <h4 className="text-lg font-extrabold text-white tracking-tight mb-2">
        {tech.name}
      </h4>

      {/* Description */}
      <p className="text-xs text-slate-300 leading-relaxed mb-4">
        {tech.description}
      </p>

      {/* Reasons list */}
      {tech.reasons && tech.reasons.length > 0 && (
        <div className="space-y-1.5 border-t border-slate-800/80 pt-3">
          <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Key Advantages</div>
          {tech.reasons.map((reason, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-300">
              <Check className={`h-3.5 w-3.5 ${style.color} shrink-0 mt-0.5`} />
              <span>{reason}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
