# CI/CD and Development Workflows

## Overview

This document outlines the continuous integration, deployment, and development workflows that support the automated documentation system, ensuring high quality and reliability.

## GitHub Actions Workflows

### Incremental Documentation Update

```yaml
# .github/workflows/documentation-incremental.yml
name: Incremental Documentation Update

on:
  push:
    paths:
      - 'packages/ui-kit/components/**/*.tsx'
      - 'packages/ui-kit/hooks/**/*.ts'
      - 'packages/ui-kit/lib/**/*.ts'
      - 'packages/playground/src/samples/**/*.tsx'
  pull_request:
    paths:
      - 'packages/ui-kit/components/**/*.tsx'
      - 'packages/ui-kit/hooks/**/*.ts'
      - 'packages/ui-kit/lib/**/*.ts'

env:
  NODE_VERSION: '18'
  PNPM_VERSION: '8'

jobs:
  check-changes:
    runs-on: ubuntu-latest
    outputs:
      outdated-components: ${{ steps.version-check.outputs.outdated }}
      has-changes: ${{ steps.version-check.outputs.has-changes }}
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Check component versions
        id: version-check
        run: |
          echo "Checking for outdated documentation..."
          OUTDATED=$(pnpm docs:version-check --json --changed-only)
          echo "outdated=$OUTDATED" >> $GITHUB_OUTPUT
          
          if [ "$OUTDATED" != "[]" ]; then
            echo "has-changes=true" >> $GITHUB_OUTPUT
            echo "Found outdated components:"
            echo "$OUTDATED" | jq -r '.[].component'
          else
            echo "has-changes=false" >> $GITHUB_OUTPUT
            echo "All documentation is up to date"
          fi

  update-documentation:
    needs: check-changes
    if: needs.check-changes.outputs.has-changes == 'true'
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3
        with:
          token: ${{ secrets.GITHUB_TOKEN }}

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: ${{ env.NODE_VERSION }}

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: ${{ env.PNPM_VERSION }}

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Update outdated documentation
        run: |
          echo "Updating documentation for changed components..."
          pnpm docs:update-outdated --verbose

      - name: Validate updated documentation
        run: |
          echo "Validating updated documentation..."
          pnpm docs:validate --changed-only

      - name: Run documentation tests
        run: |
          echo "Running documentation tests..."
          pnpm test:docs --changed-only

      - name: Update MCP server cache
        run: |
          echo "Refreshing MCP server cache..."
          pnpm mcp:refresh --incremental

      - name: Commit changes
        if: github.event_name == 'push'
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          
          if git diff --quiet; then
            echo "No changes to commit"
          else
            git add docs/
            git commit -m "docs: automated documentation update for component changes

            🤖 Generated with Claude Code

            Co-Authored-By: Claude <noreply@anthropic.com>"
            git push
          fi

      - name: Create pull request
        if: github.event_name == 'pull_request'
        uses: peter-evans/create-pull-request@v5
        with:
          token: ${{ secrets.GITHUB_TOKEN }}
          commit-message: |
            docs: automated documentation update for PR changes
            
            🤖 Generated with Claude Code
            
            Co-Authored-By: Claude <noreply@anthropic.com>
          title: 'docs: automated documentation update for PR #${{ github.event.number }}'
          body: |
            ## Automated Documentation Update
            
            This PR contains automated documentation updates for component changes.
            
            **Updated Components:**
            ${{ needs.check-changes.outputs.outdated-components }}
            
            ### Changes Made
            - ✅ Updated component documentation for version changes
            - ✅ Validated all code examples
            - ✅ Updated MCP server cache
            - ✅ Ran documentation tests
            
            🤖 Generated with [Claude Code](https://claude.ai/code)
          branch: docs/auto-update-pr-${{ github.event.number }}
          delete-branch: true

  notify-status:
    needs: [check-changes, update-documentation]
    if: always()
    runs-on: ubuntu-latest
    steps:
      - name: Notify Slack on success
        if: needs.update-documentation.result == 'success'
        uses: 8398a7/action-slack@v3
        with:
          status: success
          text: |
            ✅ Documentation successfully updated for component changes
            Updated: ${{ needs.check-changes.outputs.outdated-components }}
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}

      - name: Notify Slack on failure
        if: needs.update-documentation.result == 'failure'
        uses: 8398a7/action-slack@v3
        with:
          status: failure
          text: |
            ❌ Documentation update failed
            Please check the workflow logs for details
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Documentation Quality Assurance

```yaml
# .github/workflows/documentation-qa.yml
name: Documentation Quality Assurance

on:
  schedule:
    - cron: '0 2 * * *'  # Daily at 2 AM UTC
  workflow_dispatch:

