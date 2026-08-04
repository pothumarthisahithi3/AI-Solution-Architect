import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Cpu, Layers, Database, ShieldCheck, ArrowRight, CheckCircle, Server, Code2, Zap } from 'lucide-react';

export default function Home() {
  const sampleTemplates = [
    {
      title: 'FinTech Digital Banking Wallet',
      domain: 'FinTech',
      stack: 'React + FastAPI + PostgreSQL + Auth0',
      desc: 'High-throughput transactional microservices architecture with PCI-DSS compliance.',
    },
    {
      title: 'E-Commerce Marketplace Platform',
      domain: 'E-Commerce',
      stack: 'Next.js + NestJS + Elasticsearch + Redis',
      desc: 'SEO optimized edge serverless architecture with hybrid full-text search.',
    },
    {
      title: 'AI RAG & Vector Intelligence Pipeline',
      domain: 'Artificial Intelligence',
      stack: 'React + FastAPI + PyTorch + pgvector',
      desc: 'Asynchronous streaming GPU pipeline with vector similarity index search.',
    },
  ];

  return (
    <div className="space-y-16 py-8">
      
      {/* Hero Section */}
      <section className="relative text-center max-w-4xl mx-auto px-4 pt-8 pb-12 space-y-6">
        
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold tracking-wide">
          <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
          Enterprise Software Design powered by Google Gemini AI
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white leading-tight">
          Architect Software Stack <br />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
            Powered by Artificial Intelligence
          </span>
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Input your project requirements, budget, scale, and feature set. Our AI Engine analyzes your domain to synthesize optimal frontend, backend, database, security, cloud deployment strategies, timeline roadmaps, and risk analysis.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/form"
            className="w-full sm:w-auto px-8 py-4 rounded-xl text-base font-bold bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 transition-all shadow-xl shadow-indigo-500/25 flex items-center justify-center gap-3 group"
          >
            <Sparkles className="h-5 w-5 text-cyan-200 group-hover:rotate-12 transition-transform" />
            <span>Design My Architecture</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/saved"
            className="w-full sm:w-auto px-6 py-4 rounded-xl text-base font-semibold bg-slate-900 border border-slate-800 text-slate-200 hover:bg-slate-850 hover:text-white transition-all flex items-center justify-center gap-2"
          >
            <span>View Saved Projects</span>
          </Link>
        </div>

        {/* Quick Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-800/80">
          <div className="p-3 text-center">
            <div className="text-indigo-400 font-extrabold text-xl">100%</div>
            <div className="text-xs text-slate-400 mt-1">Domain Tailored</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-cyan-400 font-extrabold text-xl">7 Tiers</div>
            <div className="text-xs text-slate-400 mt-1">Full-Stack Synthesis</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-emerald-400 font-extrabold text-xl">Interactive</div>
            <div className="text-xs text-slate-400 mt-1">Visual Flow Diagrams</div>
          </div>
          <div className="p-3 text-center">
            <div className="text-purple-400 font-extrabold text-xl">SQLite</div>
            <div className="text-xs text-slate-400 mt-1">Historical Persistence</div>
          </div>
        </div>

      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">What AI Solution Architect Delivers</h2>
          <p className="text-xs text-slate-400">Complete end-to-end technical blueprint tailored for your software project</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/40 transition-all space-y-3">
            <div className="h-10 w-10 rounded-xl bg-indigo-500/10 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
              <Layers className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Architecture & Pattern</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Determines whether to adopt Event-Driven Microservices, Clean Monolith, Jamstack, or Serverless based on team capacity and expected throughput.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-cyan-500/40 transition-all space-y-3">
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center border border-cyan-500/20">
              <Code2 className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Full Technology Stack</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Selects optimal languages, frontend frameworks, backend frameworks, database persistence engines, caching layers, and authentication strategies.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-emerald-500/40 transition-all space-y-3">
            <div className="h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center border border-emerald-500/20">
              <Zap className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-bold text-white">Roadmap & Risk Matrix</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              Provides phased delivery timelines with actionable milestones, along with severity-rated risk assessments and concrete mitigation plans.
            </p>
          </div>

        </div>
      </section>

      {/* Pre-built Architecture Templates */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-xl font-bold text-white">Sample Architecture Templates</h2>
            <p className="text-xs text-slate-400">Explore standard architecture paradigms generated by our AI model</p>
          </div>
          <Link to="/form" className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
            Create Custom <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {sampleTemplates.map((item, idx) => (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-slate-800 hover:border-indigo-500/30 transition-all flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-800">
                  {item.domain}
                </span>
                <h3 className="text-base font-bold text-white mt-2">{item.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{item.desc}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80">
                <div className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">Recommended Stack</div>
                <div className="text-xs font-mono text-cyan-300 font-medium">{item.stack}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
