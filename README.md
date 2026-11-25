# Igitabo

Igitabo is a full-stack raw-material supply platform for Rwanda. It connects:

- cooperatives that publish materials and respond to requests;
- manufacturers that search listings, find matching suppliers, and send requests;
- administrators that review and verify cooperatives.

The backend is built with FastAPI, SQLAlchemy, PostgreSQL, JWT authentication, and bcrypt password hashing. The frontend is a static HTML/CSS/JavaScript application served by FastAPI.

## Features

- Cooperative and manufacturer registration
- JWT login and role-based access control
- Cooperative profile management
- Material listing creation, editing, and deletion
- Material search and availability filtering
- Supplier matching based on material, quantity, and location
- Cooperative and manufacturer request dashboards
- Cooperative verification by administrators
- English interface with optional Kinyarwanda translation

## User guide

### Open Igitabo

Open the Igitabo website in a browser. The landing page allows users to create an account or log in.

Use an account with the role that matches the work you need to perform:

- **Cooperative**: publish raw materials and answer manufacturer requests.
- **Manufacturer**: search suppliers, match suppliers, and send requests.
- **Administrator**: verify cooperative accounts.

### Register an account

1. Open the Igitabo landing page.
2. Select **Register**.
3. Select **Cooperative** or **Manufacturer**.
4. Enter a name, email address, password, location, and phone number.
5. Manufacturers should also enter their company name.
6. Select **Create account**.

Passwords must contain at least eight characters. Use a unique password that you do not use for another service.

After registration, Igitabo signs you in and opens the dashboard for your selected role.

### Log in

1. Open the Igitabo landing page.
2. Select **Log in**.
3. Enter the registered email address and password.
4. Select the login button.

Igitabo redirects the account to the dashboard for its role. If an account is already logged in, opening the landing page redirects it to the appropriate dashboard.

### Use the Kinyarwanda interface

Use the **EN** or **RW** language buttons near the navigation area to switch the interface language.

The language choice is saved in the browser and restored when the page is reopened.

### Cooperative guide

#### Complete the profile

1. Open the **Profile** section.
2. Enter the cooperative location or district.
3. Enter the cooperative phone number.
4. Select **Save profile**.

The profile card shows the cooperative name, email address, role, verification status, listings count, pending request count, and accepted request count.

Cooperatives remain **Pending** until an administrator verifies them. Pending cooperatives cannot make their listings visible to manufacturers.

#### Add a material listing

1. Open the **Listings** section.
2. Enter the material name.
3. Select a category.
4. Enter the available quantity in kilograms.
5. Enter the price in RWF per kilogram.
6. Enter the cooperative location or district.
7. Select **Save listing**.

Availability is calculated automatically:

- **Available**: quantity is above the low-stock limit.
- **Low**: quantity is above zero but at or below the low-stock limit.
- **Out of stock**: quantity is zero.

#### Edit or delete a listing

To edit a listing:

1. Find the listing in **My listings**.
2. Select **Edit**.
3. Change the listing fields.
4. Select **Save listing**.

To delete a listing:

1. Find the listing in **My listings**.
2. Select **Delete**.
3. Confirm the browser deletion prompt.

#### Respond to manufacturer requests

1. Open the **Incoming requests** section.
2. Review the material, quantity, manufacturer, date, and optional message.
3. Select **Accept** or **Reject**.

Accepted and rejected requests remain visible in the request history. A request cannot normally be answered twice.

### Manufacturer guide

#### Review the manufacturer profile

Open the **Profile** section to view the company or account name, email address, role, total requests, pending requests, and accepted requests.

#### Search for listings

1. Open **Find suppliers**.
2. Enter an optional material name.
3. Select an optional category.
4. Enter an optional location.
5. Select an optional availability status.
6. Select **Search**.

Only listings from verified cooperatives are shown.

Use fewer filters if the initial search returns no results.

#### Match suppliers to a required quantity

1. Open **Match suppliers to my need**.
2. Enter the material name.
3. Enter the required quantity in kilograms.
4. Optionally enter a preferred district.
5. Select **Find matches**.

Igitabo shows verified cooperatives that have enough material for the request. Matches with the preferred location and higher stock receive a higher match score.

#### Send a material request

1. Find a listing in search or match results.
2. Select **Send request**.
3. Enter the quantity requested.
4. Optionally enter a message for the cooperative.
5. Select **Send request**.

The quantity cannot exceed the listing's available quantity. The cooperative can later accept or reject the request.

#### Track requests

Open **My requests** to view:

- the requested material;
- the cooperative;
- the quantity;
- the request date;
- the status.

Status meanings:

- **Pending**: the cooperative has not responded.
- **Accepted**: the cooperative accepted the request.
- **Rejected**: the cooperative rejected the request.

### Administrator guide

Administrators verify cooperatives through the **Verify cooperatives** page.

#### Review cooperative accounts

