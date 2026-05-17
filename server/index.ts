import express from 'express';
import cors from 'cors';
import { parseRepoUrl, fetchRepoFiles, fetchFileContent } from './github/fetcher.ts';
import { buildDependencyGraph, getTopImportantFiles } from './graph/graphBuilder.ts';
import { getAiRepositorySummary } from './ai/openRouter.ts';
import type { RepositoryFile } from './types.ts';

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.post('/api/analyze', async (req, res) => {
  const repositoryUrl = String(req.body?.repositoryUrl ?? '').trim();

  if (!repositoryUrl) {
    return res.status(400).json({ error: 'repositoryUrl is required.' });
  }

  const repo = parseRepoUrl(repositoryUrl);
  if (!repo) {
    return res.status(400).json({ error: 'Provide a valid GitHub repository URL like https://github.com/vercel/next.js.' });
  }

  try {
    const files = await fetchRepoFiles(repo.owner, repo.repo);
    if (!files.length) {
      return res.status(404).json({ error: 'No JavaScript or TypeScript files were found in this repository.' });
    }

    const repositoryFiles: RepositoryFile[] = await Promise.all(
      files.map(async (file) => ({
        path: file.path,
        name: file.name,
        content: await fetchFileContent(String(file.download_url)),
      }))
    );

    const graph = buildDependencyGraph(repositoryFiles);
    const importantFiles = getTopImportantFiles(graph);
    const prompt = buildAiPrompt(repo.owner, repo.repo, repositoryFiles, graph, importantFiles);
    const aiSummary = await getAiRepositorySummary(prompt);

    return res.json({
      repoName: `${repo.owner}/${repo.repo}`,
      graph,
      importantFiles,
      aiSummary,
    });
  } catch (error: unknown) {
    console.error(error);
    const message = error instanceof Error ? error.message : 'Unexpected server error.';
    return res.status(500).json({ error: message });
  }
});

function buildAiPrompt(
  owner: string,
  repo: string,
  files: RepositoryFile[],
  graph: { nodes: { id: string; label: string; importCount: number }[]; edges: { source: string; target: string }[] },
  importantFiles: string[]
) {
  const sampleFiles = files.slice(0, 12).map((file) => `- ${file.path}`).join('\n');
  const sampleEdges = graph.edges.slice(0, 18).map((edge) => `- ${edge.source} → ${edge.target}`).join('\n');

  return `Explain this repository architecture like I'm a beginner.
Repository: ${owner}/${repo}
Files included: ${files.length}
Most important files: ${importantFiles.join(', ') || 'None detected'}

Top file examples:
${sampleFiles}

Dependency relationships:
${sampleEdges}

Please describe the overall structure, the most central files, and why those files are important.`;
}

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  console.log(`RepoVision backend running at http://localhost:${port}`);
});
