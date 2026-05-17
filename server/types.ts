export type GitHubContent = {
  type: 'file' | 'dir' | 'symlink' | 'submodule';
  path: string;
  name: string;
  download_url?: string | null;
};

export type RepositoryFile = {
  path: string;
  name: string;
  content: string;
};

export type DependencyEdge = {
  source: string;
  target: string;
};

export type GraphNode = {
  id: string;
  label: string;
  importCount: number;
};

export type Graph = {
  nodes: GraphNode[];
  edges: DependencyEdge[];
};
