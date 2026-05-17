import { GitHubContent } from '../types';

const GITHUB_API = 'https://api.github.com';
const IGNORED_DIRS = ['node_modules', '.git', '.next', 'dist', 'build', 'out', 'coverage'];
const ALLOWED_EXTENSIONS = ['.js', '.jsx', '.ts', '.tsx'];

const githubHeaders = () => {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
};

const isIgnoredPath = (path: string) =>
  IGNORED_DIRS.some((ignore) => path.split('/').includes(ignore));

const isAllowedFile = (path: string) =>
  ALLOWED_EXTENSIONS.some((extension) => path.endsWith(extension));

async function fetchJson(url: string) {
  const response = await fetch(url, { headers: githubHeaders() });

  if (!response.ok) {
    throw new Error(`GitHub API request failed with ${response.status}: ${response.statusText}`);
  }

  return response.json();
}

export function parseRepoUrl(input: string): { owner: string; repo: string } | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  try {
    const normalized = trimmed.startsWith('http') ? trimmed : `https://${trimmed}`;
    const url = new URL(normalized);
    if (!url.hostname.includes('github.com')) return null;

    const parts = url.pathname.replace(/(^\/|\.git$)/g, '').split('/').filter(Boolean);
    if (parts.length < 2) return null;

    return { owner: parts[0], repo: parts[1] };
  } catch {
    const sshMatch = trimmed.match(/git@github.com:(.+?)\/(.+?)(?:\.git)?$/);
    if (sshMatch) {
      return { owner: sshMatch[1], repo: sshMatch[2] };
    }

    return null;
  }
}

export async function fetchRepoFiles(owner: string, repo: string): Promise<GitHubContent[]> {
  const files: GitHubContent[] = [];

  async function traverse(folderPath = '') {
    const url = `${GITHUB_API}/repos/${owner}/${repo}/contents/${folderPath}`;
    const contents = await fetchJson(url);

    if (!Array.isArray(contents)) {
      return;
    }

    for (const item of contents) {
      if (isIgnoredPath(item.path)) continue;

      if (item.type === 'dir') {
        await traverse(item.path);
        continue;
      }

      if (item.type === 'file' && item.download_url && isAllowedFile(item.path)) {
        files.push({
          type: item.type,
          path: item.path,
          name: item.name,
          download_url: item.download_url,
        });
      }
    }
  }

  await traverse();
  return files;
}

export async function fetchFileContent(downloadUrl: string): Promise<string> {
  const response = await fetch(downloadUrl);
  if (!response.ok) {
    throw new Error(`Unable to download file content: ${response.status}`);
  }

  return response.text();
}
