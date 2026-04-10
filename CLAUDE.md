# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

An AI Digital Twin — a chat interface that impersonates a specific person using AWS Bedrock (Amazon Nova models) as the LLM backend. The twin is personalized via data files in `backend/data/` and served through a FastAPI backend + Next.js 16 frontend, deployed on AWS via Terraform.

## Commands

### Backend (FastAPI)

```bash
cd backend
uv run server.py                  # Run dev server on port 8000
uv add <package>                  # Add a dependency
```

The backend requires AWS credentials configured locally and a `backend/data/` directory with:
- `facts.json` — structured personal facts
- `summary.txt` — narrative bio
- `style.txt` — communication style notes
- `linkedin.pdf` — LinkedIn profile (optional)

Environment variables (copy from example or set manually):
```
DEFAULT_AWS_REGION=us-east-1
BEDROCK_MODEL_ID=global.amazon.nova-2-lite-v1:0
USE_S3=false
MEMORY_DIR=../memory
```

### Frontend (Next.js)

```bash
cd frontend
npm run dev      # Dev server on port 3000
npm run build    # Static export to ./out
npm run lint     # ESLint
```

Set `NEXT_PUBLIC_API_URL` to point at the backend (defaults to `http://localhost:8000`).

### Full Deployment

```bash
./scripts/deploy.sh [environment] [project_name]
# e.g.: ./scripts/deploy.sh dev twin
```

This script: builds the Lambda zip (requires Docker), runs `terraform init/apply` in a workspace matching the environment, then builds the Next.js static export and syncs it to S3.

```bash
./scripts/destroy.sh [environment] [project_name]   # Tear down all infra
```

### Building Lambda Package Only

```bash
cd backend && uv run deploy.py    # Requires Docker (uses AWS Lambda Python 3.12 image for x86_64 compatibility)
```

## Architecture

```
frontend/           Next.js 16 static export (S3 + CloudFront)
backend/            FastAPI app, runs both locally (uvicorn) and on Lambda (via Mangum)
terraform/          All AWS infra (one module, workspace-per-environment)
scripts/            deploy.sh / destroy.sh orchestrate the full pipeline
memory/             Local conversation storage (JSON files, one per session_id)
```

### Backend Flow

- `server.py` — FastAPI app with `/chat`, `/health`, and `/conversation/{session_id}` endpoints
- `lambda_handler.py` — wraps the FastAPI app with `Mangum` for Lambda
- `context.py` — builds the system prompt by combining `resources.py` data
- `resources.py` — loads `data/facts.json`, `data/summary.txt`, `data/style.txt`, `data/linkedin.pdf` at import time
- Conversation memory is stored per `session_id` — either in local JSON files or S3 (`USE_S3=true`)
- LLM calls go through `bedrock_client.converse()` with the last 50 messages of history

### Frontend Flow

- `app/page.tsx` — server component, renders the `<Twin>` client component
- `components/twin.tsx` — the entire chat UI; `'use client'`, manages all state locally
- API URL is injected at build time via `NEXT_PUBLIC_API_URL`
- If `public/avatar.png` exists it is shown in the chat header; otherwise a bot icon is used

### Infrastructure (Terraform)

- **S3 (memory bucket)** — private, stores conversation JSON files
- **S3 (frontend bucket)** — public static website hosting
- **Lambda** — runs the FastAPI app via Mangum, Python 3.12 x86_64
- **API Gateway v2 (HTTP)** — routes `GET /`, `POST /chat`, `GET /health` to Lambda
- **CloudFront** — CDN in front of the frontend S3 bucket; optional custom domain via ACM + Route53
- Terraform state stored in S3 with DynamoDB locking (`twin-terraform-state-<account_id>`)
- Separate workspaces for `dev`, `test`, `prod`; `prod.tfvars` used for production

### Personalizing the Twin

Edit files in `backend/data/`:
- `facts.json` must contain at least `full_name` and `name` keys (used in the system prompt)
- `summary.txt` and `style.txt` are free-form text
- Replace `frontend/public/avatar.png` to set a custom avatar
