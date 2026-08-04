import React, { useEffect, useRef } from 'react';
import mermaid from 'mermaid';
import { Network, Server, Database, Lock, Globe, ArrowRight } from 'lucide-react';

mermaid.initialize({
  startOnLoad: false,
  theme: 'dark',
  securityLevel: 'loose',
  themeVariables: {
    fontFamily: 'Inter, sans-serif',
    primaryColor: '#4f46e5',
    primaryTextColor: '#f8fafc',
    primaryBorderColor: '#6366f1',
    lineColor: '#38bdf8',
    secondaryColor: '#0f172a',
    tertiaryColor: '#1e293b'
  }
});

export default function ArchitectureDiagram({ mermaidCode, data }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && mermaidCode) {
      containerRef.current.innerHTML = '';
      const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
      
      mermaid.render(id, mermaidCode)
        .then(({ svg }) => {
          if (containerRef.current) {
            containerRef.current.innerHTML = svg;
          }
        })
        .catch((err) => {
          console.warn('Mermaid rendering fallback:', err);
        });
    }
  }, [mermaidCode]);

  return (
    <div className="glass-panel p-6 rounded-2xl border border-slate-800">
      <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Network className="h-5 w-5 text-indigo-400" />
          System Architecture Topology
        </h3>
        <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-mono">
          {data?.architecture_style || 'System Flow'}
        </span>
      </div>

      {/* Render Mermaid if SVG generated successfully */}
      <div className="overflow-x-auto p-4 bg-slate-900/60 rounded-xl border border-slate-800/80 min-h-[220px] flex items-center justify-center">
        <div ref={containerRef} className="w-full flex justify-center text-center"></div>
      </div>

      {/* Structured Visual Topology Flow */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* Node 1: Client / Web UI */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/30 relative group">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-2">
            <Globe className="h-4 w-4 text-cyan-400" />
            Client Tier
          </div>
          <div className="text-sm font-bold text-white">{data?.frontend?.name || 'React Single Page App'}</div>
          <div className="text-xs text-slate-400 mt-1 line-clamp-2">{data?.frontend?.category}</div>
        </div>

        {/* Node 2: Backend API */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/30 relative group">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-2">
            <Server className="h-4 w-4 text-indigo-400" />
            API & Business Logic
          </div>
          <div className="text-sm font-bold text-white">{data?.backend?.name || 'FastAPI Microservice'}</div>
          <div className="text-xs text-slate-400 mt-1 line-clamp-2">{data?.backend?.category}</div>
        </div>

        {/* Node 3: Database */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/30 relative group">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-2">
            <Database className="h-4 w-4 text-emerald-400" />
            Data Persistence
          </div>
          <div className="text-sm font-bold text-white">{data?.database?.name || 'PostgreSQL / Redis'}</div>
          <div className="text-xs text-slate-400 mt-1 line-clamp-2">{data?.database?.category}</div>
        </div>

        {/* Node 4: Identity & Cloud */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/30 relative group">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs uppercase tracking-wider mb-2">
            <Lock className="h-4 w-4 text-amber-400" />
            Auth & Infrastructure
          </div>
          <div className="text-sm font-bold text-white">{data?.authentication?.name?.split('/')[0] || 'OAuth2'}</div>
          <div className="text-xs text-slate-400 mt-1 line-clamp-2">{data?.deployment?.name?.split('(')[0]}</div>
        </div>

      </div>
    </div>
  );
}
