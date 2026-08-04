import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Layers, Users, DollarSign, Shield, Cloud, Plus, X, ArrowRight, Loader2, Cpu } from 'lucide-react';
import { analyzeProject } from '../services/api';

export default function Form() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Initializing AI Architect...');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    project_name: '',
    domain: 'FinTech & Banking',
    description: '',
    expected_users: '10k - 100k users',
    budget: 'Mid-scale ($25k - $100k)',
    required_features: ['OAuth2 Authentication', 'Real-time Push Updates', 'RESTful API Integration'],
    preferred_cloud: 'AWS',
    security_requirements: 'Standard Encryption & OWASP Top 10',
  });

  const [featureInput, setFeatureInput] = useState('');

  const domainsList = [
    'FinTech & Banking',
    'E-Commerce & Retail',
    'Healthcare & HealthTech',
    'Artificial Intelligence & ML',
    'Education & EdTech',
    'Gaming & Entertainment',
    'SaaS & B2B Enterprise',
    'IoT & Logistics',
    'Social Media & Networking'
  ];

  const scaleOptions = [
    '< 1,000 users (MVP / Prototype)',
    '1,000 - 10,000 users (Early Growth)',
    '10,000 - 100,000 users (Medium Scale)',
    '100,000 - 1,000,000 users (Large Scale)',
    '1,000,000+ users (Enterprise Scale)'
  ];

  const budgetOptions = [
    'Minimal / Bootstrapped ($0 - $5k)',
    'Seed / Startup ($5k - $25k)',
    'Mid-scale ($25k - $100k)',
    'Enterprise ($100k+)'
  ];

  const cloudOptions = ['AWS', 'Google Cloud Platform (GCP)', 'Microsoft Azure', 'Vercel / Supabase', 'Docker / Self-Hosted', 'Any (AI Recommended)'];

  const handleAddFeature = () => {
    if (featureInput.trim() && !formData.required_features.includes(featureInput.trim())) {
      setFormData({
        ...formData,
        required_features: [...formData.required_features, featureInput.trim()]
      });
      setFeatureInput('');
    }
  };

  const handleRemoveFeature = (feature) => {
    setFormData({
      ...formData,
      required_features: formData.required_features.filter(f => f !== feature)
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.project_name.trim() || !formData.description.trim()) {
      setError('Please provide a project name and detailed description.');
      return;
    }

    setError('');
    setLoading(true);

    const steps = [
      'Evaluating domain context and performance constraints...',
      'Selecting optimal Frontend & Backend Frameworks...',
      'Synthesizing Database persistence & Caching strategy...',
      'Building Identity, Auth, and Cloud Infrastructure...',
      'Mapping Project Roadmap & Risk Assessment Matrix...',
      'Generating Mermaid System Topology Diagram...'
    ];

    let stepIdx = 0;
    const interval = setInterval(() => {
      if (stepIdx < steps.length) {
        setLoadingMessage(steps[stepIdx]);
        stepIdx++;
      }
    }, 900);

    try {
      const result = await analyzeProject(formData);
      clearInterval(interval);
      navigate('/dashboard', { state: { architecture: result, project: formData } });
    } catch (err) {
      clearInterval(interval);
      setLoading(false);
      setError(err.response?.data?.detail || 'Failed to generate architecture recommendation. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-indigo-500/30 max-w-md w-full glow-indigo animate-pulse-glow space-y-6">
          <div className="relative mx-auto h-20 w-20 flex items-center justify-center">
            <div className="absolute inset-0 rounded-2xl bg-indigo-600/30 animate-ping" />
            <div className="h-16 w-16 rounded-2xl bg-gradient-to-tr from-indigo-600 to-cyan-400 flex items-center justify-center shadow-xl">
              <Cpu className="h-8 w-8 text-white animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white">Synthesizing Architecture</h3>
            <p className="text-xs text-indigo-300 font-mono animate-pulse">{loadingMessage}</p>
          </div>

          <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden">
            <div className="bg-gradient-to-r from-indigo-500 via-cyan-400 to-emerald-400 h-full animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 space-y-8">
      
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-white flex items-center justify-center gap-2">
          <Sparkles className="h-6 w-6 text-indigo-400" />
          Project Requirement Form
        </h1>
        <p className="text-xs text-slate-400">Fill in your software specifications to generate an AI-powered technical design</p>
      </div>

      {error && (
        <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-semibold text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-8">
        
        {/* Section 1: Basic Information */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase font-bold text-indigo-400 tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
            <Layers className="h-4 w-4" /> 1. General Project Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Nexus FinTech Pay"
                value={formData.project_name}
                onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Domain / Industry *</label>
              <select
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {domainsList.map((d, idx) => (
                  <option key={idx} value={d}>{d}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Project Description & Business Objective *</label>
            <textarea
              required
              rows={3}
              placeholder="Describe what your software does, key user flows, and core business goals..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Section 2: Scale & Budget */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase font-bold text-cyan-400 tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
            <Users className="h-4 w-4" /> 2. Scale & Resource Allocation
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Target Scale / Expected Active Users</label>
              <select
                value={formData.expected_users}
                onChange={(e) => setFormData({ ...formData, expected_users: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {scaleOptions.map((s, idx) => (
                  <option key={idx} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Estimated Budget Level</label>
              <select
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {budgetOptions.map((b, idx) => (
                  <option key={idx} value={b}>{b}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Section 3: Technical Features & Constraints */}
        <div className="space-y-4">
          <h3 className="text-sm uppercase font-bold text-emerald-400 tracking-wider flex items-center gap-2 border-b border-slate-800 pb-2">
            <Shield className="h-4 w-4" /> 3. Required Features & Tech Constraints
          </h3>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">Key Required Features</label>
            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Type a feature and press Add (e.g. Real-time Chat, Payment Gateway)"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddFeature(); } }}
                className="flex-1 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
              <button
                type="button"
                onClick={handleAddFeature}
                className="px-4 py-2 rounded-xl bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 hover:bg-indigo-600/50 text-xs font-bold flex items-center gap-1"
              >
                <Plus className="h-4 w-4" /> Add
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {formData.required_features.map((feature, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full bg-slate-900 text-slate-200 border border-slate-800 text-xs flex items-center gap-2"
                >
                  <span>{feature}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(feature)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Preferred Cloud Provider</label>
              <select
                value={formData.preferred_cloud}
                onChange={(e) => setFormData({ ...formData, preferred_cloud: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              >
                {cloudOptions.map((c, idx) => (
                  <option key={idx} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Security & Compliance Need</label>
              <input
                type="text"
                placeholder="e.g. PCI-DSS, HIPAA, GDPR, OAuth2"
                value={formData.security_requirements}
                onChange={(e) => setFormData({ ...formData, security_requirements: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 text-sm text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>
        </div>

        {/* Submit CTA */}
        <div className="pt-4 border-t border-slate-800 flex justify-end">
          <button
            type="submit"
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold bg-gradient-to-r from-indigo-500 via-indigo-600 to-cyan-500 text-white hover:from-indigo-600 hover:to-cyan-600 transition-all shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 group"
          >
            <Sparkles className="h-4 w-4 text-cyan-200" />
            <span>Generate Architecture Blueprint</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </form>
    </div>
  );
}
