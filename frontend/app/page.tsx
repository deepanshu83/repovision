'use client';

import { useState } from 'react';
import DependencyGraph from '../components/DependencyGraph';
import type { Graph } from '../lib/types';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? 'http://localhost:4000';

type AnalyzeResult = {
  repoName: string;
  graph: Graph;
  importantFiles: string[];
  aiSummary: string;
};

export default function HomePage() {
  const [repoUrl, setRepoUrl] = useState('');
  const [result, setResult] = useState<AnalyzeResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setResult(null);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ repositoryUrl: repoUrl }),
      });

      const payload = await response.json();
      if (!response.ok) {
        throw new Error(payload.error || 'Failed to analyze repository');
      }

      setResult(payload as AnalyzeResult);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      {/* Hero Section */}
      <section className="hero px-4 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <h2 className="mb-6 text-5xl font-bold leading-tight text-white">
              Understand Any Codebase in Seconds
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-xl text-slate-400">
              Analyze GitHub repositories with AI-powered intelligence. Get instant insights on architecture, dependencies, tech stack, and code structure. No installation required.
            </p>

            {/* Analyze Form */}
            <form className="mx-auto max-w-2xl space-y-4" onSubmit={handleSubmit}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <input
                  value={repoUrl}
                  onChange={(event) => setRepoUrl(event.target.value)}
                  placeholder="github.com/user/repo"
                  className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-4 py-4 text-slate-100 outline-none transition hover:border-slate-500 focus:border-sky-400"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-gradient-to-r from-sky-500 to-cyan-500 px-8 py-4 font-semibold text-white transition hover:shadow-lg hover:shadow-sky-500/50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Analyzing…' : 'Analyze'}
                </button>
              </div>
              <p className="text-sm text-slate-500">
                Try: vercel/next.js • facebook/react • nodejs/node
              </p>
            </form>

            {error ? (
              <div className="mx-auto mt-6 max-w-2xl rounded-lg border border-rose-500/50 bg-rose-500/10 px-4 py-3 text-rose-100">
                {error}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      {/* Results Section */}
      {result ? (
        <section className="results-section px-4 py-20">
          <div className="mx-auto max-w-6xl space-y-8">
            <div className="text-center">
              <h2 className="mb-2 text-4xl font-bold text-white">Repository Analysis</h2>
              <p className="text-lg text-sky-400 font-mono">{result.repoName}</p>
            </div>

            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
              {/* Main Content */}
              <div className="space-y-6">
                {/* AI Summary */}
                <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-6 backdrop-blur">
                  <h3 className="mb-4 text-2xl font-semibold text-white">📊 AI Analysis</h3>
                  <p className="whitespace-pre-wrap text-slate-200 leading-relaxed">{result.aiSummary}</p>
                </div>

                {/* Dependency Graph */}
                <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-6 backdrop-blur">
                  <h3 className="mb-4 text-2xl font-semibold text-white">🔗 Dependency Graph</h3>
                  <div className="overflow-hidden rounded">
                    <DependencyGraph graph={result.graph} />
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <aside className="space-y-6">
                {/* Important Files */}
                <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-6 backdrop-blur">
                  <h3 className="mb-4 text-xl font-semibold text-white">🔑 Key Files</h3>
                  <div className="space-y-2">
                    {result.importantFiles.length ? (
                      result.importantFiles.map((file) => (
                        <div
                          key={file}
                          className="rounded border border-slate-600 bg-slate-950/60 px-3 py-2 text-sm text-slate-300 font-mono"
                        >
                          {file}
                        </div>
                      ))
                    ) : (
                      <p className="text-slate-400">No central files detected.</p>
                    )}
                  </div>
                </div>

                {/* How It Works */}
                <div className="rounded-lg border border-slate-700 bg-slate-900/60 p-6 backdrop-blur">
                  <h3 className="mb-4 text-xl font-semibold text-white">ℹ️ How It Works</h3>
                  <ol className="space-y-2 text-sm text-slate-400">
                    <li>1. Parse GitHub URL</li>
                    <li>2. Fetch repository contents</li>
                    <li>3. Analyze dependencies</li>
                    <li>4. Generate insights</li>
                  </ol>
                </div>
              </aside>
            </div>

            {/* CTA Button */}
            <div className="flex justify-center pt-4">
              <button
                className="rounded-lg bg-slate-700 px-6 py-3 font-semibold text-white transition hover:bg-slate-600"
                onClick={() => {
                  setRepoUrl('');
                  setResult(null);
                  setError('');
                }}
              >
                Analyze Another Repo
              </button>
            </div>
          </div>
        </section>
      ) : null}

      {/* Features Section */}
      {!result ? (
        <>
          <section id="features" className="features px-4 py-20">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white">Powerful Insights</h2>
                <p className="text-lg text-slate-400">Get comprehensive analysis of any GitHub repository in seconds</p>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                {[
                  { icon: '🔍', title: 'Tech Stack Detection', desc: 'Identify frameworks and dependencies at a glance' },
                  { icon: '📊', title: 'Code Architecture', desc: 'Understand file structure and organization' },
                  { icon: '🤖', title: 'AI-Powered Analysis', desc: 'Get intelligent summaries of codebases' },
                  { icon: '⚡', title: 'Instant Results', desc: 'Complete analysis in seconds' },
                ].map((feature) => (
                  <div
                    key={feature.title}
                    className="rounded-lg border border-slate-700 bg-slate-900/60 p-6 backdrop-blur transition hover:border-sky-500/50 hover:bg-slate-900/80 hover:shadow-lg hover:shadow-sky-500/20"
                  >
                    <div className="mb-4 text-4xl">{feature.icon}</div>
                    <h3 className="mb-2 text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-slate-400">{feature.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works Section */}
          <section id="how-it-works" className="how-it-works px-4 py-20 bg-slate-900/30">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white">How It Works</h2>
                <p className="text-lg text-slate-400">Simple three-step process to analyze any repository</p>
              </div>

              <div className="grid gap-8 md:grid-cols-3">
                {[
                  { num: '1', title: 'Paste Repository URL', desc: 'Enter any GitHub repository URL or username/repo format' },
                  { num: '2', title: 'AI Analysis', desc: 'Our AI scans the codebase and analyzes dependencies' },
                  { num: '3', title: 'Get Insights', desc: 'Receive detailed analysis with tech stack and architecture' },
                ].map((step) => (
                  <div
                    key={step.num}
                    className="relative rounded-lg border border-slate-700 bg-slate-900/60 p-6 backdrop-blur"
                  >
                    <div className="absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-sky-500 to-cyan-500 text-lg font-bold text-white">
                      {step.num}
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-white pt-2">{step.title}</h3>
                    <p className="text-sm text-slate-400">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Capabilities Section */}
          <section id="capabilities" className="capabilities px-4 py-20">
            <div className="mx-auto max-w-6xl">
              <div className="mb-16 text-center">
                <h2 className="mb-4 text-4xl font-bold text-white">What We Can Analyze</h2>
                <p className="text-lg text-slate-400">Comprehensive support for popular tech stacks</p>
              </div>

              <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-6">
                {[
                  { icon: '⚛️', name: 'React & Vue' },
                  { icon: '🟩', name: 'Node.js' },
                  { icon: '🐍', name: 'Python' },
                  { icon: '☕', name: 'Java' },
                  { icon: '🔷', name: 'TypeScript' },
                  { icon: '🎯', name: 'Go & Rust' },
                ].map((tech) => (
                  <div
                    key={tech.name}
                    className="rounded-lg border border-slate-700 bg-slate-900/60 p-4 text-center backdrop-blur transition hover:border-sky-500/50 hover:bg-slate-900/80"
                  >
                    <div className="mb-2 text-3xl">{tech.icon}</div>
                    <p className="text-sm font-medium text-slate-200">{tech.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="cta-section-main px-4 py-20 bg-gradient-to-r from-sky-500/10 via-cyan-500/10 to-teal-500/10">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="mb-4 text-4xl font-bold text-white">Ready to Understand Your Codebase?</h2>
              <p className="mb-2 text-lg text-slate-300">
                Join developers who use RepoVision to navigate complex repositories with confidence
              </p>
              <p className="text-sky-400 font-medium">Start analyzing now - it's free and takes seconds</p>
            </div>
          </section>
        </>
      ) : null}
    </main>
  );
}
