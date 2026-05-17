import path from 'path';

const importRegex = /import\s+(?:[^"']+?\s+from\s+)?["'](.+?)["']/g;
const requireRegex = /require\(\s*["'](.+?)["']\s*\)/g;
const supportedExtensions = ['.js', '.jsx', '.ts', '.tsx'];

function resolveImportPaths(filePath: string, importPath: string): string[] {
  if (!importPath.startsWith('.')) {
    return [];
  }

  const directory = path.posix.dirname(filePath);
  const normalized = path.posix.normalize(path.posix.join(directory, importPath));

  if (supportedExtensions.some((ext) => normalized.endsWith(ext))) {
    return [normalized];
  }

  return supportedExtensions.map((ext) => `${normalized}${ext}`);
}

export function extractDependencies(filePath: string, content: string): string[] {
  const dependencies = new Set<string>();
  const parsers = [importRegex, requireRegex];

  for (const parser of parsers) {
    let match;
    while ((match = parser.exec(content)) !== null) {
      const importPath = match[1];
      const resolvedPaths = resolveImportPaths(filePath, importPath);
      resolvedPaths.forEach((resolved) => dependencies.add(resolved));
    }
  }

  return Array.from(dependencies);
}
