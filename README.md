# RepoVision MVP

A simple AI-powered GitHub repository analysis tool.

This project contains a lightweight Express backend and a Next.js frontend. The backend fetches JavaScript/TypeScript files from GitHub, extracts local dependencies, builds a dependency graph, and uses OpenRouter to generate a beginner-friendly explanation.

## Folder structure

- `server/`
  - `github/` — GitHub repository fetcher and recursive traversal
  - `parser/` — dependency extraction logic
  - `graph/` — graph builder and important-file detection
  - `ai/` — OpenRouter summary integration
  - `index.ts` — Express API service
- `frontend/`
  - `app/` — Next.js pages and layout
  - `components/` — React Flow visualization
  - `lib/` — shared types

## How it works

### Backend flow

1. Parse GitHub URL into `owner` and `repo`.
2. Use the GitHub Contents API to traverse folders recursively.
3. Filter only `.js`, `.jsx`, `.ts`, `.tsx` files and skip `node_modules`, build folders, and images.
4. Download each file content using `download_url`.
5. Extract local import relationships with a simple regex-based parser.
6. Build `nodes` and `edges` for a dependency graph.
7. Detect central files by import count.
8. Send a compact summary to OpenRouter for an AI explanation.

### Frontend flow

1. User enters a GitHub repo URL.
2. The page sends a POST request to `/api/analyze` on the backend.
3. The backend returns a graph plus AI explanation.
4. The app renders the graph with React Flow and displays important files.

## Setup

1. Install dependencies

```bash
npm install
```

2. Start the backend and frontend separately

```bash
npm run dev:backend
npm run dev:frontend
```

Or start both together:

```bash
npm run dev
```

3. Open the frontend at:

```bash
http://localhost:3000
```

4. The backend runs at:

```bash
http://localhost:4000
```

## Environment variables

- `OPENROUTER_API_KEY` — required for AI summaries
- `GITHUB_TOKEN` — optional to increase GitHub API rate limits

## Notes

- This MVP only supports JavaScript/TypeScript repositories.
- It does not include authentication or teams.
- It is intentionally simple and built for fast iteration.

# 5. Tech Stack Intelligence

RepoVision identifies:

* frontend frameworks
* backend frameworks
* CSS systems
* databases
* cloud providers
* package managers
* analytics tools
* authentication systems
* infrastructure configuration

### Supported Technologies

#### Frontend

* React
* Next.js
* Vue
* Nuxt
* Angular
* Svelte

#### Backend

* Express
* Fastify
* NestJS
* Django
* Flask
* Laravel

#### Databases

* PostgreSQL
* MySQL
* MongoDB
* Firebase
* Redis

---

# 6. Dead Code Detection

Automatically identify:

* unused files
* orphan components
* unreachable utilities
* duplicate functions
* unused exports

This helps:

* reduce technical debt
* optimize repositories
* improve maintainability

---

# 7. API Flow Visualization

Track how APIs move across the application.

### Visualize

* frontend → backend calls
* middleware execution
* authentication flow
* database interactions
* response chains

Useful for:

* debugging
* onboarding
* performance analysis

---

# 8. Security Insights

RepoVision scans repositories for:

* exposed secrets
* unsafe patterns
* dangerous dependencies
* vulnerable packages
* insecure configurations

### Example Warnings

```txt
Potential API key exposed in:
.env.example

Unsafe eval() usage detected in:
utils/parser.js
```

---

# 9. Architecture Layer Mapping

Automatically classify files into layers:

* UI
* Business Logic
* APIs
* Database
* Utilities
* Authentication
* Configuration

This gives developers a clearer understanding of system structure.

---

# 10. MVP Demo

A simple MVP has been added to this repository to validate the RepoVision idea.

## What it includes

* a lightweight React + Vite frontend
* GitHub repo URL input
* instant mock analysis cards for tech stack, file count, key files, and AI-style summary
* easy expandability for real repository scanning later

## Run locally

```bash
npm install
npm run dev
```

Then open the URL shown in the terminal.

## Files to explore

* `index.html`
* `src/App.tsx`
* `src/main.tsx`
* `src/styles.css`

This MVP is a simple starting point for the full RepoVision product.

# 10. Repository Timeline

Visualize repository evolution.

### Includes

