export type GraphNode = {
  id: string;
  label: string;
  importCount: number;
};

export type GraphEdge = {
  source: string;
  target: string;
};

export type Graph = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};
