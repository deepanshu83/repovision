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
    <main className="min-h-screen bg-slate-950 px-4 py-6 text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-10">
        <section className="rounded-3xl border border-slate-800 bg-slate-900/90 p-8 shadow-xl">
          <p className="text-sm uppercase tracking-[0.3em] text-sky-300">RepoVision MVP</p>
          <h1 className="mt-4 text-4xl font-semibold text-white">Analyze GitHub repos with AI and dependency maps.</h1>
          <p className="mt-4 max-w-2xl text-slate-400">
            Paste any GitHub repository URL and use the GitHub Contents API to build a JavaScript/TypeScript dependency graph.
          </p>

          <form className="mt-8 flex flex-col gap-4 sm:flex-row" onSubmit={handleSubmit}>
            <input
              value={repoUrl}
              onChange={(event) => setRepoUrl(event.target.value)}
              placeholder="https://github.com/vercel/next.js"
              className="min-w-0 flex-1 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-slate-100 outline-none transition hover:border-slate-500 focus:border-sky-400"
            />
            <button
              type="submit"
              disabled={loading}
              className="rounded-2xl bg-sky-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Analyzing…' : 'Analyze'}
            </button>
          </form>

          <p className="mt-3 text-sm text-slate-400">
            Supports JavaScript and TypeScript repos only. Ignore node_modules, images, and build folders.
          </p>
        </section>

        {error ? (
          <div className="rounded-3xl border border-rose-500 bg-rose-500/10 p-6 text-rose-100">{error}</div>
        ) : null}

        {result ? (
          <section className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">
            <div className="space-y-6">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
                <h2 className="text-2xl font-semibold text-white">{result.repoName}</h2>
                <p className="mt-2 text-slate-400">AI summary and dependency visualization for the selected repository.</p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white">AI Explanation</h3>
                <p className="mt-4 whitespace-pre-wrap text-slate-200">{result.aiSummary}</p>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white">Dependency Graph</h3>
                <div className="mt-6">
                  <DependencyGraph graph={result.graph} />
                </div>
              </div>
            </div>

            <aside className="space-y-6">
              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white">Important Files</h3>
                <div className="mt-4 space-y-2">
                  {result.importantFiles.length ? (
                    result.importantFiles.map((file) => (
                      <div key={file} className="rounded-2xl border border-slate-700 bg-slate-950/80 px-4 py-3 text-sm text-slate-200">
                        {file}
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400">No central files detected yet.</p>
                  )}
                </div>
              </div>

              <div className="rounded-3xl border border-slate-800 bg-slate-900/90 p-6 shadow-xl">
                <h3 className="text-xl font-semibold text-white">How it works</h3>
                <ul className="mt-4 space-y-3 text-slate-400">
                  <li>1. Parse the GitHub URL into owner/repository.</li>
                  <li>2. Fetch repository contents recursively from GitHub.</li>
                  <li>3. Filter JS/TS files and read their source text.</li>
                  <li>4. Extract local import relationships and build a graph.</li>
                </ul>
              </div>
            </aside>
          </section>
        ) : null}
      </div>
    </main>
  );
}
