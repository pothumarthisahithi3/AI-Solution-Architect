import React from 'react';
import { Cpu, Github, Sparkles, Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
        
        <div className="flex items-center gap-2">
          <div className="h-6 w-6 rounded-md bg-indigo-600/20 text-indigo-400 flex items-center justify-center border border-indigo-500/20">
            <Cpu className="h-3.5 w-3.5" />
          </div>
          <span className="font-semibold text-slate-200">AI Solution Architect</span>
          <span>•</span>
          <span>College Mini Project & Enterprise Architecture Advisor</span>
        </div>

        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            Powered by <Sparkles className="h-3 w-3 text-cyan-400 inline" /> Google Gemini AI
          </span>
          <span>•</span>
          <span className="text-slate-500">React + FastAPI + SQLite</span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-indigo-400 transition-colors"
          >
            <Github className="h-3.5 w-3.5" />
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
