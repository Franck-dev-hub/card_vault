.DEFAULT_GOAL := help

# Variables
DC_DEV = docker compose -f docker-compose.yml -f docker-compose.dev.yml --env-file .env.dev
DC_PROD = docker compose -f docker-compose.yml --env-file .env
DCD = docker compose down
FRONTEND_DIR = frontend

.PHONY: dev build-dev prod build-prod stop release prune help

# Development mode
dev:
	$(DC_DEV) up -d

# Re-build in dev mode
build-dev:
	rm -rf $(FRONTEND_DIR)/node_modules $(FRONTEND_DIR)/package-lock.json
	$(DCD) -v
	docker builder prune -f
	$(DC_DEV) up --build -d

# Production mode
prod:
	$(DC_PROD) up -d

# Re-build in prod mode
build-prod:
	rm -rf $(FRONTEND_DIR)/node_modules $(FRONTEND_DIR)/package-lock.json
	$(DCD) -v
	docker builder prune -f
	$(DC_PROD) up --build -d

# Rebuild a specific dev docker server
rebuild-dev:
	$(DC_DEV) up --build --no-deps -d $(service)

# Rebuild a specific prod docker server
rebuild-prod:
	$(DC_PROD) up --build --no-deps -d $(service)

# Down services
stop:
	$(DCD)

# Create PR develop → main
release:
	gh pr create --base main --head develop --title "release: develop → main" --fill

# Delete local branches whose remote is gone
prune:
	git fetch --prune
	git branch -vv | grep ': gone]' | awk '{print $$1}' | xargs -r git branch -d

# Clean Docker
clean:
	$(DCD) -v
	docker builder prune -f

# Help
help:
	@echo "Commands allowed :"
	@echo "  make dev        -> Build project in dev mode"
	@echo "  make build-dev  -> Re-build project in dev mode"
	@echo ""
	@echo "  make prod       -> Build project in prod mode"
	@echo "  make build-prod -> Re-build project in prod mode"
	@echo ""
	@echo "  make rebuild-dev service=<service>  -> Re build a specific dev service"
	@echo "  make rebuild-prod service=<service> -> Re build a specific prod service"
	@echo "  make stop       -> Down services"
	@echo "  make clean      -> Clean services"
	@echo ""
	@echo "  make release    -> Create PR from develop to main"
	@echo "  make prune      -> Delete local branches merged on GitHub"
