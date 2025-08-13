# Paper Trading API

FastAPI backend for a paper-trading app. Includes JWT auth, Postgres via SQLAlchemy, and Alembic migrations.

## Tech
- FastAPI, Uvicorn
- SQLAlchemy, Alembic
- Postgres (Docker)
- Pydantic
- JWT (python-jose), password hashing (passlib[bcrypt])

## Quick Start

### 1) Infra
```bash
docker compose up -d
