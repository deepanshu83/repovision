import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RepoVision AI - Repository Intelligence Platform',
  description: 'Transform GitHub repositories into interactive architecture maps powered by AI. Understand, analyze, and visualize codebases at scale.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
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
        {children}
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
      </body>
    </html>
  );
}
