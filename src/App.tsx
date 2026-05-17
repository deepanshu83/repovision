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

  const normalizeParts = (parts: string[]) => {
    if (parts.length >= 2) {
      return `${parts[0]}/${parts[1]}`;
    }
    return null;
  };

  try {
    const url = new URL(trimmed.startsWith('http') ? trimmed : `https://${trimmed}`);
    const pathname = url.pathname.replace(/\/+$|^\/+/, '');
    const parts = pathname.split('/').filter(Boolean);
    return normalizeParts(parts);
  } catch {
    // not a parseable URL
  }

  const parts = trimmed.split('/').filter(Boolean);
  return normalizeParts(parts);
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
            <h1>RepoVision</h1>
          </div>
          <nav className="navbar-nav">
            <a href="#features" className="nav-link">Features</a>
            <a href="#how-it-works" className="nav-link">How It Works</a>
            <a href="#capabilities" className="nav-link">Capabilities</a>
          </nav>
          <a href="https://github.com" className="btn-outline">GitHub</a>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h2>Understand Any Codebase in Seconds</h2>
            <p className="hero-subtitle">Analyze GitHub repositories with AI-powered intelligence. Get instant insights on architecture, dependencies, tech stack, and code structure. No installation required.</p>
            
            <form className="repo-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="repoUrl" className="sr-only">GitHub repository URL</label>
                <div className="input-wrapper">
                  <input
                    id="repoUrl"
                    className="repo-input"
                    placeholder="github.com/user/repo"
                    value={repoUrl}
                    onChange={(event) => setRepoUrl(event.target.value)}
                  />
                  <button type="submit" className="btn-primary">Analyze</button>
                </div>
              </div>
            </form>

            <p className="form-hint">Try: vercel/next.js • facebook/react • nodejs/node • github.com/vercel/next.js</p>
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
                <p>Please enter a valid GitHub repository URL</p>
                <p className="error-hint">Format: <code>github.com/user/repo</code> or <code>user/repo</code></p>
              </div>
            )}
          </section>
        )}

        {!submitted && (
          <>
            <section className="features" id="features">
              <div className="section-header">
                <h2>Powerful Insights</h2>
                <p className="section-subtitle">Get comprehensive analysis of any GitHub repository in seconds</p>
              </div>
              <div className="features-grid">
                <div className="feature-card">
                  <div className="feature-icon">🔍</div>
                  <h4>Tech Stack Detection</h4>
                  <p>Identify frameworks, languages, databases, and all dependencies at a glance</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">📊</div>
                  <h4>Code Architecture</h4>
                  <p>Understand file structure, key components, and project organization</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">🤖</div>
                  <h4>AI-Powered Analysis</h4>
                  <p>Get intelligent summaries explaining what the codebase does</p>
                </div>
                <div className="feature-card">
                  <div className="feature-icon">⚡</div>
                  <h4>Instant Results</h4>
                  <p>Complete analysis in seconds without any setup or configuration</p>
                </div>
              </div>
            </section>

            <section className="how-it-works" id="how-it-works">
              <div className="section-header">
                <h2>How It Works</h2>
                <p className="section-subtitle">Simple three-step process to analyze any repository</p>
              </div>
              <div className="steps-grid">
                <div className="step-card">
                  <div className="step-number">1</div>
                  <h4>Paste Repository URL</h4>
                  <p>Enter any GitHub repository URL or username/repo format</p>
                </div>
                <div className="step-card">
                  <div className="step-number">2</div>
                  <h4>AI Analysis</h4>
                  <p>Our AI scans the codebase and analyzes dependencies, structure, and patterns</p>
                </div>
                <div className="step-card">
                  <div className="step-number">3</div>
                  <h4>Get Insights</h4>
                  <p>Receive detailed analysis with tech stack, key files, and architecture overview</p>
                </div>
              </div>
            </section>

            <section className="capabilities" id="capabilities">
              <div className="section-header">
                <h2>What We Can Analyze</h2>
                <p className="section-subtitle">Comprehensive support for popular tech stacks</p>
              </div>
              <div className="capabilities-grid">
                <div className="capability-item">
                  <span className="capability-icon">⚛️</span>
                  <h5>React & Vue</h5>
                  <p>Component-based architecture</p>
                </div>
                <div className="capability-item">
                  <span className="capability-icon">🟩</span>
                  <h5>Node.js</h5>
                  <p>Backend services</p>
                </div>
                <div className="capability-item">
                  <span className="capability-icon">🐍</span>
                  <h5>Python</h5>
                  <p>Data & ML projects</p>
                </div>
                <div className="capability-item">
                  <span className="capability-icon">☕</span>
                  <h5>Java</h5>
                  <p>Enterprise apps</p>
                </div>
                <div className="capability-item">
                  <span className="capability-icon">🔷</span>
                  <h5>TypeScript</h5>
                  <p>Type-safe code</p>
                </div>
                <div className="capability-item">
                  <span className="capability-icon">🎯</span>
                  <h5>Go & Rust</h5>
                  <p>High-performance systems</p>
                </div>
              </div>
            </section>

            <section className="cta-section-main">
              <div className="cta-content">
                <h2>Ready to Understand Your Codebase?</h2>
                <p>Join developers who use RepoVision to navigate complex repositories with confidence</p>
                <p className="cta-hint">Start analyzing now - it's free and takes seconds</p>
              </div>
            </section>
          </>
        )}
      </main>

      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h4>RepoVision</h4>
            <p>Transform GitHub repositories into interactive architecture maps powered by AI.</p>
            <div className="social-links">
              <a href="#" aria-label="GitHub">GitHub</a>
              <a href="#" aria-label="Twitter">Twitter</a>
              <a href="#" aria-label="LinkedIn">LinkedIn</a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Features</h4>
            <ul>
              <li><a href="#features">Tech Stack Detection</a></li>
              <li><a href="#features">Code Architecture</a></li>
              <li><a href="#features">AI Analysis</a></li>
              <li><a href="#features">Instant Results</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#capabilities">Capabilities</a></li>
              <li><a href="#">Documentation</a></li>
              <li><a href="#">API Reference</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Company</h4>
            <ul>
              <li><a href="#">About</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Privacy</a></li>
              <li><a href="#">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 RepoVision. Advanced code intelligence for developers.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