* commit activity
* contributor heatmaps
* architecture growth
* major dependency additions
* feature expansion timeline

---

# How It Works

## Analysis Pipeline

```txt
GitHub Repository
        ↓
Repository Cloning
        ↓
AST Parsing
        ↓
Dependency Extraction
        ↓
Relationship Mapping
        ↓
Graph Generation
        ↓
AI Analysis
        ↓
Interactive Visualization
```

---

# Tech Stack

## Frontend

### Core

* Next.js
* TypeScript
* Tailwind CSS

### Animation & UI

* Framer Motion
* React Flow
* D3.js

### Visualization

* Cytoscape.js
* SVG Graph Rendering

---

# Backend

* Node.js
* Express
* Hono

---

# Parsing & Analysis

### AST Engines

* Tree-sitter
* Babel Parser
* TypeScript Compiler API

### Analysis Features

* import graph extraction
* dependency mapping
* circular dependency detection
* static analysis

---

# AI Layer

* OpenAI API
* Vector embeddings
* Repository chunk indexing
* RAG architecture

---

# Folder Structure

```txt
repo-vision/
│
├── app/
├── components/
├── engine/
│   ├── parser/
│   ├── graph/
│   ├── ai/
│   └── analyzer/
│
├── server/
├── public/
├── styles/
├── utils/
└── types/
```

---

# Example Workflow

## Step 1

Paste repository URL

```txt
https://github.com/example/project
```

## Step 2

RepoVision clones and analyzes repository

## Step 3

Generate:

* dependency graph
* architecture map
* stack analysis
* AI explanation

## Step 4

Explore visually

Click any node to inspect:

* imports
* exports
* connected modules
* risk analysis

---

# Use Cases

## Open Source Learning

Understand large repositories quickly.

## Developer Onboarding

Reduce onboarding time from days to hours.

## Refactoring

Safely identify dependency impact before modifying code.

## Interview Preparation

Study advanced architectures visually.

## Debugging

Trace dependency chains and hidden failures.

## Security Audits

Find unsafe configurations and vulnerable patterns.

## Teaching

Help students learn architecture visually.

---

# Future Roadmap

## Phase 1 — MVP

* GitHub repository input
* dependency graph
* stack detection
* AI repository explanation

## Phase 2

* dead code detection
* impact analysis
* API visualization
* circular dependency alerts

## Phase 3

* real-time collaboration
* VSCode extension
* GitHub App integration
* pull request intelligence

## Phase 4

* AI refactor suggestions
* architecture optimization
* automated documentation
* repository health scoring

---

# Why RepoVision Is Different

Most tools:

* only visualize graphs
* only detect technologies
* only scan dependencies

RepoVision combines:

* visualization
* AI reasoning
* architecture intelligence
* dependency impact analysis

into one integrated developer platform.

---

# Performance Goals

* Fast repository parsing
* Smooth graph rendering
* Lazy-loaded architecture nodes
* Large repository support
* Optimized memory usage

---

# Security & Privacy

RepoVision:

* never modifies repositories
* performs read-only analysis
* supports local/private deployments
* supports offline self-hosted mode

---

# Open Source Vision

The long-term vision is to make software architecture understandable to everyone.

Codebases should not feel like black boxes.

RepoVision transforms repositories into:

* visual systems
* explorable maps
* understandable architectures

---

# Installation

## Clone Repository

```bash
git clone https://github.com/your-username/repo-vision.git
```

## Install Dependencies

```bash
npm install
```

## Start Development Server

```bash
npm run dev
```

---

# Environment Variables

```env
OPENAI_API_KEY=
GITHUB_TOKEN=
DATABASE_URL=
```

---

# Contributing

Contributions are welcome.

Areas to contribute:

* parser engines
* graph optimization
* visualization systems
* AI explanations
* security analysis
* performance improvements

---

# Inspiration

RepoVision is inspired by:

* software architecture diagrams
* neural networks
* intelligence systems
* graph databases
* developer tooling ecosystems

---

# Vision Statement

> “Understanding a repository should feel like exploring a living map, not reading disconnected files.”

---

# License

MIT License

---

# Author

Built with a focus on:

* developer intelligence
* architecture clarity
* visual understanding
* AI-assisted engineering

---

# Final Goal

Turn every repository into an interactive knowledge graph.
#   r e p o v i s i o n 
 
 