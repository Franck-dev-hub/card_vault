# Variables
DC_DEV = docker compose --env-file .env.dev
DC_PROD = docker compose --env-file .env
DCD = docker compose down

.PHONY: dev build-dev prod build-prod stop help

# Development mode
dev:
	$(DC_DEV) up -d

# Re-build in dev mode
build-dev:
	$(DCD) -v
	docker builder prune
	$(DC_DEV) up --build -d

# Production mode
prod:
	$(DC_PROD) up -d

# Re-build in prod mode
build-prod:
	$(DCD) -v
	docker builder prune
	$(DC_PROD) up --build -d

# Rebuild a spécific docker server
rebuild:
	$(DC_DEV) up --build --no-deps -d $(service)

# Down services
stop:
	$(DCD)

# Clean Docker
clean:
	$(DCD) -v
	docker builder prune

# Help
help:
	@echo "Commands allowed :"
	@echo "  make dev        -> Build project in dev mode"
	@echo "  make build-dev  -> Re-build project in dev mode"
	@echo ""
	@echo "  make prod       -> Build project in prod mode"
	@echo "  make build-prod -> Re-build project in prod mode"
	@echo ""
	@echo "  make rebuild    -> Re build a specific service"
	@echo "  make stop       -> Down services"
	@echo "  make clean      -> Clean services"
