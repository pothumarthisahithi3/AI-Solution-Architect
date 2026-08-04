import React from 'react';
import { Cpu, Sparkles, Layers, Database, ShieldCheck, Code2, Server, Terminal, CheckCircle2 } from 'lucide-react';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4 space-y-10">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold">
          <Cpu className="h-4 w-4 text-cyan-400" /> College Mini Project & AI Demonstration
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          About AI Solution Architect
        </h1>

        <p className="text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
          AI Solution Architect is an intelligent full-stack application that transforms high-level software requirements into production-ready technical architecture specifications.
        </p>
      </div>

      {/* Project Stack Breakdown */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Terminal className="h-5 w-5 text-indigo-400" /> Full-Stack Architecture of this Project
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm">
              <Code2 className="h-5 w-5" /> Frontend Layer
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> React 18 & Vite build tool</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Tailwind CSS custom glassmorphism design system</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Axios client for asynchronous REST API communication</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Mermaid.js dynamic SVG flowchart rendering</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Lucide React modern icon library</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
              <Server className="h-5 w-5" /> Backend Layer
            </div>
            <ul className="space-y-2 text-xs text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> FastAPI (Python 3.10+) RESTful web framework</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Google Gemini API (`google-genai` SDK integration)</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> SQLite Database managed via SQLAlchemy ORM</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Pydantic v2 data validation schemas</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> Intelligent local heuristic fallback engine</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Decision Workflow */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
        <h2 className="text-xl font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <Sparkles className="h-5 w-5 text-cyan-400" /> How the AI Architecture Synthesizer Works
        </h2>

        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <div className="h-8 w-8 rounded-xl bg-indigo-500/20 text-indigo-300 font-extrabold flex items-center justify-center shrink-0">1</div>
            <div>
              <h3 className="text-sm font-bold text-white">Requirement Analysis</h3>
              <p className="text-xs text-slate-300 mt-1">Parses user input parameters including domain constraints, SLA user capacity, feature set, budget level, and cloud preferences.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <div className="h-8 w-8 rounded-xl bg-cyan-500/20 text-cyan-300 font-extrabold flex items-center justify-center shrink-0">2</div>
            <div>
              <h3 className="text-sm font-bold text-white">Gemini AI Synthesis</h3>
              <p className="text-xs text-slate-300 mt-1">Executes specialized prompt engineering to evaluate trade-offs (e.g. SQL vs NoSQL, Monolith vs Microservices, OAuth vs JWT) and formats structured JSON responses.</p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-4">
            <div className="h-8 w-8 rounded-xl bg-emerald-500/20 text-emerald-300 font-extrabold flex items-center justify-center shrink-0">3</div>
            <div>
              <h3 className="text-sm font-bold text-white">Persistence & Visualization</h3>
              <p className="text-xs text-slate-300 mt-1">Stores output records into SQLite for historical lookup and renders executive dashboards featuring interactive topology diagrams, delivery roadmaps, and risk matrices.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