jobs:
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: '8'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run comprehensive documentation validation
        run: |
          echo "🔍 Running comprehensive documentation validation..."
          pnpm docs:validate --all --verbose

      - name: Check documentation coverage
        run: |
          echo "📊 Checking documentation coverage..."
          pnpm docs:coverage --format=json > coverage-report.json

      - name: Validate all code examples
        run: |
          echo "✅ Validating all code examples..."
          pnpm docs:validate-examples --all

      - name: Check link integrity
        run: |
          echo "🔗 Checking link integrity..."
          pnpm docs:check-links --all

      - name: Run accessibility tests
        run: |
          echo "♿ Running accessibility tests..."
          pnpm docs:a11y-check --all

      - name: Generate quality report
        run: |
          echo "📋 Generating quality report..."
          pnpm docs:quality-report --format=markdown > quality-report.md

      - name: Upload quality report
        uses: actions/upload-artifact@v3
        with:
          name: quality-report
          path: |
            quality-report.md
            coverage-report.json

      - name: Create issue for quality issues
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            const fs = require('fs');
            const report = fs.readFileSync('quality-report.md', 'utf8');
            
            await github.rest.issues.create({
              owner: context.repo.owner,
              repo: context.repo.repo,
              title: `📋 Documentation Quality Issues - ${new Date().toISOString().split('T')[0]}`,
              body: `## Documentation Quality Report\n\n${report}\n\n🤖 Generated automatically by GitHub Actions`,
              labels: ['documentation', 'quality', 'automated']
            });
```

### MCP Server Deployment

```yaml
# .github/workflows/mcp-server-deploy.yml
name: MCP Server Deployment

on:
  push:
    branches: [main]
    paths:
      - 'packages/mcp-server/**'
      - 'docs/**'
  workflow_dispatch:

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: '8'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run MCP server tests
        run: |
          echo "🧪 Running MCP server tests..."
          pnpm --filter mcp-server test

      - name: Run integration tests
        run: |
          echo "🔗 Running integration tests..."
          pnpm test:integration

      - name: Validate MCP protocol compliance
        run: |
          echo "✅ Validating MCP protocol compliance..."
          pnpm mcp:validate-protocol

  build:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: '8'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build MCP server
        run: |
          echo "🏗️ Building MCP server..."
          pnpm --filter mcp-server build

      - name: Build documentation
        run: |
          echo "📚 Building documentation..."
          pnpm docs:build

      - name: Upload build artifacts
        uses: actions/upload-artifact@v3
        with:
          name: mcp-server-build
          path: |
            packages/mcp-server/dist/
            docs/dist/

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment: production
    steps:
      - name: Download build artifacts
        uses: actions/download-artifact@v3
        with:
          name: mcp-server-build

      - name: Deploy to production
        run: |
          echo "🚀 Deploying MCP server to production..."
          # Add deployment commands here

      - name: Health check
        run: |
          echo "🏥 Running health check..."
          curl -f http://localhost:3001/health || exit 1

      - name: Notify deployment status
        uses: 8398a7/action-slack@v3
        with:
          status: ${{ job.status }}
          text: |
            MCP Server deployment completed
            Status: ${{ job.status }}
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

## Pre-commit Hooks

### Husky Configuration

```bash
# .husky/pre-commit
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "🔍 Running pre-commit checks..."

# Check if any UI components changed
CHANGED_COMPONENTS=$(git diff --cached --name-only | grep -E "packages/ui-kit/components.*\.tsx$")

if [ -n "$CHANGED_COMPONENTS" ]; then
  echo "📝 UI components changed, checking documentation status..."
  
  # Extract versions from staged files
  echo "🔍 Extracting component versions..."
  pnpm docs:extract --staged
  
  # Check if documentation is up to date
  echo "📊 Checking documentation version consistency..."
  OUTDATED=$(pnpm docs:version-check --staged --json)
  
  if [ "$OUTDATED" != "[]" ]; then
    echo "⚠️  Documentation may be outdated for changed components:"
    echo "$OUTDATED" | jq -r '.[].component'
    echo ""
    echo "💡 Options to resolve:"
    echo "   1. Run 'pnpm docs:update-outdated' to update documentation"
    echo "   2. Update component versions manually"
    echo "   3. Use 'git commit --no-verify' to skip this check"
    echo ""
    echo "🚨 Commit blocked to prevent documentation drift"
    exit 1
  fi
  
  echo "✅ All documentation is up to date"
fi

# Validate staged documentation files
CHANGED_DOCS=$(git diff --cached --name-only | grep -E "docs/.*\.md$")

if [ -n "$CHANGED_DOCS" ]; then
  echo "📚 Documentation files changed, validating content..."
  
  # Validate documentation format
  echo "🔍 Validating documentation format..."
  pnpm docs:validate --staged
  
  # Check code examples in documentation
  echo "✅ Validating code examples..."
  pnpm docs:validate-examples --staged
  
  # Check for broken links
  echo "🔗 Checking for broken links..."
  pnpm docs:check-links --staged
  
  echo "✅ Documentation validation passed"
fi

# Run linting and type checking
echo "🧹 Running linting and type checking..."
pnpm lint-staged

echo "✅ All pre-commit checks passed"
```

### Lint-staged Configuration

```json
// package.json
{
  "lint-staged": {
    "packages/ui-kit/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "packages/mcp-server/**/*.{ts,tsx}": [
      "eslint --fix",
      "prettier --write"
    ],
    "docs/**/*.md": [
      "prettier --write",
      "pnpm docs:validate --files"
    ],
    "*.{json,yaml,yml}": [
      "prettier --write"
    ]
  }
}
```

