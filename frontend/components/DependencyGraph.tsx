'use client';

import ReactFlow, { Background, Controls, MarkerType } from 'reactflow';
import 'reactflow/dist/style.css';
import type { Graph } from '../lib/types';

type Props = {
  graph: Graph;
};

export default function DependencyGraph({ graph }: Props) {
  const columnCount = 4;
  const xSpacing = 220;
  const ySpacing = 130;

  const nodes = graph.nodes.map((node, index) => ({
    id: node.id,
    data: {
      label: (
        <div className="flex flex-col gap-1 rounded-2xl border border-slate-700 bg-slate-950/90 px-3 py-2 text-left text-sm text-slate-100 shadow-sm">
          <span className="font-semibold text-slate-100">{node.label}</span>
          <span className="text-xs text-slate-400">Imported {node.importCount} times</span>
        </div>
      ),
    },
    position: {
      x: (index % columnCount) * xSpacing,
      y: Math.floor(index / columnCount) * ySpacing,
    },
    style: {
      width: 200,
      borderRadius: 24,
      border: '1px solid #334155',
      background: '#020617',
    },
  }));

  const edges = graph.edges.map((edge, index) => ({
    id: `edge-${index}`,
    source: edge.source,
    target: edge.target,
    markerEnd: { type: MarkerType.ArrowClosed },
    animated: true,
    style: { stroke: '#38bdf8' },
  }));

  return (
    <div className="h-[520px] w-full overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/95 shadow-xl">
      <ReactFlow nodes={nodes} edges={edges} fitView fitViewOptions={{ padding: 0.5 }} />
      <Background gap={20} color="#334155" />
      <Controls showInteractive={false} />
    </div>
  );
}
