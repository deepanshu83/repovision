import { useMemo, useState } from 'react';

type Analysis = {
  techStack: string[];
  filesScanned: number;
  importantFiles: string[];
  summary: string;
};

const mockAnalysis = (repo: string): Analysis => {
  const normalized = repo.toLowerCase();

  if (normalized.includes('next')) {
    return {
      techStack: ['Next.js', 'TypeScript', 'Tailwind CSS'],
      filesScanned: 124,
      importantFiles: ['app/page.tsx', 'components/Navbar.tsx', 'lib/auth.ts'],
      summary: `Detected a modern React + Next.js repository. The app likely uses server components and route-based pages to build fast experiences.`,
    };
  }

  if (normalized.includes('express') || normalized.includes('node')) {
    return {
      techStack: ['Node.js', 'Express', 'JavaScript'],
      filesScanned: 78,
      importantFiles: ['server.js', 'routes/api.js', 'middleware/auth.js'],
      summary: `This repository looks like a backend API or service app. Focus areas are routing, middleware, and request handling.`,
    };
  }

  return {
    techStack: ['JavaScript', 'React', 'HTML/CSS'],
    filesScanned: 42,
    importantFiles: ['src/App.js', 'src/index.js', 'package.json'],
    summary: `A small web repository with basic UI and app structure. Good starting point for RepoVision MVP validation.`,
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
      <header>
        <h1>RepoVision MVP</h1>
        <p>Paste any GitHub repository URL or owner/repo path to get a fast analysis preview.</p>
      </header>

      <main>
        <form className="repo-form" onSubmit={handleSubmit}>
          <label htmlFor="repoUrl">GitHub repository URL</label>
          <div className="input-row">
            <input
              id="repoUrl"
              placeholder="https://github.com/user/repo or user/repo"
              value={repoUrl}
              onChange={(event) => setRepoUrl(event.target.value)}
            />
            <button type="submit">Scan</button>
          </div>
        </form>

        {submitted && (
          <section className="results">
            {repoName ? (
              <>
                <div className="card highlight">
                  <h2>Repository</h2>
                  <p>{repoName}</p>
                </div>

                <div className="grid">
                  <div className="card">
                    <h3>Tech stack</h3>
                    <ul>
                      {analysis?.techStack.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="card">
                    <h3>Files scanned</h3>
                    <p>{analysis?.filesScanned}</p>
                  </div>

                  <div className="card">
                    <h3>Key files</h3>
                    <ul>
                      {analysis?.importantFiles.map((file) => (
                        <li key={file}>{file}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="card wide-card">
                  <h3>AI summary</h3>
                  <p>{analysis?.summary}</p>
                </div>
              </>
            ) : (
              <div className="card error">
                <h3>Invalid input</h3>
                <p>Enter a GitHub repo URL like <code>https://github.com/user/repo</code> or <code>user/repo</code>.</p>
              </div>
            )}
          </section>
        )}
      </main>

      <footer>
        <p>RepoVision MVP — simple repo analysis preview.</p>
      </footer>
    </div>
  );
}

export default App;