## Development Scripts

### Package.json Scripts Configuration

```json
{
  "scripts": {
    "dev": "concurrently \"pnpm --filter ui-kit dev\" \"pnpm --filter playground dev\" \"pnpm --filter mcp-server dev\"",
    "build": "pnpm --filter ui-kit build && pnpm --filter playground build && pnpm --filter mcp-server build",
    
    "docs:watch": "nodemon --watch packages/ui-kit --ext tsx,ts --exec 'pnpm docs:update-outdated'",
    "docs:extract": "tsx packages/mcp-server/src/scripts/extract-metadata.ts",
    "docs:generate": "tsx packages/mcp-server/src/scripts/generate-docs.ts",
    "docs:update-outdated": "tsx packages/mcp-server/src/scripts/update-outdated.ts",
    "docs:version-check": "tsx packages/mcp-server/src/scripts/version-check.ts",
    "docs:validate": "tsx packages/mcp-server/src/scripts/validate-docs.ts",
    "docs:validate-examples": "tsx packages/mcp-server/src/scripts/validate-examples.ts",
    "docs:check-links": "tsx packages/mcp-server/src/scripts/check-links.ts",
    "docs:a11y-check": "tsx packages/mcp-server/src/scripts/a11y-check.ts",
    "docs:coverage": "tsx packages/mcp-server/src/scripts/coverage-report.ts",
    "docs:quality-report": "tsx packages/mcp-server/src/scripts/quality-report.ts",
    "docs:status": "tsx packages/mcp-server/src/scripts/status.ts",
    "docs:serve": "vite serve docs --port 3001",
    "docs:build": "vite build docs",
    
    "mcp:dev": "tsx packages/mcp-server/src/server.ts --watch",
    "mcp:build": "pnpm --filter mcp-server build",
    "mcp:start": "node packages/mcp-server/dist/server.js",
    "mcp:test": "pnpm --filter mcp-server test",
    "mcp:refresh": "tsx packages/mcp-server/src/scripts/refresh-cache.ts",
    "mcp:validate-protocol": "tsx packages/mcp-server/src/scripts/validate-protocol.ts",
    
    "test": "vitest run",
    "test:watch": "vitest",
    "test:docs": "vitest run packages/mcp-server/tests/documentation.test.ts",
    "test:integration": "vitest run packages/mcp-server/tests/integration.test.ts",
    
    "lint": "eslint . --ext .ts,.tsx --fix",
    "typecheck": "tsc --noEmit",
    "format": "prettier --write .",
    
    "clean": "rimraf **/node_modules **/dist",
    "reset": "pnpm clean && pnpm install"
  }
}
```

### Nodemon Configuration

```json
// nodemon.json
{
  "watch": ["packages/ui-kit/components", "packages/ui-kit/hooks", "packages/ui-kit/lib"],
  "ext": "ts,tsx",
  "ignore": ["**/node_modules/**", "**/dist/**", "**/*.test.*"],
  "exec": "pnpm docs:update-outdated",
  "delay": 2000,
  "verbose": true,
  "env": {
    "NODE_ENV": "development"
  }
}
```

## Monitoring and Alerting Workflows

### Health Check Workflow

```yaml
# .github/workflows/health-check.yml
name: System Health Check

on:
  schedule:
    - cron: '*/15 * * * *'  # Every 15 minutes
  workflow_dispatch:

jobs:
  health-check:
    runs-on: ubuntu-latest
    steps:
      - name: Check MCP server health
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" http://your-mcp-server.com/health)
          if [ $response -ne 200 ]; then
            echo "MCP server health check failed with status $response"
            exit 1
          fi

      - name: Check documentation site health
        run: |
          response=$(curl -s -o /dev/null -w "%{http_code}" http://your-docs-site.com)
          if [ $response -ne 200 ]; then
            echo "Documentation site health check failed with status $response"
            exit 1
          fi

      - name: Alert on failure
        if: failure()
        uses: 8398a7/action-slack@v3
        with:
          status: failure
          text: |
            🚨 System health check failed
            One or more services are down
        env:
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

### Performance Monitoring

```yaml
# .github/workflows/performance-monitoring.yml
name: Performance Monitoring

on:
  schedule:
    - cron: '0 0 * * *'  # Daily at midnight
  workflow_dispatch:

jobs:
  performance-check:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout repository
        uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Run performance benchmarks
        run: |
          echo "🏃 Running performance benchmarks..."
          pnpm perf:benchmark

      - name: Analyze bundle size
        run: |
          echo "📦 Analyzing bundle size..."
          pnpm build:analyze

      - name: Generate performance report
        run: |
          echo "📊 Generating performance report..."
          pnpm perf:report > performance-report.md

      - name: Upload performance report
        uses: actions/upload-artifact@v3
        with:
          name: performance-report
          path: performance-report.md

      - name: Check performance regressions
        run: |
          echo "🔍 Checking for performance regressions..."
          pnpm perf:regression-check
```

This comprehensive workflow setup ensures reliable, automated operation of the documentation system with proper quality gates, monitoring, and alerting mechanisms.