#!/bin/bash

# Hugo Tailbliss Development Helper Script
# Provides convenient shortcuts for common development tasks

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Helper functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if Hugo is installed
check_hugo() {
    if ! command -v hugo &> /dev/null; then
        log_error "Hugo is not installed. Please install Hugo Extended version."
        log_info "Visit: https://gohugo.io/installation/"
        exit 1
    fi
    
    local hugo_version=$(hugo version | grep -o 'v[0-9]\+\.[0-9]\+\.[0-9]\+')
    log_info "Hugo version: $hugo_version"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js v18 or later."
        log_info "Visit: https://nodejs.org/"
        exit 1
    fi
    
    local node_version=$(node --version)
    log_info "Node.js version: $node_version"
}

# Initialize project
init_project() {
    log_info "Initializing project..."
    
    # Check prerequisites
    check_hugo
    check_node
    
    # Initialize submodules
    log_info "Initializing Git submodules..."
    git submodule update --init --recursive
    
    # Install npm dependencies
    log_info "Installing npm dependencies..."
    npm install
    
    log_success "Project initialized successfully!"
    log_info "Run 'npm run dev' to start development server"
}

# Quick health check
health_check() {
    log_info "Running health check..."
    
    # Check Hugo
    check_hugo
    
    # Check Node.js
    check_node
    
    # Check submodules
    if [ ! -d "themes/tailbliss/.git" ]; then
        log_warning "Tailbliss theme submodule not initialized"
        log_info "Run: git submodule update --init --recursive"
    else
        log_success "Tailbliss theme submodule OK"
    fi
    
    # Check npm dependencies
    if [ ! -d "node_modules" ]; then
        log_warning "npm dependencies not installed"
        log_info "Run: npm install"
    else
        log_success "npm dependencies OK"
    fi
    
    # Test Hugo build
    log_info "Testing Hugo build..."
    if hugo --quiet --printPathWarnings > /dev/null 2>&1; then
        log_success "Hugo build test passed"
    else
        log_error "Hugo build test failed"
        log_info "Run: npm run validate"
    fi
}

# Clean everything
clean_all() {
    log_info "Cleaning all build artifacts and dependencies..."
    
    # Clean Hugo artifacts
    rm -rf public resources .hugo_build.lock
    log_info "Cleaned Hugo artifacts"
    
    # Clean npm artifacts
    rm -rf node_modules package-lock.json
    log_info "Cleaned npm artifacts"
    
    log_success "All artifacts cleaned"
    log_info "Run './scripts/dev-helper.sh init' to reinitialize"
}

# Show help
show_help() {
    echo "Hugo Tailbliss Development Helper"
    echo ""
    echo "Usage: $0 [command]"
    echo ""
    echo "Commands:"
    echo "  init        Initialize project (submodules + npm install)"
    echo "  health      Run health check"
    echo "  clean       Clean all artifacts and dependencies"
    echo "  help        Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0 init     # Set up project for first time"
    echo "  $0 health   # Check project status"
    echo "  $0 clean    # Clean everything"
}

# Main script logic
case "${1:-help}" in
    "init")
        init_project
        ;;
    "health")
        health_check
        ;;
    "clean")
        clean_all
        ;;
    "help"|*)
        show_help
        ;;
esac