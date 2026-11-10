# DeploySentry

A GitHub Actions release-health dashboard for public repositories. Inspect workflow runs, monitor outcomes, search activity, and drill into jobs and steps.

## Features
- Public GitHub repository lookup
- Workflow run metrics and searchable history
- Status filtering and run detail inspection
- Job and step status visibility
- Responsive dark dashboard
- GitHub Pages deployment workflow
- No token or backend required for public repositories

## Local development
Requires Node.js 20+.

```bash
npm install
npm run dev
npm run test
npm run build
```

## Deploy to GitHub Pages
The included Actions workflow builds and deploys on pushes to `main`. In repository Settings → Pages, select **GitHub Actions** as the build and deployment source.

## API and security
Uses the public GitHub REST API for repository metadata, Actions workflow runs, and run jobs. Unauthenticated requests are rate-limited by GitHub. Private repositories require a secure server-side authentication layer; never expose a personal access token in client-side code or `VITE_` variables.

## License
MIT
