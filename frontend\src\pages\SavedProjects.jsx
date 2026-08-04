import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { History, Trash2, ArrowRight, Sparkles, Calendar, Layers, Database, AlertCircle, Loader2 } from 'lucide-react';
import { getSavedProjects, deleteProject } from '../services/api';

export default function SavedProjects() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const data = await getSavedProjects();
      setProjects(data);
      setError('');
    } catch (err) {
      setError('Could not connect to SQLite database. Please ensure backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this saved project architecture?')) {
      try {
        await deleteProject(id);
        setProjects(projects.filter(p => p.id !== id));
      } catch (err) {
        alert('Failed to delete project.');
      }
    }
  };

  const handleOpenDashboard = (project) => {
    navigate('/dashboard', {
      state: {
        architecture: {
          ...project.architecture_data,
          id: project.id
        },
        project: {
          project_name: project.project_name,
          domain: project.domain,
          expected_users: project.expected_users
        }
      }
    });
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-white flex items-center gap-3">
            <History className="h-7 w-7 text-indigo-400" />
            Saved Project Architectures
          </h1>
          <p className="text-xs text-slate-400 mt-1">Stored securely in local SQLite database (`solution_architect.db`)</p>
        </div>

        <Link
          to="/form"
          className="px-5 py-2.5 rounded-xl font-bold text-xs bg-gradient-to-r from-indigo-500 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 transition-all shadow-md shadow-indigo-500/20 flex items-center justify-center gap-2"
        >
          <Sparkles className="h-4 w-4" />
          <span>New Architecture</span>
        </Link>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="py-12 flex justify-center items-center text-slate-400 gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
          <span className="text-sm font-medium">Fetching saved architectures from SQLite...</span>
        </div>
      ) : projects.length === 0 ? (
        <div className="glass-panel p-12 rounded-3xl border border-slate-800 text-center space-y-4 max-w-lg mx-auto">
          <Database className="h-12 w-12 text-slate-600 mx-auto" />
          <h3 className="text-lg font-bold text-white">No Saved Projects Found</h3>
          <p className="text-xs text-slate-400">Generate your first AI software architecture to save it automatically.</p>
          <Link
            to="/form"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-xs hover:bg-indigo-500 transition-colors"
          >
            <Sparkles className="h-4 w-4" /> Create First Project
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((p) => {
            const arch = p.architecture_data || {};
            return (
              <div
                key={p.id}
                onClick={() => handleOpenDashboard(p)}
                className="glass-panel p-6 rounded-2xl border border-slate-800 hover:border-indigo-500/50 glass-panel-hover cursor-pointer flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {p.domain}
                    </span>
                    <button
                      onClick={(e) => handleDelete(p.id, e)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 rounded-lg hover:bg-slate-900 transition-colors"
                      title="Delete Project"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors">
                    {p.project_name}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2">
                    {arch.summary || 'Architecture recommendation generated by AI Solution Architect.'}
                  </p>

                  <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800/80 space-y-1 text-xs">
                    <div className="text-slate-300 font-semibold flex items-center gap-1.5">
                      <Layers className="h-3.5 w-3.5 text-cyan-400" />
                      {arch.architecture_style || 'Modular Architecture'}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      FE: {arch.frontend?.name?.split(' ')[0]} | BE: {arch.backend?.name?.split(' ')[0]}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800/80 text-xs text-slate-400">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5 text-slate-500" />
                    {new Date(p.created_at).toLocaleDateString()}
                  </span>

                  <span className="text-indigo-400 font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    View Blueprint <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
}