1. Log in with an administrator account.
2. Open **Cooperatives**.
3. Use **Show** to select:
   - pending cooperatives;
   - verified cooperatives;
   - all cooperatives.

Review the cooperative name, email, location, phone, registration date, and status.

#### Verify a cooperative

1. Select a cooperative with **Pending** status.
2. Review its details.
3. Select **Verify**.

After verification, the cooperative status changes to **Verified** and its listings become visible to manufacturers through search and matching.

### Log out

Select **Log out** in the top navigation area.

Igitabo removes the local login session and returns the browser to the landing page.

## Project structure

```text
api/
  index.py                  Vercel-style application entry point
backend/app/
  config.py                 Environment and application settings
  database.py               SQLAlchemy engine and database session
  deploy.py                 FastAPI app initialization and static frontend mounting
  models/schemas.py         Database models and Pydantic request/response models
  routers/                  HTTP route definitions
  services/                 Authentication and business logic
  seeds.py                  Administrator and demo-data seeds
frontend/
  *.html                    Role-specific pages
  scripts/                  Frontend JavaScript
  styles/                   Shared CSS
requirements.txt            Runtime dependencies
requirement-dev.txt         Development tools
```

## Requirements

- Python 3.10 or newer
- PostgreSQL
- A Python virtual-environment tool
- Git

## PostgreSQL setup

You can use a local PostgreSQL server or a hosted provider such as Neon.

1. Create a PostgreSQL database.
2. Copy the database connection URL.
3. Set `DATABASE_URL` in the terminal or in a local `.env` file.

PostgreSQL URL formats supported by the application include:

```text
postgresql://user:password@host:5432/database
postgres://user:password@host:5432/database
```

The application automatically normalizes PostgreSQL URLs to use `psycopg2`.

Do not commit database passwords or the `.env` file.

## Local installation

### 1. Clone the repository

```powershell
git clone <repository-url>
cd Igitabo
```

Replace `<repository-url>` with the URL of this repository.

### 2. Create and activate a virtual environment

Windows PowerShell:

```powershell
py -m venv .venv
.\.venv\Scripts\Activate.ps1
```

If PowerShell blocks script execution, enable it for the current process:

```powershell
Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
.\.venv\Scripts\Activate.ps1
```

macOS or Linux:

```bash
python3 -m venv .venv
source .venv/bin/activate
```

### 3. Install dependencies

```powershell
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
python -m pip install -r requirement-dev.txt
```

## Environment variables

Create a `.env` file in the repository root. `.env` is ignored by Git.

```dotenv
DATABASE_URL=postgresql://user:password@host:5432/database
SECRET_KEY=replace-with-a-long-random-secret
TOKEN_HOURS=8
LOW_STOCK_LIMIT=100
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=replace-with-a-secure-password
SEED_DEMO=0
```

Variable details:

| Variable | Required | Default | Purpose |
|---|---:|---|---|
| `DATABASE_URL` | Yes | None | PostgreSQL connection URL |
| `SECRET_KEY` | Production: yes | Development-only value | Signs JWT access tokens |
| `TOKEN_HOURS` | No | `8` | Access-token lifetime in hours |
| `LOW_STOCK_LIMIT` | No | `100` | Quantity at or below which listings are marked Low |
| `ADMIN_EMAIL` | No | `admin@igitabo.local` | Administrator account email |
| `ADMIN_PASSWORD` | Production: yes | `Changeme` | Initial administrator password |
| `SEED_DEMO` | No | `0` | Set to `1` once to seed demo accounts and listings |
| `RENDER` | No | Unset | Set automatically by Render; enables production environment checks |

Generate a suitable secret with one of these commands:

```powershell
python -c "import secrets; print(secrets.token_urlsafe(48))"
```

On Windows PowerShell, environment variables can instead be set for the current terminal:

```powershell
$env:DATABASE_URL="postgresql://user:password@host:5432/database"
$env:SECRET_KEY="replace-with-a-long-random-secret"
$env:ADMIN_PASSWORD="replace-with-a-secure-password"
```

To load `.env` automatically with uvicorn, install a dotenv loader or export the variables in your shell before startup. The application itself reads process environment variables.

## Database initialization

On the first application startup, SQLAlchemy creates the database tables. The application also creates an administrator account.

Use `SEED_DEMO=1` when a demonstration database is needed. The demo seed creates:

- five cooperative accounts;
- three manufacturer accounts;
- twenty material listings;
- one pending cooperative for administrator verification.

The demo seeding function exits without duplicating data if cooperative records already exist.

Demo account password:

```text
Demo12345
```

The demo accounts use addresses such as `coop1@igitabo.demo` and `maker1@igitabo.demo`. Change or remove demo data before production use.

## Run the application locally

Set `DATABASE_URL` and the other required environment variables, activate the virtual environment, then run:

```powershell
python -m uvicorn backend.app.deploy:app --host 127.0.0.1 --port 8000 --reload
```

Open:

