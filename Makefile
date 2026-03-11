# Variables
COMPOSE_DEV = docker compose --env-file .env.dev
COMPOSE_PROD = docker compose --env-file .env

.PHONY: dev build-dev prod build-prod stop help

# Development mode
dev:
	$(COMPOSE_DEV) up -d

# Re-build in dev mode
build-dev:
	$(COMPOSE_DEV) down -v
	docker builder prune -f
	$(COMPOSE_DEV) up --build -d

# Production mode
prod:
	$(COMPOSE_PROD) up -d

# Re-build in prod mode
build-prod:
	$(COMPOSE_PROD) down -v
	docker builder prune -f
	$(COMPOSE_PROD) up --build -d

# Down services
stop:
	docker compose down

# Help
help:
	@echo "Commands allowed :"
	@echo "  make dev -> Build project in dev mode"
	@echo "  make build-dev -> Re-build project in dev mode"
	@echo "  make prod -> Build project in prod mode"
	@echo "  make build-prod -> Re-build project in prod mode"
	@echo "  make stop -> Down services"
