# Prathmesh Pimpalshende — Engineering Portfolio

A responsive, story-led portfolio focused on Linux, AWS infrastructure, and hands-on projects. Built as maintainable source code with a React + TypeScript frontend and a small Express API for the portfolio assistant.

## Stack

- React 19, TypeScript, Vite
- Tailwind CSS 4 for utility styling support, with a small custom CSS layer for the visual system
- Framer Motion for restrained section reveals; SVG/CSS for the lightweight AWS architecture diagram
- Lucide React icons
- Node.js, Express, TypeScript API
- Optional OpenAI API integration. The key stays on the server; without it, the assistant responds with verified demo answers.
- Vitest, React Testing Library, Node test runner

## Run locally

Requires Node.js 20 or newer.

```bash
npm install
npm run dev
```

The frontend runs at `http://localhost:5173`; the API runs at `http://localhost:3001`. The frontend development server proxies `/api` to the API.

Copy `.env.example` to `.env` for the local API configuration. Set `GROQ_API_KEY` to enable the Groq-powered assistant; without it the API returns verified demo answers. `GROQ_MODEL` defaults to `openai/gpt-oss-20b`. Keep the key on the backend and never commit it or add it to frontend environment variables.

## Build and checks

```bash
npm run typecheck
npm test
npm run build
```

Tests cover the safe terminal command registry, service explanations, and assistant fallback behavior.

## Structure

```text
frontend/
  public/                 Résumé download
  src/
    chatbot/              Recruiter assistant UI
    cloud-visualization/  Interactive CloudDataFlow SVG diagram
    components/           Shared UI components
    data/                 Editable portfolio content
    sections/             Story, work, skills, and contact sections
    terminal/             Whitelisted simulated Linux commands
    styles.css            Art-directed responsive styles
backend/
  src/
    knowledge-base/       Verified résumé/project context
    routes/               Assistant and health API
    services/             Demo and optional LLM response logic
```

Update names, links, projects, skills, and learning topics in `frontend/src/data/portfolio.ts`. Keep the backend knowledge source in `backend/src/knowledge-base/portfolio.ts` aligned with those verified details.

## Deployment

- Render: use the included `render.yaml` to create both services. The API is a Node web service and the frontend is a static site.
  1. In Render, choose **New → Blueprint**, connect this repository, and apply the blueprint.
  2. On `prathmesh-portfolio-api`, set `FRONTEND_ORIGIN` to the final frontend URL, for example `https://prathmesh-portfolio.onrender.com`.
  3. On `prathmesh-portfolio`, set `VITE_API_BASE_URL` to the API URL, for example `https://prathmesh-portfolio-api.onrender.com`. Because this is a Vite build variable, trigger a new deploy after changing it.
  4. Optionally set `GROQ_API_KEY` and `GROQ_MODEL` on the API service. Without a key, the assistant remains in demo mode.
  5. Verify the API at `/api/health`, then open the frontend and test the assistant.
- Vercel alternative: the included `vercel.json` builds the frontend workspace and serves the Vite output. Set `VITE_API_BASE_URL` to the deployed API origin and set `FRONTEND_ORIGIN` on the API to the Vercel URL.
- Domain: point `prathmeshcloud.site` to the frontend host using the DNS records provided by that host. Domain ownership/records have not been configured by this project.

The portfolio currently describes only facts supported by the supplied résumé, local Unreel project documentation, and public GitHub repository details. The Moodle project was omitted because it does not appear in the supplied résumé or the inspected project information.
