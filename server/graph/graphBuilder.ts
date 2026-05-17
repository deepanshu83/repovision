import { extractDependencies } from '../parser/dependencyParser.ts';
import type { Graph, RepositoryFile } from '../types.ts';

export function buildDependencyGraph(files: RepositoryFile[]): Graph {
  const filePathSet = new Set(files.map((file) => file.path));
  const edgeSet = new Set<string>();
  const edges = [];
  const importCount = new Map<string, number>();

  for (const file of files) {
    const targets = extractDependencies(file.path, file.content);

    for (const target of targets) {
      if (!filePathSet.has(target)) continue;

      const edgeId = `${file.path}>>>${target}`;
      if (edgeSet.has(edgeId)) continue;

      edgeSet.add(edgeId);
      edges.push({ source: file.path, target });
      importCount.set(target, (importCount.get(target) ?? 0) + 1);
    }
  }

  const nodes = files.map((file) => ({
    id: file.path,
    label: file.name,
    importCount: importCount.get(file.path) ?? 0,
  }));

  return { nodes, edges };
}

export function getTopImportantFiles(graph: Graph, limit = 5): string[] {
  return graph.nodes
    .slice()
    .sort((a, b) => b.importCount - a.importCount)
    .filter((node) => node.importCount > 0)
    .slice(0, limit)
    .map((node) => node.id);
}