- Application: `http://127.0.0.1:8000`
- API health check: `http://127.0.0.1:8000/api/health`
- Interactive API documentation: `http://127.0.0.1:8000/docs`

FastAPI serves both the API and the static frontend from the application process.

## API overview

| Area | Routes |
|---|---|
| Authentication | `/api/auth/register`, `/api/auth/login`, `/api/auth/me` |
| Cooperatives | `/api/cooperative/profile`, `/api/listings/mine` |
| Listings | `/api/listings`, `/api/listings/search` |
| Supplier matching | `/api/match` |
| Requests | `/api/requests`, `/api/requests/{request_id}/respond` |
| Administration | `/api/admin/cooperatives`, `/api/admin/cooperatives/{coop_id}/verify` |
| Content | `/api/content/options`, `/api/content/help` |
| Health | `/api/health` |

Protected routes require this header:

```text
Authorization: Bearer <access-token>
```

## Default administrator

The administrator account is created from `ADMIN_EMAIL` and `ADMIN_PASSWORD`.

Defaults:

```text
Email: admin@igitabo.local
Password: Changeme
```

Always replace both values in production. Never leave `Changeme` active in a deployed environment.

## Testing

Run tests from the repository root:

```powershell
python -m pytest
```

Before testing, set `DATABASE_URL` to a separate test database or a disposable PostgreSQL database. Tests should not use the production database.

For a syntax and startup check:

```powershell
python -m compileall -q api backend
python -m uvicorn backend.app.deploy:app --host 127.0.0.1 --port 8000
```

Stop the local server with `Ctrl+C`.

## Vercel deployment

When deploying on Vercel:

1. Add `DATABASE_URL`, `SECRET_KEY`, `TOKEN_HOURS`, `LOW_STOCK_LIMIT`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` to the Vercel project environment variables.
2. Set `SEED_DEMO=0` unless demo data is intentionally required.
3. Import the repository in Vercel.
4. Deploy the project.

The entry point is `api/index.py`. It imports the FastAPI app created by `backend/app/deploy.py`.

Because `SECRET_KEY` and `ADMIN_PASSWORD` are read at startup, replace all development defaults before deployment.

## Render deployment

Create a PostgreSQL database and a Render Web Service for this repository.

1. Set the web-service runtime to Python.
2. Set the build command to:

   ```text
   pip install -r requirements.txt
   ```

3. Set the start command to:

   ```text
   uvicorn backend.app.deploy:app --host 0.0.0.0 --port $PORT
   ```

4. Add these environment variables:

   ```text
   DATABASE_URL=<PostgreSQL connection URL>
   SECRET_KEY=<long random secret>
   TOKEN_HOURS=8
   LOW_STOCK_LIMIT=100
   ADMIN_EMAIL=<administrator email>
   ADMIN_PASSWORD=<secure administrator password>
   SEED_DEMO=0
   RENDER=true
   ```

When `RENDER=true`, startup rejects the development `SECRET_KEY` and `ADMIN_PASSWORD` defaults.

## Production checks

Before release:

- replace `SECRET_KEY`;
- replace `ADMIN_PASSWORD`;
- use a dedicated production PostgreSQL database;
- keep `SEED_DEMO=0`;
- use HTTPS;
- configure database backups;
- restrict database credentials to the application environment;
- verify that `/api/health` responds successfully;
- verify cooperative, manufacturer, and administrator login flows;
- verify listing search, request creation, and request response flows.

## Development workflow

Work should be completed on descriptive feature branches rather than directly on `main`.

Example:

```powershell
git switch -c feature/dashboard-profile
# Make and test the changes.
git add .
git commit -m "Fix cooperative and manufacturer profile dashboards"
git push -u origin feature/dashboard-profile
```

Before merging:

1. Open a pull request from the feature branch into `main`.
2. Give the pull request a clear title and describe the problem, changes, and tests.
3. Review the diff and confirm that unrelated files are unchanged.
4. Run the available tests and startup checks.
5. Merge the approved pull request.

Keeping commits small and descriptive makes it easier to track project progress and review feature changes.

## Troubleshooting

### `DATABASE_URL is not set`

Set `DATABASE_URL` before starting the application. It must be a PostgreSQL URL.

### `SECRET_KEY` or `ADMIN_PASSWORD` startup error

This occurs in Render environments when production defaults are still active. Set a secure `SECRET_KEY` and `ADMIN_PASSWORD`.

### `ModuleNotFoundError`

Activate the virtual environment and reinstall dependencies:

```powershell
python -m pip install -r requirements.txt
python -m pip install -r requirement-dev.txt
```

### Login redirects back to the landing page

Clear old browser storage or log out, then log in again. The frontend stores the JWT and role in `localStorage` under `igitabo_token` and `igitabo_user`.

### Dashboard profile does not load

Confirm that:

- the user is logged in;
- `/api/auth/me` returns the user;
- `/api/cooperative/profile` works for cooperative accounts;
- `/api/requests/mine` works for both cooperative and manufacturer accounts;
- the database is reachable.
