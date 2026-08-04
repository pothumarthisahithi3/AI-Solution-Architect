import React, { useState } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { Sparkles, Layers, ArrowLeft, Download, CheckCircle2, ShieldAlert, Calendar, Network, FileText, Share2, Cpu } from 'lucide-react';
import TechStackBadge from '../components/TechStackBadge';
import ArchitectureDiagram from '../components/ArchitectureDiagram';
import TimelineView from '../components/TimelineView';
import RiskMatrix from '../components/RiskMatrix';
import ExportModal from '../components/ExportModal';

export default function Dashboard() {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [isExportOpen, setIsExportOpen] = useState(false);

  const architectureData = location.state?.architecture;
  const projectInput = location.state?.project;

  if (!architectureData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-4">
        <div className="glass-panel p-8 rounded-3xl border border-slate-800 max-w-md w-full space-y-4">
          <Cpu className="h-12 w-12 text-indigo-400 mx-auto" />
          <h3 className="text-xl font-bold text-white">No Active Architecture Found</h3>
          <p className="text-xs text-slate-400">Please fill in the project requirement form to generate an architecture design.</p>
          <Link
            to="/form"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors"
          >
            <Sparkles className="h-4 w-4" /> Start Requirement Form
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      {/* Top Banner / Navigation */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/form" className="text-slate-400 hover:text-white text-xs font-semibold flex items-center gap-1">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to Form
            </Link>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-indigo-400">Project ID #{architectureData.id || 'Live'}</span>
            {architectureData.ai_generated ? (
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 text-[10px] font-bold flex items-center gap-1">
                <Sparkles className="h-3 w-3 text-cyan-400" /> Google Gemini AI
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 text-[10px] font-bold">
                Local Heuristic Synthesizer
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {projectInput?.project_name || 'Software Architecture Blueprint'}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Domain: <span className="text-slate-200 font-medium">{projectInput?.domain || 'General Software'}</span> | Scale: <span className="text-slate-200 font-medium">{projectInput?.expected_users || 'Standard'}</span>
          </p>
        </div>

        {/* Export & Save Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExportOpen(true)}
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-indigo-500/40 transition-all flex items-center gap-2"
          >
            <Download className="h-4 w-4 text-cyan-400" />
            <span>Export Report</span>
          </button>

          <Link
            to="/form"
            className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 transition-all shadow-md shadow-indigo-500/20 flex items-center gap-2"
          >
            <Sparkles className="h-4 w-4" />
            <span>New Recommendation</span>
          </Link>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-800 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'overview'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Layers className="h-4 w-4" /> Overview & Tech Stack
        </button>

        <button
          onClick={() => setActiveTab('diagram')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'diagram'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Network className="h-4 w-4" /> System Topology Diagram
        </button>

        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'timeline'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <Calendar className="h-4 w-4" /> Project Timeline
        </button>

        <button
          onClick={() => setActiveTab('risks')}
          className={`px-4 py-2.5 rounded-lg text-xs font-bold transition-all flex items-center gap-2 whitespace-nowrap ${
            activeTab === 'risks'
              ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-900'
          }`}
        >
          <ShieldAlert className="h-4 w-4" /> Risk Matrix
        </button>
      </div>

      {/* Executive Summary Card */}
      <div className="glass-panel p-6 rounded-2xl border border-indigo-500/30 glow-indigo">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-2">
            <FileText className="h-4 w-4" /> Executive Summary & Recommended Pattern
          </h3>
          <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {architectureData.architecture_style || 'Modular Architecture'}
          </span>
        </div>
        <p className="text-sm text-slate-200 leading-relaxed">
          {architectureData.summary}
        </p>
      </div>

      {/* TAB 1: Overview & Tech Stack */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          
          <div className="space-y-4">
            <h2 className="text-xl font-bold text-white">Recommended Technology Stack</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <TechStackBadge title="Frontend Technology" tech={architectureData.frontend} type="frontend" />
              <TechStackBadge title="Backend API Engine" tech={architectureData.backend} type="backend" />
              <TechStackBadge title="Database & Storage" tech={architectureData.database} type="database" />
              <TechStackBadge title="Authentication & Identity" tech={architectureData.authentication} type="auth" />
              <TechStackBadge title="Cloud Deployment Strategy" tech={architectureData.deployment} type="cloud" />
            </div>
          </div>

          {/* Justifications */}
          {architectureData.justifications && architectureData.justifications.length > 0 && (
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white border-b border-slate-800 pb-3">
                Architectural Rationale & Justifications
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {architectureData.justifications.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                    <h4 className="font-semibold text-indigo-300 text-sm">{item.topic}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed">{item.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* TAB 2: System Topology Diagram */}
      {activeTab === 'diagram' && (
        <div className="space-y-6">
          <ArchitectureDiagram mermaidCode={architectureData.diagram_mermaid} data={architectureData} />
        </div>
      )}

      {/* TAB 3: Project Timeline Roadmap */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          <TimelineView timeline={architectureData.timeline} />
        </div>
      )}

      {/* TAB 4: Risk Assessment Matrix */}
      {activeTab === 'risks' && (
        <div className="space-y-6">
          <RiskMatrix risks={architectureData.risk_analysis} />
        </div>
      )}

      {/* Export Modal */}
      <ExportModal
        data={{
          ...architectureData,
          project_name: projectInput?.project_name
        }}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />

    </div>
  );
}
