import { useMemo, useState } from 'react';

type Analysis = {
  techStack: string[];
  filesScanned: number;
  importantFiles: string[];
  summary: string;
  complexity: string;
};

const mockAnalysis = (repo: string): Analysis => {
  const normalized = repo.toLowerCase();

  if (normalized.includes('next')) {
    return {
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      filesScanned: 124,
      importantFiles: ['app/page.tsx', 'components/Navbar.tsx', 'lib/auth.ts'],
      summary: `A modern React + Next.js fullstack application. Uses server components for optimized performance and route-based architecture. Strong typing with TypeScript and responsive design with Tailwind CSS.`,
      complexity: 'Advanced',
    };
  }

  if (normalized.includes('express') || normalized.includes('node')) {
    return {
      techStack: ['Node.js', 'Express', 'JavaScript'],
      filesScanned: 78,
      importantFiles: ['server.js', 'routes/api.js', 'middleware/auth.js'],
      summary: `Backend API service built with Express.js. Well-organized routing structure with middleware for authentication and request handling. Suitable for REST API or microservices architecture.`,
      complexity: 'Intermediate',
    };
  }

  return {
    techStack: ['JavaScript', 'React', 'HTML/CSS'],
    filesScanned: 42,
    importantFiles: ['src/App.js', 'src/index.js', 'package.json'],
    summary: `A frontend-focused React application with component-based architecture. Good foundation for learning React fundamentals or rapid prototyping of web interfaces.`,
    complexity: 'Beginner-friendly',
  };
};

const parseRepoName = (input: string) => {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    const url = new URL(trimmed);
    const parts = url.pathname.replace(/\/+$/, '').split('/').filter(Boolean);
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
  } catch {
    // not a full URL
  }

  const parts = trimmed.split('/').filter(Boolean);
  return parts.length === 2 ? trimmed : null;
};

function App() {
  const [repoUrl, setRepoUrl] = useState('');
  const [repoName, setRepoName] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const analysis = useMemo(() => {
    if (!repoName) return null;
    return mockAnalysis(repoName);
  }, [repoName]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const parsed = parseRepoName(repoUrl);
    setRepoName(parsed);
    setSubmitted(true);
  };

  return (
    <div className="app-shell">
      <header className="navbar">
        <div className="navbar-content">
          <div className="logo">
            <span className="logo-icon">◉</span>
            <h1>RepoVision AI</h1>
          </div>
          <p className="tagline">Transform repositories into intelligence</p>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Understand Your Codebase Instantly</h2>
            <p className="hero-subtitle">Paste a GitHub repository URL and get instant AI-powered analysis, visualization, and insights. No installation, no complexity.</p>
            
            <form className="repo-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="repoUrl" className="sr-only">GitHub repository URL</label>
                <div className="input-wrapper">
                  <input
                    id="repoUrl"
                    className="repo-input"
                    placeholder="Paste GitHub URL or owner/repo"
                    value={repoUrl}
                    onChange={(event) => setRepoUrl(event.target.value)}
                  />
                  <button type="submit" className="btn-primary">Analyze</button>
                </div>
              </div>
            </form>

            <p className="form-hint">Example: github.com/vercel/next.js or vercel/next.js</p>
          </div>
        </section>

        {submitted && (
          <section className="results-section">
            {repoName ? (
              <>
                <div className="results-header">
                  <h2 className="results-title">Repository Analysis</h2>
                  <p className="results-repo">{repoName}</p>
                </div>

                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-label">Tech Stack</div>
                    <div className="stat-tags">
                      {analysis?.techStack.map((item) => (
                        <span key={item} className="tag">{item}</span>
                      ))}
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-label">Files Analyzed</div>
                    <div className="stat-value">{analysis?.filesScanned}</div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-label">Complexity Level</div>
                    <div className="complexity-badge">{analysis?.complexity}</div>
                  </div>
                </div>

                <div className="card summary-card">
                  <h3>📊 AI Analysis</h3>
                  <p>{analysis?.summary}</p>
                </div>

                <div className="card files-card">
                  <h3>🔑 Key Files</h3>
                  <div className="files-list">
                    {analysis?.importantFiles.map((file) => (
                      <div key={file} className="file-item">
                        <span className="file-icon">📄</span>
                        <code>{file}</code>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="cta-section">
                  <button className="btn-secondary" onClick={() => { setRepoUrl(''); setRepoName(null); setSubmitted(false); }}>Analyze Another Repo</button>
                </div>
              </>
            ) : (
              <div className="error-state">
                <div className="error-icon">⚠️</div>
                <h3>Invalid Repository</h3>
                <p>Please enter a valid GitHub URL or owner/repo format</p>
                <p className="error-hint">Examples: <code>github.com/user/repo</code> or <code>user/repo</code></p>
              </div>
            )}
          </section>
        )}

        {!submitted && (
          <section className="features">
            <h2>Powerful Features</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">🔍</div>
                <h4>Tech Stack Detection</h4>
                <p>Automatically detect frameworks, languages, and dependencies</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">📊</div>
                <h4>Code Analysis</h4>
                <p>Get insights on file structure and important components</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🤖</div>
                <h4>AI Summaries</h4>
                <p>Understand what the codebase does in plain English</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h4>Instant Results</h4>
                <p>Get analysis in seconds, no installation required</p>
              </div>
            </div>
          </section>
        )}
      </main>

      <footer>
        <p>&copy; 2024 RepoVision AI. Powered by advanced code analysis and machine learning.</p>
      </footer>
    </div>
  );
}

export default App;
