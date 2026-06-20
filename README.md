# Treasury Guard

Treasury Guard is an on-chain treasury monitoring and approval platform combining Solidity smart contracts, a Django + Celery backend that polls on-chain events, and a React + Vite frontend. It is designed to help founders and investors monitor treasury outflows, detect risky transfers, and manage approval workflows for vendor payments.

This repository contains three main parts:

- `contracts/` and Hardhat artifacts: Solidity contracts and Hardhat deployment/test scripts.
- `backend/`: Django REST API, Celery tasks for polling blockchain events, and simple integrations.
- `frontend/`: React (Vite) + Tailwind UI for Founder and Investor views.

This README explains how to run the project locally, what the components do, and how to extend them.

**Quick links**

- Backend root: [backend/](backend)
- Frontend root: [frontend/](frontend)
- Contracts: [contracts/](contracts) and Hardhat artifacts in `artifacts/`

**Status**

This project is an in-progress prototype. Contracts and tests exist and the backend and frontend are scaffolded and integrated for local development. Some integrations (Anthropic, production-grade key management) are scaffolded or partially implemented.

---

## Architecture Overview

- Smart contracts (Hardhat): `TreasuryFactory` deploys per-business `TreasuryWallet` contracts. Contracts emit events for deposits and payouts.
- Backend (Django + DRF): stores `Business`, `Transaction`, `RiskFlag`, and `Vendor` models. A Celery task polls the chain (via `web3.py`) for contract events and creates `Transaction` and `RiskFlag` records.
- Frontend (React + Vite + Tailwind): Founder dashboard, Investor portfolio, Transaction explorer, Vendor management, Rules & Risk pages.

## Prerequisites

- Node.js >= 18 and npm
- Python 3.10+ (or 3.8+ depending on your environment)
- Redis (for Celery broker) — optional for local testing but required for background workers
- Hardhat dependencies (for contract testing and local chain)

## Local development - Backend

1. Create a Python virtual environment and install dependencies:

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

2. Create `.env` or supply env vars (see `treasury_guard_backend/settings.py`). Important vars:

- `DATABASE_URL` (defaults to sqlite)
- `DJANGO_SECRET_KEY`
- `CELERY_BROKER_URL` (e.g. `redis://localhost:6379/0`)
- `WEB3_RPC_URL` (e.g. local Hardhat node)
- `ENCRYPTION_KEY` (passphrase used to derive Fernet key)

3. Run migrations and start the server:

```bash
cd backend
source .venv/bin/activate
python manage.py migrate
python manage.py runserver 0.0.0.0:8000
```

4. (Optional) Seed a test Business via API or the Django admin.

## Local development - Frontend

1. Install dependencies and run Vite:

```bash
cd frontend
npm install
npm run dev
```

2. The app runs at `http://localhost:5173` by default. API calls are proxied to `VITE_API_URL` configured in the frontend or will target `http://localhost:8000` by default.

## Contracts (Hardhat)

Contracts live in `contracts/` and compiled artifacts are in `artifacts/` and `build-info/` (committed for convenience). To run tests or deploy to a local Hardhat node:

```bash
npm install
npx hardhat test
npx hardhat node
npx hardhat run --network localhost scripts/deploy_local.js
```

See `scripts/` for example deployment scripts (`deploy_local.js`, `deploy_fuji.js`).

## Celery / Background Poller

The backend contains a Celery app for polling on-chain events (`backend/treasury/tasks.py` / `backend/risk/tasks.py`). To run a worker locally (requires Redis configured):

```bash
cd backend
source .venv/bin/activate
celery -A treasury_guard_backend worker --loglevel=info
```

To enable periodic scheduling use `celery beat` (not configured by default in the prototype).

## API Endpoints (selected)

- `GET /api/businesses/` — list businesses
- `POST /api/businesses/create/` — create business (supply `name`, `owner_email`, optional `private_key`)
- `GET /api/treasury/transactions/?business_id=<id>` — list transactions
- `GET, POST /api/treasury/vendors/?business_id=<id>` — list or add vendors
- `GET, POST /api/risk/flags/?business_id=<id>` — list or create risk flags
- `PATCH /api/risk/flags/<id>/` — mark `reviewed` or update a flag

Use the running Django server to explore the API.

## Running Tests

- Backend: run Django tests (if present) from `backend/`:

```bash
cd backend
source .venv/bin/activate
python manage.py test
```

- Frontend: run unit and lint tasks (if configured):

```bash
cd frontend
npm test
npm run lint
```

## Development notes & TODOs

- The `reviewed` boolean on `RiskFlag` was added to persist frontend review actions.
- The vendors endpoint supports listing by `business_id` — the frontend `VendorList` uses this to fetch allowlisted addresses.
- Anthropic integration and advanced risk scoring are scaffolded but not fully wired into production workflows.

Planned improvements:

- Add role-based access control and approval workflows.
- Harden private key storage (move to an HSM/KMS for production).
- Add Celery beat + monitoring for reliable polling and retries.

## Contributing

Contributions are welcome. Recommended workflow:

1. Fork the repository and create a branch for your feature.
2. Run tests and linters locally.
3. Open a pull request with a clear description and changelog.

Please avoid committing build artifacts like `node_modules/` or local `db.sqlite3` — a `.gitignore` is included for this repository.

## License

This repository does not currently include a license file. Add a `LICENSE` if you plan to open-source the project.

---

If you'd like, I can also:

- Add step-by-step screenshots for the frontend pages.
- Add a `Makefile` / `dev` script to simplify common commands.
- Create GitHub Actions workflow for linting, tests, and pushing artifacts.

Which of these would you like next?
# Treasury_Guard
