# Hugo Tailbliss Site Makefile
# Provides convenient shortcuts for common development tasks

.PHONY: help setup dev build clean serve test update

# Default target
help: ## Show this help message
	@echo "Available commands:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-15s\033[0m %s\n", $$1, $$2}'

setup: ## Initialize project (install deps, update submodules)
	@echo "Setting up project..."
	@git submodule update --init --recursive
	@npm install
	@echo "Setup complete!"

dev: ## Start development server
	@echo "Starting development server..."
	@npm run dev

build: ## Build production site
	@echo "Building production site..."
	@npm run build

preview: ## Build and serve preview
	@echo "Building preview..."
	@npm run build:preview
	@npm run serve

clean: ## Clean build artifacts
	@echo "Cleaning build artifacts..."
	@npm run clean

serve: ## Serve built site locally
	@echo "Serving built site..."
	@npm run serve

test: ## Run validation and tests
	@echo "Running tests..."
	@npm run test

validate: ## Validate Hugo configuration and content
	@echo "Validating site..."
	@npm run validate

update-theme: ## Update Tailbliss theme
	@echo "Updating theme..."
	@npm run update:theme

update-deps: ## Update npm dependencies
	@echo "Updating dependencies..."
	@npm run update:deps

install: setup ## Alias for setup

start: dev ## Alias for dev

# Development shortcuts
d: dev ## Short alias for dev
b: build ## Short alias for build
c: clean ## Short alias for clean
t: test ## Short alias for test