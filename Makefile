.DEFAULT_GOAL := help

# Variables
DC_DEV = docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev
DC_PROD = docker compose -f docker-compose.yml --env-file .env
DC_PREPROD = docker compose -f docker-compose.yml -f docker-compose.preprod.yml --env-file .env.preprod
DCD = docker compose down
FRONTEND_DIR = frontend
BACKEND_DIR = backend
ML_DIR = ml_service

# Environments list for dynamic rule generation
ENVS := dev prod preprod

.PHONY: stop clean release prune help lint lint/front lint/back lint/ml sec sec/front sec/back sec/ml ci

# === ENVIRONMENTS ===

# UP: Start environment
dev/up: 
	$(DC_DEV) up -d

prod/up: 
	$(DC_PROD) up -d

preprod/up: 
	$(DC_PREPROD) pull
	$(DC_PREPROD) up -d

# BUILD ALL: Rebuild all containers in environment
dev/build: 
	rm -rf $(FRONTEND_DIR)/node_modules $(FRONTEND_DIR)/pnpm-lock.yaml
	$(DCD) -v
	docker builder prune -f
	$(DC_DEV) up --build -d

prod/build: 
	rm -rf $(FRONTEND_DIR)/node_modules $(FRONTEND_DIR)/pnpm-lock.yaml
	$(DCD) -v
	docker builder prune -f
	$(DC_PROD) up --build -d

preprod/build: 
	rm -rf $(FRONTEND_DIR)/node_modules $(FRONTEND_DIR)/pnpm-lock.yaml
	$(DCD) -v
	docker builder prune -f
	$(DC_PREPROD) up --build -d

# BUILD SERVICE: Rebuild specific service (works for ANY service in that env)
dev/build/%:
	$(DC_DEV) up --build --no-deps -d $*

prod/build/%:
	$(DC_PROD) up --build --no-deps -d $*

preprod/build/%:
	$(DC_PREPROD) up --build --no-deps -d $*

# PULL: Pull preprod images from GHCR
preprod/pull:
	$(DC_PREPROD) pull

# === LINTING ===

lint/front:
	cd $(FRONTEND_DIR) && pnpm run lint && npx tsc --noEmit

lint/back:
	cd $(BACKEND_DIR) && uv run flake8 . && uv run ruff check . && uv run mypy .

lint/ml:
	cd $(ML_DIR) && uv run flake8 . && uv run ruff check . && uv run mypy .

lint: lint/front lint/back lint/ml

# === SECURITY ===

sec/front:
	cd $(FRONTEND_DIR) && pnpm run audit

sec/back:
	cd $(BACKEND_DIR) && uv run bandit -r . --exclude ./.venv

sec/ml:
	cd $(ML_DIR) && uv run bandit -r . --exclude ./.venv

sec: sec/front sec/back sec/ml

# === CI ===

# Run the exact same checks as .github/workflows/ci.yaml, locally
ci: lint sec

# === MAINTENANCE ===

stop:
	$(DCD)

clean:
	$(DCD) -v
	docker builder prune -f

release:
	gh pr create --base prod --head develop --title "release: develop -> prod" --fill

prune:
	git fetch --prune
	git branch --format '%(refname:short) %(upstream:track)' | awk '$$2 == "[gone]" {print $$1}' | xargs -r git branch -d

# === HELP ===
help:
	@echo "----- ENVIRONMENTS -----------------------"
	@echo "  ----- develop -----"
	@echo "  dev/up              -> Start dev environment"
	@echo "  dev/build           -> Rebuild ALL dev containers"
	@echo "  dev/build/{service} -> Rebuild a container in dev"
	@echo ""
	@echo "  ----- prod -----"
	@echo "  prod/up              -> Start prod environment"
	@echo "  prod/build           -> Rebuild ALL prod containers"
	@echo "  prod/build/{service} -> Rebuild a container in prod"
	@echo ""
	@echo "  ----- preprod -----"
	@echo "  preprod/up              -> Start preprod with GHCR (port 8080/8443)"
	@echo "  preprod/pull            -> Pull preprod images from GHCR"
	@echo "  preprod/build           -> Rebuild ALL preprod containers"
	@echo "  preprod/build/{service} -> Rebuild a container in preprod"
	@echo ""
	@echo "----- LINTING ---------------------------"
	@echo ""
	@echo "  lint       -> Run all linters"
	@echo "  lint/front -> ESLint + TypeScript (frontend)"
	@echo "  lint/back  -> flake8 + ruff + mypy (backend)"
	@echo "  lint/ml    -> flake8 + ruff + mypy (ml_service)"
	@echo ""
	@echo "----- SECURITY ---------------------------"
	@echo ""
	@echo "  sec       -> Run all security checks"
	@echo "  sec/front -> pnpm audit (frontend)"
	@echo "  sec/back  -> bandit (backend)"
	@echo "  sec/ml    -> bandit (ml_service)"
	@echo ""
	@echo "----- CI ---------------------------------"
	@echo ""
	@echo "  ci -> Run the same checks as CI locally"
	@echo ""
	@echo "----- MAINTENANCE -----------------------"
	@echo ""
	@echo "  stop    -> Stop all containers"
	@echo "  clean   -> Remove containers + volumes + build cache"
	@echo "  release -> Create PR develop → prod"
	@echo "  prune   -> Delete merged local branches"
	@echo ""
